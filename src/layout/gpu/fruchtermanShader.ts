export
  const fruchtermanCode = `
import { globalInvocationID } from 'g-webgpu';
const MAX_EDGE_PER_VERTEX;
const VERTEX_COUNT;
@numthreads(1, 1, 1)
class Fruchterman {
  @in @out
  u_Data: vec4[];
  @in
  u_K: float;
  @in
  u_K2: float;
  
  @in
  u_Center: vec2;
  @in
  u_Gravity: float;
  @in
  u_ClusterGravity: float;
  @in
  u_Speed: float;
  @in
  u_MaxDisplace: float;
  @in
  u_Clustering: float;
  @in
  u_AttributeArray: vec4[];
  @in
  u_ClusterCenters: vec4[];
  calcRepulsive(i: int, currentNode: vec4): vec2 {
    let dx = 0, dy = 0;
    for (let j = 0; j < VERTEX_COUNT; j++) {
      if (i != j) {
        const nextNode = this.u_Data[j];
        const xDist = currentNode[0] - nextNode[0];
        const yDist = currentNode[1] - nextNode[1];
        const dist = (xDist * xDist + yDist * yDist) + 0.01;
        let param = this.u_K2 / dist;
        
        if (dist > 0.0) {
          dx += param * xDist ;
          dy += param * yDist ;
        }
      }
    }
    return [dx, dy];
  }
  calcGravity(currentNode: vec4, nodeAttributes: vec4): vec2 { // 
    let dx = 0, dy = 0;
    const vx = currentNode[0] - this.u_Center[0];
    const vy = currentNode[1] - this.u_Center[1];
    const gf = 0.01 * this.u_K * this.u_Gravity;
    dx = gf * vx;
    dy = gf * vy;
    if (this.u_Clustering == 1) {
      const clusterIdx = int(nodeAttributes[0]);
      const center = this.u_ClusterCenters[clusterIdx];
      const cvx = currentNode[0] - center[0];
      const cvy = currentNode[1] - center[1];
      const dist = sqrt(cvx * cvx + cvy * cvy) + 0.001;
      const parma = this.u_K * this.u_ClusterGravity / dist;
      dx += parma * cvx;
      dy += parma * cvy;
    }
    return [dx, dy];
  }
  calcAttractive(i: int, currentNode: vec4): vec2 {
    let dx = 0, dy = 0;
    const arr_offset = int(floor(currentNode[2] + 0.5));
    const length = int(floor(currentNode[3] + 0.5));
    const node_buffer: vec4;
    for (let p = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + p;
      // when arr_idx % 4 == 0 update currentNodedx_buffer
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        node_buffer = this.u_Data[int(arr_idx / 4)];
      }
      const float_j = buf_offset == 0 ? node_buffer[0] :
                      buf_offset == 1 ? node_buffer[1] :
                      buf_offset == 2 ? node_buffer[2] :
                                        node_buffer[3];
      const nextNode = this.u_Data[int(float_j)];
      const xDist = currentNode[0] - nextNode[0];
      const yDist = currentNode[1] - nextNode[1];
      const dist = sqrt(xDist * xDist + yDist * yDist) + 0.01;
      let attractiveF = dist / this.u_K;
    
      if (dist > 0.0) {
        dx -= xDist * attractiveF;
        dy -= yDist * attractiveF;
      }
    }
    return [dx, dy];
  }
  @main
  compute() {
    const i = globalInvocationID.x;
    const currentNode = this.u_Data[i];
    let dx = 0, dy = 0;
    if (i >= VERTEX_COUNT) {
      this.u_Data[i] = currentNode;
      return;
    }
    // repulsive
    const repulsive = this.calcRepulsive(i, currentNode);
    dx += repulsive[0];
    dy += repulsive[1];
    // attractive
    const attractive = this.calcAttractive(i, currentNode);
    dx += attractive[0];
    dy += attractive[1];
    // gravity
    const nodeAttributes = this.u_AttributeArray[i];
    const gravity = this.calcGravity(currentNode, nodeAttributes);
    dx -= gravity[0];
    dy -= gravity[1];
    // speed
    dx *= this.u_Speed;
    dy *= this.u_Speed;
    // move
    const distLength = sqrt(dx * dx + dy * dy);
    if (distLength > 0.0) {
      const limitedDist = min(this.u_MaxDisplace * this.u_Speed, distLength);
      this.u_Data[i] = [
        currentNode[0] + dx / distLength * limitedDist,
        currentNode[1] + dy / distLength * limitedDist,
        currentNode[2],
        currentNode[3]
      ];
    }
  }
}
`;

export const fruchtermanBundle = `{"shaders":{"WGSL":"import \\"GLSL.std.450\\" as std;\\n\\n\\n# var gWebGPUDebug : bool = false;\\n# var gWebGPUDebugOutput : vec4<f32> = vec4<f32>(0.0);\\n\\n[[builtin global_invocation_id]] var<in> globalInvocationID : vec3<u32>;\\n# [[builtin work_group_size]] var<in> workGroupSize : vec3<u32>;\\n# [[builtin work_group_id]] var<in> workGroupID : vec3<u32>;\\n[[builtin local_invocation_id]] var<in> localInvocationID : vec3<u32>;\\n# [[builtin num_work_groups]] var<in> numWorkGroups : vec3<u32>;\\n[[builtin local_invocation_idx]] var<in> localInvocationIndex : u32;\\n\\ntype GWebGPUParams = [[block]] struct {\\n  [[offset 0]] u_K : f32;\\n  [[offset 4]] u_K2 : f32;\\n  [[offset 8]] u_Center : vec2<f32>;\\n  [[offset 16]] u_Gravity : f32;\\n  [[offset 20]] u_ClusterGravity : f32;\\n  [[offset 24]] u_Speed : f32;\\n  [[offset 28]] u_MaxDisplace : f32;\\n  [[offset 32]] u_Clustering : f32;\\n};\\n[[binding 0, set 0]] var<uniform> gWebGPUUniformParams : GWebGPUParams;\\ntype GWebGPUBuffer0 = [[block]] struct {\\n  [[offset 0]] u_Data : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 1, set 0]] var<storage_buffer> gWebGPUBuffer0 : GWebGPUBuffer0;\\ntype GWebGPUBuffer1 = [[block]] struct {\\n  [[offset 0]] u_AttributeArray : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 2, set 0]] var<storage_buffer> gWebGPUBuffer1 : GWebGPUBuffer1;\\ntype GWebGPUBuffer2 = [[block]] struct {\\n  [[offset 0]] u_ClusterCenters : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 3, set 0]] var<storage_buffer> gWebGPUBuffer2 : GWebGPUBuffer2;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nfn calcRepulsive(i : i32, currentNode : vec4<f32>) -> vec2<f32> {var dx : f32 = 0.0;\\nvar dy : f32 = 0.0;\\nfor (var j : i32 = 0; j < __DefineValuePlaceholder__VERTEX_COUNT; j = j + 1) {if (i != j) {var nextNode : vec4<f32> = gWebGPUBuffer0.u_Data[j];\\nvar xDist : f32 = currentNode.x - nextNode.x;\\nvar yDist : f32 = currentNode.y - nextNode.y;\\nvar dist : f32 = ((xDist * xDist) + (yDist * yDist)) + 0.01;\\nvar param : f32 = gWebGPUUniformParams.u_K2 / dist;\\nif (dist > 0.0) {dx = dx + param * xDist;\\ndy = dy + param * yDist;}}}\\nreturn vec2<f32>(dx, dy);}\\nfn calcGravity(currentNode : vec4<f32>, nodeAttributes : vec4<f32>) -> vec2<f32> {var dx : f32 = 0.0;\\nvar dy : f32 = 0.0;\\nvar vx : f32 = currentNode.x - gWebGPUUniformParams.u_Center.x;\\nvar vy : f32 = currentNode.y - gWebGPUUniformParams.u_Center.y;\\nvar gf : f32 = (0.01 * gWebGPUUniformParams.u_K) * gWebGPUUniformParams.u_Gravity;\\ndx = gf * vx;\\ndy = gf * vy;\\nif (gWebGPUUniformParams.u_Clustering == 1.0) {var clusterIdx : i32 = i32(nodeAttributes.x);\\nvar center : vec4<f32> = gWebGPUBuffer2.u_ClusterCenters[clusterIdx];\\nvar cvx : f32 = currentNode.x - center.x;\\nvar cvy : f32 = currentNode.y - center.y;\\nvar dist : f32 = std::sqrt((cvx * cvx) + (cvy * cvy)) + 0.001;\\nvar parma : f32 = (gWebGPUUniformParams.u_K * gWebGPUUniformParams.u_ClusterGravity) / dist;\\ndx = dx + parma * cvx;\\ndy = dy + parma * cvy;}\\nreturn vec2<f32>(dx, dy);}\\nfn calcAttractive(i : i32, currentNode : vec4<f32>) -> vec2<f32> {var dx : f32 = 0.0;\\nvar dy : f32 = 0.0;\\nvar arr_offset : i32 = i32(std::floor(currentNode.z + 0.5));\\nvar length : i32 = i32(std::floor(currentNode.w + 0.5));\\nvar node_buffer : vec4<f32>;\\nfor (var p : i32 = 0; p < __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX; p = p + 1) {if (p >= length) {break;}\\nvar arr_idx : i32 = arr_offset + i32(p);\\nvar buf_offset : i32 = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = gWebGPUBuffer0.u_Data[i32(arr_idx / 4)];}\\nvar float_j : f32 = select(node_buffer.x, select(node_buffer.y, select(node_buffer.z, node_buffer.w, buf_offset == 2), buf_offset == 1), buf_offset == 0);\\nvar nextNode : vec4<f32> = gWebGPUBuffer0.u_Data[i32(float_j)];\\nvar xDist : f32 = currentNode.x - nextNode.x;\\nvar yDist : f32 = currentNode.y - nextNode.y;\\nvar dist : f32 = std::sqrt((xDist * xDist) + (yDist * yDist)) + 0.01;\\nvar attractiveF : f32 = dist / gWebGPUUniformParams.u_K;\\nif (dist > 0.0) {dx = dx - xDist * attractiveF;\\ndy = dy - yDist * attractiveF;}}\\nreturn vec2<f32>(dx, dy);}\\nfn main() -> void {var i : i32 = globalInvocationID.x;\\nvar currentNode : vec4<f32> = gWebGPUBuffer0.u_Data[i];\\nvar dx : f32 = 0.0;\\nvar dy : f32 = 0.0;\\nif (i >= __DefineValuePlaceholder__VERTEX_COUNT) {gWebGPUBuffer0.u_Data[i] = currentNode;\\nreturn ;}\\nvar repulsive : vec2<f32> = calcRepulsive(i, currentNode);\\ndx = dx + repulsive.x;\\ndy = dy + repulsive.y;\\nvar attractive : vec2<f32> = calcAttractive(i, currentNode);\\ndx = dx + attractive.x;\\ndy = dy + attractive.y;\\nvar nodeAttributes : vec4<f32> = gWebGPUBuffer1.u_AttributeArray[i];\\nvar gravity : vec2<f32> = calcGravity(currentNode, nodeAttributes);\\ndx = dx - gravity.x;\\ndy = dy - gravity.y;\\ndx = dx * gWebGPUUniformParams.u_Speed;\\ndy = dy * gWebGPUUniformParams.u_Speed;\\nvar distLength : f32 = std::sqrt((dx * dx) + (dy * dy));\\nif (distLength > 0.0) {var limitedDist : f32 = std::min(gWebGPUUniformParams.u_MaxDisplace * gWebGPUUniformParams.u_Speed, distLength);\\ngWebGPUBuffer0.u_Data[i] = vec4<f32>(currentNode.x + ((dx / distLength) * limitedDist), currentNode.y + ((dy / distLength) * limitedDist), currentNode.z, currentNode.w);}\\nreturn;}\\n\\nentry_point compute as \\"main\\" = main;\\n","GLSL450":"\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(1,1,1);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\nlayout(std140, set = 0, binding = 0) uniform GWebGPUParams {\\n  float u_K;\\n  float u_K2;\\n  vec2 u_Center;\\n  float u_Gravity;\\n  float u_ClusterGravity;\\n  float u_Speed;\\n  float u_MaxDisplace;\\n  float u_Clustering;\\n} gWebGPUUniformParams;\\nlayout(std430, set = 0, binding = 1) buffer   GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\nlayout(std430, set = 0, binding = 2) buffer readonly  GWebGPUBuffer1 {\\n  vec4 u_AttributeArray[];\\n} gWebGPUBuffer1;\\n\\nlayout(std430, set = 0, binding = 3) buffer readonly  GWebGPUBuffer2 {\\n  vec4 u_ClusterCenters[];\\n} gWebGPUBuffer2;\\n\\n\\n\\n#define MAX_EDGE_PER_VERTEX __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nvec2 calcRepulsive(int i, vec4 currentNode) {float dx = 0.0;\\nfloat dy = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {if (i != j) {vec4 nextNode = gWebGPUBuffer0.u_Data[j];\\nfloat xDist = currentNode.x - nextNode.x;\\nfloat yDist = currentNode.y - nextNode.y;\\nfloat dist = ((xDist * xDist) + (yDist * yDist)) + 0.01;\\nfloat param = gWebGPUUniformParams.u_K2 / dist;\\nif (dist > 0.0) {dx += param * xDist;\\ndy += param * yDist;}}}\\nreturn vec2(dx, dy);}\\nvec2 calcGravity(vec4 currentNode, vec4 nodeAttributes) {float dx = 0.0;\\nfloat dy = 0.0;\\nfloat vx = currentNode.x - gWebGPUUniformParams.u_Center.x;\\nfloat vy = currentNode.y - gWebGPUUniformParams.u_Center.y;\\nfloat gf = (0.01 * gWebGPUUniformParams.u_K) * gWebGPUUniformParams.u_Gravity;\\ndx = gf * vx;\\ndy = gf * vy;\\nif (gWebGPUUniformParams.u_Clustering == 1.0) {int clusterIdx = int(nodeAttributes.x);\\nvec4 center = gWebGPUBuffer2.u_ClusterCenters[clusterIdx];\\nfloat cvx = currentNode.x - center.x;\\nfloat cvy = currentNode.y - center.y;\\nfloat dist = sqrt((cvx * cvx) + (cvy * cvy)) + 0.001;\\nfloat parma = (gWebGPUUniformParams.u_K * gWebGPUUniformParams.u_ClusterGravity) / dist;\\ndx += parma * cvx;\\ndy += parma * cvy;}\\nreturn vec2(dx, dy);}\\nvec2 calcAttractive(int i, vec4 currentNode) {float dx = 0.0;\\nfloat dy = 0.0;\\nint arr_offset = int(floor(currentNode.z + 0.5));\\nint length = int(floor(currentNode.w + 0.5));\\nvec4 node_buffer;\\nfor (int p = 0; p < MAX_EDGE_PER_VERTEX; p++) {if (p >= length) {break;}\\nint arr_idx = arr_offset + int(p);\\nint buf_offset = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = gWebGPUBuffer0.u_Data[int(arr_idx / 4)];}\\nfloat float_j = (buf_offset == 0) ? (node_buffer.x) : ((buf_offset == 1) ? (node_buffer.y) : ((buf_offset == 2) ? (node_buffer.z) : (node_buffer.w)));\\nvec4 nextNode = gWebGPUBuffer0.u_Data[int(float_j)];\\nfloat xDist = currentNode.x - nextNode.x;\\nfloat yDist = currentNode.y - nextNode.y;\\nfloat dist = sqrt((xDist * xDist) + (yDist * yDist)) + 0.01;\\nfloat attractiveF = dist / gWebGPUUniformParams.u_K;\\nif (dist > 0.0) {dx -= xDist * attractiveF;\\ndy -= yDist * attractiveF;}}\\nreturn vec2(dx, dy);}\\nvoid main() {int i = globalInvocationID.x;\\nvec4 currentNode = gWebGPUBuffer0.u_Data[i];\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nif (i >= VERTEX_COUNT) {gWebGPUBuffer0.u_Data[i] = currentNode;\\nreturn ;}\\nvec2 repulsive = calcRepulsive(i, currentNode);\\ndx += repulsive.x;\\ndy += repulsive.y;\\nvec2 attractive = calcAttractive(i, currentNode);\\ndx += attractive.x;\\ndy += attractive.y;\\nvec4 nodeAttributes = gWebGPUBuffer1.u_AttributeArray[i];\\nvec2 gravity = calcGravity(currentNode, nodeAttributes);\\ndx -= gravity.x;\\ndy -= gravity.y;\\ndx *= gWebGPUUniformParams.u_Speed;\\ndy *= gWebGPUUniformParams.u_Speed;\\nfloat distLength = sqrt((dx * dx) + (dy * dy));\\nif (distLength > 0.0) {float limitedDist = min(gWebGPUUniformParams.u_MaxDisplace * gWebGPUUniformParams.u_Speed, distLength);\\ngWebGPUBuffer0.u_Data[i] = vec4(currentNode.x + ((dx / distLength) * limitedDist), currentNode.y + ((dy / distLength) * limitedDist), currentNode.z, currentNode.w);}}\\n","GLSL100":"\\n\\nfloat epsilon = 0.00001;\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x + epsilon), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n#define MAX_EDGE_PER_VERTEX __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n\\nuniform sampler2D u_Data;\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\nuniform float u_K;\\nuniform float u_K2;\\nuniform vec2 u_Center;\\nuniform float u_Gravity;\\nuniform float u_ClusterGravity;\\nuniform float u_Speed;\\nuniform float u_MaxDisplace;\\nuniform float u_Clustering;\\nuniform sampler2D u_AttributeArray;\\nuniform vec2 u_AttributeArraySize;\\nvec4 getDatau_AttributeArray(vec2 address2D) {\\n  return vec4(texture2D(u_AttributeArray, address2D).rgba);\\n}\\nvec4 getDatau_AttributeArray(float address1D) {\\n  return getDatau_AttributeArray(addrTranslation_1Dto2D(address1D, u_AttributeArraySize));\\n}\\nvec4 getDatau_AttributeArray(int address1D) {\\n  return getDatau_AttributeArray(float(address1D));\\n}\\nuniform sampler2D u_ClusterCenters;\\nuniform vec2 u_ClusterCentersSize;\\nvec4 getDatau_ClusterCenters(vec2 address2D) {\\n  return vec4(texture2D(u_ClusterCenters, address2D).rgba);\\n}\\nvec4 getDatau_ClusterCenters(float address1D) {\\n  return getDatau_ClusterCenters(addrTranslation_1Dto2D(address1D, u_ClusterCentersSize));\\n}\\nvec4 getDatau_ClusterCenters(int address1D) {\\n  return getDatau_ClusterCenters(float(address1D));\\n}\\nvec2 calcRepulsive(int i, vec4 currentNode) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {if (i != j) {vec4 nextNode = getDatau_Data(j);\\nfloat xDist = currentNode.x - nextNode.x;\\nfloat yDist = currentNode.y - nextNode.y;\\nfloat dist = ((xDist * xDist) + (yDist * yDist)) + 0.01;\\nfloat param = u_K2 / dist;\\nif (dist > 0.0) {dx += param * xDist;\\ndy += param * yDist;}}}\\nreturn vec2(dx, dy);}\\nvec2 calcGravity(vec4 currentNode, vec4 nodeAttributes) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nfloat vx = currentNode.x - u_Center.x;\\nfloat vy = currentNode.y - u_Center.y;\\nfloat gf = (0.01 * u_K) * u_Gravity;\\ndx = gf * vx;\\ndy = gf * vy;\\nif (u_Clustering == 1.0) {int clusterIdx = int(nodeAttributes.x);\\nvec4 center = getDatau_ClusterCenters(clusterIdx);\\nfloat cvx = currentNode.x - center.x;\\nfloat cvy = currentNode.y - center.y;\\nfloat dist = sqrt((cvx * cvx) + (cvy * cvy)) + 0.001;\\nfloat parma = (u_K * u_ClusterGravity) / dist;\\ndx += parma * cvx;\\ndy += parma * cvy;}\\nreturn vec2(dx, dy);}\\nvec2 calcAttractive(int i, vec4 currentNode) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nint arr_offset = int(floor(currentNode.z + 0.5));\\nint length = int(floor(currentNode.w + 0.5));\\nvec4 node_buffer;\\nfor (int p = 0; p < MAX_EDGE_PER_VERTEX; p++) {if (p >= length) {break;}\\nint arr_idx = arr_offset + int(p);\\nint buf_offset = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = getDatau_Data(int(arr_idx / 4));}\\nfloat float_j = (buf_offset == 0) ? (node_buffer.x) : ((buf_offset == 1) ? (node_buffer.y) : ((buf_offset == 2) ? (node_buffer.z) : (node_buffer.w)));\\nvec4 nextNode = getDatau_Data(int(float_j));\\nfloat xDist = currentNode.x - nextNode.x;\\nfloat yDist = currentNode.y - nextNode.y;\\nfloat dist = sqrt((xDist * xDist) + (yDist * yDist)) + 0.01;\\nfloat attractiveF = dist / u_K;\\nif (dist > 0.0) {dx -= xDist * attractiveF;\\ndy -= yDist * attractiveF;}}\\nreturn vec2(dx, dy);}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nint i = globalInvocationID.x;\\nvec4 currentNode = getDatau_Data(i);\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nif (i >= VERTEX_COUNT) {gl_FragColor = vec4(currentNode);\\nreturn ;}\\nvec2 repulsive = calcRepulsive(i, currentNode);\\ndx += repulsive.x;\\ndy += repulsive.y;\\nvec2 attractive = calcAttractive(i, currentNode);\\ndx += attractive.x;\\ndy += attractive.y;\\nvec4 nodeAttributes = getDatau_AttributeArray(i);\\nvec2 gravity = calcGravity(currentNode, nodeAttributes);\\ndx -= gravity.x;\\ndy -= gravity.y;\\ndx *= u_Speed;\\ndy *= u_Speed;\\nfloat distLength = sqrt((dx * dx) + (dy * dy));\\nif (distLength > 0.0) {float limitedDist = min(u_MaxDisplace * u_Speed, distLength);\\ngl_FragColor = vec4(vec4(currentNode.x + ((dx / distLength) * limitedDist), currentNode.y + ((dy / distLength) * limitedDist), currentNode.z, currentNode.w));}if (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}}\\n"},"context":{"name":"","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"MAX_EDGE_PER_VERTEX","type":"Float","runtime":true},{"name":"VERTEX_COUNT","type":"Float","runtime":true}],"uniforms":[{"name":"u_Data","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":false,"writeonly":false,"size":[1,1]},{"name":"u_K","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_K2","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Center","type":"vec2<f32>","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Gravity","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_ClusterGravity","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Speed","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_MaxDisplace","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Clustering","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_AttributeArray","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_ClusterCenters","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_Data","size":[1,1],"length":1},"needPingpong":true}}`;

export const clusterCode = `
import { globalInvocationID } from 'g-webgpu';
const VERTEX_COUNT;
const CLUSTER_COUNT;
@numthreads(1, 1, 1)
class CalcCenter {
  @in
  u_Data: vec4[];
  @in
  u_NodeAttributes: vec4[]; // [[clusterIdx, 0, 0, 0], ...]
  @in @out
  u_ClusterCenters: vec4[]; // [[cx, cy, nodeCount, clusterIdx], ...]
  @main
  compute() {
    const i = globalInvocationID.x;
    const center = this.u_ClusterCenters[i];
    let sumx = 0;
    let sumy = 0;
    let count = 0;
    for (let j = 0; j < VERTEX_COUNT; j++) {
      const attributes = this.u_NodeAttributes[j];
      const clusterIdx = int(attributes[0]);
      const vertex = this.u_Data[j];
      if (clusterIdx == i) {
        sumx += vertex.x;
        sumy += vertex.y;
        count += 1;
      }
    }
    this.u_ClusterCenters[i] = [
      sumx / count,
      sumy / count,
      count,
      i
    ];
  }
}
`;

export const clusterBundle = `{"shaders":{"WGSL":"import \\"GLSL.std.450\\" as std;\\n\\n\\n# var gWebGPUDebug : bool = false;\\n# var gWebGPUDebugOutput : vec4<f32> = vec4<f32>(0.0);\\n\\n[[builtin global_invocation_id]] var<in> globalInvocationID : vec3<u32>;\\n# [[builtin work_group_size]] var<in> workGroupSize : vec3<u32>;\\n# [[builtin work_group_id]] var<in> workGroupID : vec3<u32>;\\n[[builtin local_invocation_id]] var<in> localInvocationID : vec3<u32>;\\n# [[builtin num_work_groups]] var<in> numWorkGroups : vec3<u32>;\\n[[builtin local_invocation_idx]] var<in> localInvocationIndex : u32;\\n\\n\\ntype GWebGPUBuffer0 = [[block]] struct {\\n  [[offset 0]] u_Data : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 0, set 0]] var<storage_buffer> gWebGPUBuffer0 : GWebGPUBuffer0;\\ntype GWebGPUBuffer1 = [[block]] struct {\\n  [[offset 0]] u_NodeAttributes : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 1, set 0]] var<storage_buffer> gWebGPUBuffer1 : GWebGPUBuffer1;\\ntype GWebGPUBuffer2 = [[block]] struct {\\n  [[offset 0]] u_ClusterCenters : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 2, set 0]] var<storage_buffer> gWebGPUBuffer2 : GWebGPUBuffer2;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nfn main() -> void {var i : i32 = globalInvocationID.x;\\nvar center : vec4<f32> = gWebGPUBuffer2.u_ClusterCenters[i];\\nvar sumx : f32 = 0.0;\\nvar sumy : f32 = 0.0;\\nvar count : f32 = 0.0;\\nfor (var j : i32 = 0; j < __DefineValuePlaceholder__VERTEX_COUNT; j = j + 1) {var attributes : vec4<f32> = gWebGPUBuffer1.u_NodeAttributes[j];\\nvar clusterIdx : i32 = i32(attributes.x);\\nvar vertex : vec4<f32> = gWebGPUBuffer0.u_Data[j];\\nif (clusterIdx == i) {sumx = sumx + vertex.x;\\nsumy = sumy + vertex.y;\\ncount = count + 1.0;}}\\ngWebGPUBuffer2.u_ClusterCenters[i] = vec4<f32>(sumx / count, sumy / count, count, i);\\nreturn;}\\n\\nentry_point compute as \\"main\\" = main;\\n","GLSL450":"\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(1,1,1);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\n\\nlayout(std430, set = 0, binding = 0) buffer readonly  GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\nlayout(std430, set = 0, binding = 1) buffer readonly  GWebGPUBuffer1 {\\n  vec4 u_NodeAttributes[];\\n} gWebGPUBuffer1;\\n\\nlayout(std430, set = 0, binding = 2) buffer   GWebGPUBuffer2 {\\n  vec4 u_ClusterCenters[];\\n} gWebGPUBuffer2;\\n\\n\\n\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n#define CLUSTER_COUNT __DefineValuePlaceholder__CLUSTER_COUNT\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n\\n\\nvoid main() {int i = globalInvocationID.x;\\nvec4 center = gWebGPUBuffer2.u_ClusterCenters[i];\\nfloat sumx = 0.0;\\nfloat sumy = 0.0;\\nfloat count = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {vec4 attributes = gWebGPUBuffer1.u_NodeAttributes[j];\\nint clusterIdx = int(attributes.x);\\nvec4 vertex = gWebGPUBuffer0.u_Data[j];\\nif (clusterIdx == i) {sumx += vertex.x;\\nsumy += vertex.y;\\ncount += 1.0;}}\\ngWebGPUBuffer2.u_ClusterCenters[i] = vec4(sumx / count, sumy / count, count, i);}\\n","GLSL100":"\\n\\nfloat epsilon = 0.00001;\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x + epsilon), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n#define CLUSTER_COUNT __DefineValuePlaceholder__CLUSTER_COUNT\\n\\nuniform sampler2D u_Data;\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\nuniform sampler2D u_NodeAttributes;\\nuniform vec2 u_NodeAttributesSize;\\nvec4 getDatau_NodeAttributes(vec2 address2D) {\\n  return vec4(texture2D(u_NodeAttributes, address2D).rgba);\\n}\\nvec4 getDatau_NodeAttributes(float address1D) {\\n  return getDatau_NodeAttributes(addrTranslation_1Dto2D(address1D, u_NodeAttributesSize));\\n}\\nvec4 getDatau_NodeAttributes(int address1D) {\\n  return getDatau_NodeAttributes(float(address1D));\\n}\\nuniform sampler2D u_ClusterCenters;\\nuniform vec2 u_ClusterCentersSize;\\nvec4 getDatau_ClusterCenters(vec2 address2D) {\\n  return vec4(texture2D(u_ClusterCenters, address2D).rgba);\\n}\\nvec4 getDatau_ClusterCenters(float address1D) {\\n  return getDatau_ClusterCenters(addrTranslation_1Dto2D(address1D, u_ClusterCentersSize));\\n}\\nvec4 getDatau_ClusterCenters(int address1D) {\\n  return getDatau_ClusterCenters(float(address1D));\\n}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nint i = globalInvocationID.x;\\nvec4 center = getDatau_ClusterCenters(i);\\nfloat sumx = 0.0;\\nfloat sumy = 0.0;\\nfloat count = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {vec4 attributes = getDatau_NodeAttributes(j);\\nint clusterIdx = int(attributes.x);\\nvec4 vertex = getDatau_Data(j);\\nif (clusterIdx == i) {sumx += vertex.x;\\nsumy += vertex.y;\\ncount += 1.0;}}\\ngl_FragColor = vec4(vec4(sumx / count, sumy / count, count, i));if (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}}\\n"},"context":{"name":"","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"VERTEX_COUNT","type":"Float","runtime":true},{"name":"CLUSTER_COUNT","type":"Float","runtime":true}],"uniforms":[{"name":"u_Data","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_NodeAttributes","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_ClusterCenters","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":false,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_ClusterCenters","size":[1,1],"length":1},"needPingpong":true}}`;