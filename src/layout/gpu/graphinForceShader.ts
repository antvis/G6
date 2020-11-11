export const graphinForceCode = `
import { globalInvocationID } from 'g-webgpu';

const MAX_EDGE_PER_VERTEX;
const VERTEX_COUNT;
const SHIFT_20 = 1048576;

@numthreads(1, 1, 1)
class GraphinForce {
  @in @out
  u_Data: vec4[];

  @in
  u_damping: float;
  
  @in
  u_maxSpeed: float;

  @in
  u_minMovement: float;

  @in
  u_AveMovement: vec4[];

  @in
  u_coulombDisScale: float;

  @in
  u_factor: float;

  @in
  u_NodeAttributeArray1: vec4[];

  @in
  u_NodeAttributeArray2: vec4[];

  @in
  u_interval: float;

  unpack_float(packedValue: float): ivec2 {
    const packedIntValue = int(packedValue);
    const v0 = packedIntValue / SHIFT_20;
    return [v0, packedIntValue - v0 * SHIFT_20];
  }

  calcRepulsive(i: int, currentNode: vec4): vec2 {
    let ax = 0, ay = 0;
    for (let j: int = 0; j < VERTEX_COUNT; j++) {
      if (i != j) {
        const nextNode = this.u_Data[j];
        const vx = currentNode[0] - nextNode[0];
        const vy = currentNode[1] - nextNode[1];
        const dist = sqrt(vx * vx + vy * vy) + 0.01;
        const n_dist = dist * this.u_coulombDisScale;
        const direx = vx / dist;
        const direy = vy / dist;
        const attributesi = this.u_NodeAttributeArray1[i];
        const attributesj = this.u_NodeAttributeArray1[j];
        const massi = attributesi[0];
        const nodeStrengthi = attributesi[2];
        const nodeStrengthj = attributesj[2];
        const nodeStrength = (nodeStrengthi + nodeStrengthj) / 2;
        // const param = nodeStrength * this.u_factor / (n_dist * n_dist * massi);
        const param = 1000 * this.u_factor / (n_dist * n_dist);
        ax += direx * param;
        ay += direy * param;
      }
    }
    return [ax, ay];
  }

  calcGravity(i: int, currentNode: vec4, attributes2: vec4): vec2 {
    // note: attributes2 = [centerX, centerY, gravity, 0]

    const vx = currentNode[0] - attributes2[0];
    const vy = currentNode[1] - attributes2[1];
    
    const ax = vx * attributes2[3];
    const ay = vy * attributes2[3];
    
    return [ax, ay];
  }

  calcAttractive(i: int, currentNode: vec4, attributes1: vec4): vec2 {
    // note: attributes1 = [mass, degree, nodeSterngth, 0]

    const mass = attributes1[0];
    let ax = 0, ay = 0;
    // const arr_offset = int(floor(currentNode[2] + 0.5));
    // const length = int(floor(currentNode[3] + 0.5));

    const compressed = this.unpack_float(currentNode[2]);
    const length = compressed[0];
    const arr_offset = compressed[1];

    const node_buffer: vec4;
    for (let p: int = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + 4 * p; // i 节点的第 p 条边开始的小格子位置
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        node_buffer = this.u_Data[int(arr_idx / 4)]; // 大格子，大格子位置=小个子位置 / 4，
      }

      let float_j: float = node_buffer[0];

      const nextNode = this.u_Data[int(float_j)];
      const vx = nextNode[0] - currentNode[0];
      const vy = nextNode[1] - currentNode[1];
      const dist = sqrt(vx * vx + vy * vy) + 0.01;
      const direx = vx / dist;
      const direy = vy / dist;
      const edgeLength = node_buffer[1];
      const edgeStrength = node_buffer[2];
      const diff: float = edgeLength - dist;//edgeLength
      // const param = diff * this.u_stiffness / mass; //
      const param = diff * edgeStrength / mass; // 
      ax -= direx * param;
      ay -= direy * param;
    }
    return [ax, ay];
  }

  @main
  compute() {
    const i = globalInvocationID.x;
    const currentNode = this.u_Data[i];
    const movement = u_AveMovement[0];
    let ax = 0, ay = 0;

    if (i >= VERTEX_COUNT || movement.x < u_minMovement) {
      this.u_Data[i] = currentNode;
      return;
    }

    // 每个节点属性占两个数组中各一格
    const nodeAttributes1 = this.u_NodeAttributeArray1[i];
    const nodeAttributes2 = this.u_NodeAttributeArray2[i];

    // repulsive
    const repulsive = this.calcRepulsive(i, currentNode);
    ax += repulsive[0];
    ay += repulsive[1];

    // attractive
    const attractive = this.calcAttractive(i, currentNode, nodeAttributes1);
    ax += attractive[0];
    ay += attractive[1];

    // gravity
    const gravity = this.calcGravity(i, currentNode, nodeAttributes2);
    ax -= gravity[0];
    ay -= gravity[1];

    // speed
    const param = this.u_interval * this.u_damping;
    let vx = ax * param;
    let vy = ay * param;
    const vlength = sqrt(vx * vx + vy * vy) + 0.0001;
    if (vlength > this.u_maxSpeed) {
      const param2 = this.u_maxSpeed / vlength;
      vx = param2 * vx;
      vy = param2 * vy;
    }

    // move
    const distx = vx * this.u_interval;
    const disty = vy * this.u_interval;
    const distLength = sqrt(distx * distx + disty * disty);

    this.u_Data[i] = [
      currentNode[0] + distx,
      currentNode[1] + disty,
      currentNode[2],
      distLength
    ];
    
    // the avarage move distance
    // need to share memory
    
  }
}
`;

export const graphinForceBundle = `{"shaders":{"WGSL":"import \\"GLSL.std.450\\" as std;\\n\\n\\n# var gWebGPUDebug : bool = false;\\n# var gWebGPUDebugOutput : vec4<f32> = vec4<f32>(0.0);\\n\\n[[builtin global_invocation_id]] var<in> globalInvocationID : vec3<u32>;\\n# [[builtin work_group_size]] var<in> workGroupSize : vec3<u32>;\\n# [[builtin work_group_id]] var<in> workGroupID : vec3<u32>;\\n[[builtin local_invocation_id]] var<in> localInvocationID : vec3<u32>;\\n# [[builtin num_work_groups]] var<in> numWorkGroups : vec3<u32>;\\n[[builtin local_invocation_idx]] var<in> localInvocationIndex : u32;\\n\\ntype GWebGPUParams = [[block]] struct {\\n  [[offset 0]] u_damping : f32;\\n  [[offset 4]] u_maxSpeed : f32;\\n  [[offset 8]] u_minMovement : f32;\\n  \\n  [[offset 12]] u_coulombDisScale : f32;\\n  [[offset 16]] u_factor : f32;\\n  \\n  \\n  [[offset 20]] u_interval : f32;\\n};\\n[[binding 0, set 0]] var<uniform> gWebGPUUniformParams : GWebGPUParams;\\ntype GWebGPUBuffer0 = [[block]] struct {\\n  [[offset 0]] u_Data : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 1, set 0]] var<storage_buffer> gWebGPUBuffer0 : GWebGPUBuffer0;\\ntype GWebGPUBuffer1 = [[block]] struct {\\n  [[offset 0]] u_AveMovement : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 2, set 0]] var<storage_buffer> gWebGPUBuffer1 : GWebGPUBuffer1;\\ntype GWebGPUBuffer2 = [[block]] struct {\\n  [[offset 0]] u_NodeAttributeArray1 : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 3, set 0]] var<storage_buffer> gWebGPUBuffer2 : GWebGPUBuffer2;\\ntype GWebGPUBuffer3 = [[block]] struct {\\n  [[offset 0]] u_NodeAttributeArray2 : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 4, set 0]] var<storage_buffer> gWebGPUBuffer3 : GWebGPUBuffer3;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nfn unpack_float(packedValue : f32) -> vec2<i32> {var packedIntValue : i32 = i32(packedValue);\\nvar v0 : i32 = packedIntValue / 1048576;\\nreturn vec2<i32>(v0, packedIntValue - (v0 * 1048576));}\\nfn calcRepulsive(i : i32, currentNode : vec4<f32>) -> vec2<f32> {var ax : f32 = 0.0;\\nvar ay : f32 = 0.0;\\nfor (var j : i32 = 0; j < __DefineValuePlaceholder__VERTEX_COUNT; j = j + 1) {if (i != j) {var nextNode : vec4<f32> = gWebGPUBuffer0.u_Data[j];\\nvar vx : f32 = currentNode.x - nextNode.x;\\nvar vy : f32 = currentNode.y - nextNode.y;\\nvar dist : f32 = std::sqrt((vx * vx) + (vy * vy)) + 0.01;\\nvar n_dist : f32 = dist * gWebGPUUniformParams.u_coulombDisScale;\\nvar direx : f32 = vx / dist;\\nvar direy : f32 = vy / dist;\\nvar attributesi : vec4<f32> = gWebGPUBuffer2.u_NodeAttributeArray1[i];\\nvar attributesj : vec4<f32> = gWebGPUBuffer2.u_NodeAttributeArray1[j];\\nvar massi : f32 = attributesi.x;\\nvar nodeStrengthi : f32 = attributesi.z;\\nvar nodeStrengthj : f32 = attributesj.z;\\nvar nodeStrength : f32 = (nodeStrengthi + nodeStrengthj) / 2.0;\\nvar param : f32 = (1000.0 * gWebGPUUniformParams.u_factor) / (n_dist * n_dist);\\nax = ax + direx * param;\\nay = ay + direy * param;}}\\nreturn vec2<f32>(ax, ay);}\\nfn calcGravity(i : i32, currentNode : vec4<f32>, attributes2 : vec4<f32>) -> vec2<f32> {var vx : f32 = currentNode.x - attributes2.x;\\nvar vy : f32 = currentNode.y - attributes2.y;\\nvar ax : f32 = vx * attributes2.w;\\nvar ay : f32 = vy * attributes2.w;\\nreturn vec2<f32>(ax, ay);}\\nfn calcAttractive(i : i32, currentNode : vec4<f32>, attributes1 : vec4<f32>) -> vec2<f32> {var mass : f32 = attributes1.x;\\nvar ax : f32 = 0.0;\\nvar ay : f32 = 0.0;\\nvar compressed : vec2<i32> = unpack_float(currentNode.z);\\nvar length : i32 = compressed.x;\\nvar arr_offset : i32 = compressed.y;\\nvar node_buffer : vec4<f32>;\\nfor (var p : i32 = 0; p < __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX; p = p + 1) {if (p >= length) {break;}\\nvar arr_idx : i32 = arr_offset + (4 * p);\\nvar buf_offset : i32 = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = gWebGPUBuffer0.u_Data[i32(arr_idx / 4)];}\\nvar float_j : f32 = node_buffer.x;\\nvar nextNode : vec4<f32> = gWebGPUBuffer0.u_Data[i32(float_j)];\\nvar vx : f32 = nextNode.x - currentNode.x;\\nvar vy : f32 = nextNode.y - currentNode.y;\\nvar dist : f32 = std::sqrt((vx * vx) + (vy * vy)) + 0.01;\\nvar direx : f32 = vx / dist;\\nvar direy : f32 = vy / dist;\\nvar edgeLength : f32 = node_buffer.y;\\nvar edgeStrength : f32 = node_buffer.z;\\nvar diff : f32 = edgeLength - dist;\\nvar param : f32 = (diff * edgeStrength) / mass;\\nax = ax - direx * param;\\nay = ay - direy * param;}\\nreturn vec2<f32>(ax, ay);}\\nfn main() -> void {var i : i32 = globalInvocationID.x;\\nvar currentNode : vec4<f32> = gWebGPUBuffer0.u_Data[i];\\nvar movement : vec4<f32> = gWebGPUBuffer1.u_AveMovement[0];\\nvar ax : f32 = 0.0;\\nvar ay : f32 = 0.0;\\nif ((i >= __DefineValuePlaceholder__VERTEX_COUNT) || (movement.x < gWebGPUUniformParams.u_minMovement)) {gWebGPUBuffer0.u_Data[i] = currentNode;\\nreturn ;}\\nvar nodeAttributes1 : vec4<f32> = gWebGPUBuffer2.u_NodeAttributeArray1[i];\\nvar nodeAttributes2 : vec4<f32> = gWebGPUBuffer3.u_NodeAttributeArray2[i];\\nvar repulsive : vec2<f32> = calcRepulsive(i, currentNode);\\nax = ax + repulsive.x;\\nay = ay + repulsive.y;\\nvar attractive : vec2<f32> = calcAttractive(i, currentNode, nodeAttributes1);\\nax = ax + attractive.x;\\nay = ay + attractive.y;\\nvar gravity : vec2<f32> = calcGravity(i, currentNode, nodeAttributes2);\\nax = ax - gravity.x;\\nay = ay - gravity.y;\\nvar param : f32 = gWebGPUUniformParams.u_interval * gWebGPUUniformParams.u_damping;\\nvar vx : f32 = ax * param;\\nvar vy : f32 = ay * param;\\nvar vlength : f32 = std::sqrt((vx * vx) + (vy * vy)) + 0.0001;\\nif (vlength > gWebGPUUniformParams.u_maxSpeed) {var param2 : f32 = gWebGPUUniformParams.u_maxSpeed / vlength;\\nvx = param2 * vx;\\nvy = param2 * vy;}\\nvar distx : f32 = vx * gWebGPUUniformParams.u_interval;\\nvar disty : f32 = vy * gWebGPUUniformParams.u_interval;\\nvar distLength : f32 = std::sqrt((distx * distx) + (disty * disty));\\ngWebGPUBuffer0.u_Data[i] = vec4<f32>(currentNode.x + distx, currentNode.y + disty, currentNode.z, distLength);\\nreturn;}\\n\\nentry_point compute as \\"main\\" = main;\\n","GLSL450":"\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(1,1,1);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\nlayout(std140, set = 0, binding = 0) uniform GWebGPUParams {\\n  float u_damping;\\n  float u_maxSpeed;\\n  float u_minMovement;\\n  \\n  float u_coulombDisScale;\\n  float u_factor;\\n  \\n  \\n  float u_interval;\\n} gWebGPUUniformParams;\\nlayout(std430, set = 0, binding = 1) buffer   GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\nlayout(std430, set = 0, binding = 2) buffer readonly  GWebGPUBuffer1 {\\n  vec4 u_AveMovement[];\\n} gWebGPUBuffer1;\\n\\nlayout(std430, set = 0, binding = 3) buffer readonly  GWebGPUBuffer2 {\\n  vec4 u_NodeAttributeArray1[];\\n} gWebGPUBuffer2;\\n\\nlayout(std430, set = 0, binding = 4) buffer readonly  GWebGPUBuffer3 {\\n  vec4 u_NodeAttributeArray2[];\\n} gWebGPUBuffer3;\\n\\n\\n\\n#define MAX_EDGE_PER_VERTEX __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n#define SHIFT_20 1048576.0\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nivec2 unpack_float(float packedValue) {int packedIntValue = int(packedValue);\\nint v0 = packedIntValue / int(SHIFT_20);\\nreturn ivec2(v0, packedIntValue - (v0 * int(SHIFT_20)));}\\nvec2 calcRepulsive(int i, vec4 currentNode) {float ax = 0.0;\\nfloat ay = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {if (i != j) {vec4 nextNode = gWebGPUBuffer0.u_Data[j];\\nfloat vx = currentNode.x - nextNode.x;\\nfloat vy = currentNode.y - nextNode.y;\\nfloat dist = sqrt((vx * vx) + (vy * vy)) + 0.01;\\nfloat n_dist = dist * gWebGPUUniformParams.u_coulombDisScale;\\nfloat direx = vx / dist;\\nfloat direy = vy / dist;\\nvec4 attributesi = gWebGPUBuffer2.u_NodeAttributeArray1[i];\\nvec4 attributesj = gWebGPUBuffer2.u_NodeAttributeArray1[j];\\nfloat massi = attributesi.x;\\nfloat nodeStrengthi = attributesi.z;\\nfloat nodeStrengthj = attributesj.z;\\nfloat nodeStrength = (nodeStrengthi + nodeStrengthj) / 2.0;\\nfloat param = (1000.0 * gWebGPUUniformParams.u_factor) / (n_dist * n_dist);\\nax += direx * param;\\nay += direy * param;}}\\nreturn vec2(ax, ay);}\\nvec2 calcGravity(int i, vec4 currentNode, vec4 attributes2) {float vx = currentNode.x - attributes2.x;\\nfloat vy = currentNode.y - attributes2.y;\\nfloat ax = vx * attributes2.w;\\nfloat ay = vy * attributes2.w;\\nreturn vec2(ax, ay);}\\nvec2 calcAttractive(int i, vec4 currentNode, vec4 attributes1) {float mass = attributes1.x;\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nivec2 compressed = unpack_float(currentNode.z);\\nint length = compressed.x;\\nint arr_offset = compressed.y;\\nvec4 node_buffer;\\nfor (int p = 0; p < MAX_EDGE_PER_VERTEX; p++) {if (p >= length) {break;}\\nint arr_idx = arr_offset + (4 * p);\\nint buf_offset = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = gWebGPUBuffer0.u_Data[int(arr_idx / 4)];}\\nfloat float_j = node_buffer.x;\\nvec4 nextNode = gWebGPUBuffer0.u_Data[int(float_j)];\\nfloat vx = nextNode.x - currentNode.x;\\nfloat vy = nextNode.y - currentNode.y;\\nfloat dist = sqrt((vx * vx) + (vy * vy)) + 0.01;\\nfloat direx = vx / dist;\\nfloat direy = vy / dist;\\nfloat edgeLength = node_buffer.y;\\nfloat edgeStrength = node_buffer.z;\\nfloat diff = edgeLength - dist;\\nfloat param = (diff * edgeStrength) / mass;\\nax -= direx * param;\\nay -= direy * param;}\\nreturn vec2(ax, ay);}\\nvoid main() {int i = globalInvocationID.x;\\nvec4 currentNode = gWebGPUBuffer0.u_Data[i];\\nvec4 movement = gWebGPUBuffer1.u_AveMovement[0];\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nif ((i >= VERTEX_COUNT) || (movement.x < gWebGPUUniformParams.u_minMovement)) {gWebGPUBuffer0.u_Data[i] = currentNode;\\nreturn ;}\\nvec4 nodeAttributes1 = gWebGPUBuffer2.u_NodeAttributeArray1[i];\\nvec4 nodeAttributes2 = gWebGPUBuffer3.u_NodeAttributeArray2[i];\\nvec2 repulsive = calcRepulsive(i, currentNode);\\nax += repulsive.x;\\nay += repulsive.y;\\nvec2 attractive = calcAttractive(i, currentNode, nodeAttributes1);\\nax += attractive.x;\\nay += attractive.y;\\nvec2 gravity = calcGravity(i, currentNode, nodeAttributes2);\\nax -= gravity.x;\\nay -= gravity.y;\\nfloat param = gWebGPUUniformParams.u_interval * gWebGPUUniformParams.u_damping;\\nfloat vx = ax * param;\\nfloat vy = ay * param;\\nfloat vlength = sqrt((vx * vx) + (vy * vy)) + 0.0001;\\nif (vlength > gWebGPUUniformParams.u_maxSpeed) {float param2 = gWebGPUUniformParams.u_maxSpeed / vlength;\\nvx = param2 * vx;\\nvy = param2 * vy;}\\nfloat distx = vx * gWebGPUUniformParams.u_interval;\\nfloat disty = vy * gWebGPUUniformParams.u_interval;\\nfloat distLength = sqrt((distx * distx) + (disty * disty));\\ngWebGPUBuffer0.u_Data[i] = vec4(currentNode.x + distx, currentNode.y + disty, currentNode.z, distLength);}\\n","GLSL100":"\\n\\nfloat epsilon = 0.00001;\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x + epsilon), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n#define MAX_EDGE_PER_VERTEX __DefineValuePlaceholder__MAX_EDGE_PER_VERTEX\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n#define SHIFT_20 1048576.0\\n\\nuniform sampler2D u_Data;\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\nuniform float u_damping;\\nuniform float u_maxSpeed;\\nuniform float u_minMovement;\\nuniform sampler2D u_AveMovement;\\nuniform vec2 u_AveMovementSize;\\nvec4 getDatau_AveMovement(vec2 address2D) {\\n  return vec4(texture2D(u_AveMovement, address2D).rgba);\\n}\\nvec4 getDatau_AveMovement(float address1D) {\\n  return getDatau_AveMovement(addrTranslation_1Dto2D(address1D, u_AveMovementSize));\\n}\\nvec4 getDatau_AveMovement(int address1D) {\\n  return getDatau_AveMovement(float(address1D));\\n}\\nuniform float u_coulombDisScale;\\nuniform float u_factor;\\nuniform sampler2D u_NodeAttributeArray1;\\nuniform vec2 u_NodeAttributeArray1Size;\\nvec4 getDatau_NodeAttributeArray1(vec2 address2D) {\\n  return vec4(texture2D(u_NodeAttributeArray1, address2D).rgba);\\n}\\nvec4 getDatau_NodeAttributeArray1(float address1D) {\\n  return getDatau_NodeAttributeArray1(addrTranslation_1Dto2D(address1D, u_NodeAttributeArray1Size));\\n}\\nvec4 getDatau_NodeAttributeArray1(int address1D) {\\n  return getDatau_NodeAttributeArray1(float(address1D));\\n}\\nuniform sampler2D u_NodeAttributeArray2;\\nuniform vec2 u_NodeAttributeArray2Size;\\nvec4 getDatau_NodeAttributeArray2(vec2 address2D) {\\n  return vec4(texture2D(u_NodeAttributeArray2, address2D).rgba);\\n}\\nvec4 getDatau_NodeAttributeArray2(float address1D) {\\n  return getDatau_NodeAttributeArray2(addrTranslation_1Dto2D(address1D, u_NodeAttributeArray2Size));\\n}\\nvec4 getDatau_NodeAttributeArray2(int address1D) {\\n  return getDatau_NodeAttributeArray2(float(address1D));\\n}\\nuniform float u_interval;\\nivec2 unpack_float(float packedValue) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nint packedIntValue = int(packedValue);\\nint v0 = packedIntValue / int(SHIFT_20);\\nreturn ivec2(v0, packedIntValue - (v0 * int(SHIFT_20)));}\\nvec2 calcRepulsive(int i, vec4 currentNode) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {if (i != j) {vec4 nextNode = getDatau_Data(j);\\nfloat vx = currentNode.x - nextNode.x;\\nfloat vy = currentNode.y - nextNode.y;\\nfloat dist = sqrt((vx * vx) + (vy * vy)) + 0.01;\\nfloat n_dist = dist * u_coulombDisScale;\\nfloat direx = vx / dist;\\nfloat direy = vy / dist;\\nvec4 attributesi = getDatau_NodeAttributeArray1(i);\\nvec4 attributesj = getDatau_NodeAttributeArray1(j);\\nfloat massi = attributesi.x;\\nfloat nodeStrengthi = attributesi.z;\\nfloat nodeStrengthj = attributesj.z;\\nfloat nodeStrength = (nodeStrengthi + nodeStrengthj) / 2.0;\\nfloat param = (1000.0 * u_factor) / (n_dist * n_dist);\\nax += direx * param;\\nay += direy * param;}}\\nreturn vec2(ax, ay);}\\nvec2 calcGravity(int i, vec4 currentNode, vec4 attributes2) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat vx = currentNode.x - attributes2.x;\\nfloat vy = currentNode.y - attributes2.y;\\nfloat ax = vx * attributes2.w;\\nfloat ay = vy * attributes2.w;\\nreturn vec2(ax, ay);}\\nvec2 calcAttractive(int i, vec4 currentNode, vec4 attributes1) {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat mass = attributes1.x;\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nivec2 compressed = unpack_float(currentNode.z);\\nint length = compressed.x;\\nint arr_offset = compressed.y;\\nvec4 node_buffer;\\nfor (int p = 0; p < MAX_EDGE_PER_VERTEX; p++) {if (p >= length) {break;}\\nint arr_idx = arr_offset + (4 * p);\\nint buf_offset = arr_idx - ((arr_idx / 4) * 4);\\nif ((p == 0) || (buf_offset == 0)) {node_buffer = getDatau_Data(int(arr_idx / 4));}\\nfloat float_j = node_buffer.x;\\nvec4 nextNode = getDatau_Data(int(float_j));\\nfloat vx = nextNode.x - currentNode.x;\\nfloat vy = nextNode.y - currentNode.y;\\nfloat dist = sqrt((vx * vx) + (vy * vy)) + 0.01;\\nfloat direx = vx / dist;\\nfloat direy = vy / dist;\\nfloat edgeLength = node_buffer.y;\\nfloat edgeStrength = node_buffer.z;\\nfloat diff = edgeLength - dist;\\nfloat param = (diff * edgeStrength) / mass;\\nax -= direx * param;\\nay -= direy * param;}\\nreturn vec2(ax, ay);}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nint i = globalInvocationID.x;\\nvec4 currentNode = getDatau_Data(i);\\nvec4 movement = getDatau_AveMovement(0.0);\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nif ((i >= VERTEX_COUNT) || (movement.x < u_minMovement)) {gl_FragColor = vec4(currentNode);\\nreturn ;}\\nvec4 nodeAttributes1 = getDatau_NodeAttributeArray1(i);\\nvec4 nodeAttributes2 = getDatau_NodeAttributeArray2(i);\\nvec2 repulsive = calcRepulsive(i, currentNode);\\nax += repulsive.x;\\nay += repulsive.y;\\nvec2 attractive = calcAttractive(i, currentNode, nodeAttributes1);\\nax += attractive.x;\\nay += attractive.y;\\nvec2 gravity = calcGravity(i, currentNode, nodeAttributes2);\\nax -= gravity.x;\\nay -= gravity.y;\\nfloat param = u_interval * u_damping;\\nfloat vx = ax * param;\\nfloat vy = ay * param;\\nfloat vlength = sqrt((vx * vx) + (vy * vy)) + 0.0001;\\nif (vlength > u_maxSpeed) {float param2 = u_maxSpeed / vlength;\\nvx = param2 * vx;\\nvy = param2 * vy;}\\nfloat distx = vx * u_interval;\\nfloat disty = vy * u_interval;\\nfloat distLength = sqrt((distx * distx) + (disty * disty));\\ngl_FragColor = vec4(vec4(currentNode.x + distx, currentNode.y + disty, currentNode.z, distLength));if (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}}\\n"},"context":{"name":"","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"MAX_EDGE_PER_VERTEX","type":"Float","runtime":true},{"name":"VERTEX_COUNT","type":"Float","runtime":true},{"name":"SHIFT_20","type":"Float","value":1048576,"runtime":false}],"uniforms":[{"name":"u_Data","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":false,"writeonly":false,"size":[1,1]},{"name":"u_damping","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_maxSpeed","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_minMovement","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_AveMovement","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_coulombDisScale","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_factor","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_NodeAttributeArray1","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_NodeAttributeArray2","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_interval","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_Data","size":[1,1],"length":1},"needPingpong":true}}`;


export const aveMovementCode = `
const VERTEX_COUNT;
@numthreads(1, 1, 1)
class CalcAveMovement {
  @in
  u_Data: vec4[];
  @in
  u_iter: float;
  @in @out
  u_AveMovement: vec4[];
  @main
  compute() {
    let movement = 0;
    for (let j: int = 0; j < VERTEX_COUNT; j++) {
      const vertex = this.u_Data[j];
      movement += vertex[3];
    }
    movement = movement / float(VERTEX_COUNT);
    this.u_AveMovement[0] = [movement, 0, 0, 0];
  }
}
`;

export const aveMovementBundle = `{"shaders":{"WGSL":"import \\"GLSL.std.450\\" as std;\\n\\n\\n# var gWebGPUDebug : bool = false;\\n# var gWebGPUDebugOutput : vec4<f32> = vec4<f32>(0.0);\\n\\n[[builtin global_invocation_id]] var<in> globalInvocationID : vec3<u32>;\\n# [[builtin work_group_size]] var<in> workGroupSize : vec3<u32>;\\n# [[builtin work_group_id]] var<in> workGroupID : vec3<u32>;\\n[[builtin local_invocation_id]] var<in> localInvocationID : vec3<u32>;\\n# [[builtin num_work_groups]] var<in> numWorkGroups : vec3<u32>;\\n[[builtin local_invocation_idx]] var<in> localInvocationIndex : u32;\\n\\ntype GWebGPUParams = [[block]] struct {\\n  [[offset 0]] u_iter : f32;\\n};\\n[[binding 0, set 0]] var<uniform> gWebGPUUniformParams : GWebGPUParams;\\ntype GWebGPUBuffer0 = [[block]] struct {\\n  [[offset 0]] u_Data : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 1, set 0]] var<storage_buffer> gWebGPUBuffer0 : GWebGPUBuffer0;\\ntype GWebGPUBuffer1 = [[block]] struct {\\n  [[offset 0]] u_AveMovement : [[stride 16]] array<vec4<f32>>;\\n};\\n[[binding 2, set 0]] var<storage_buffer> gWebGPUBuffer1 : GWebGPUBuffer1;\\n\\n\\n\\n\\n\\n\\n\\n\\nfn main() -> void {var movement : f32 = 0.0;\\nfor (var j : i32 = 0; j < __DefineValuePlaceholder__VERTEX_COUNT; j = j + 1) {var vertex : vec4<f32> = gWebGPUBuffer0.u_Data[j];\\nmovement = movement + vertex.w;}\\nmovement = movement / f32(__DefineValuePlaceholder__VERTEX_COUNT);\\ngWebGPUBuffer1.u_AveMovement[0] = vec4<f32>(movement, 0.0, 0.0, 0.0);\\nreturn;}\\n\\nentry_point compute as \\"main\\" = main;\\n","GLSL450":"\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(1,1,1);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\nlayout(std140, set = 0, binding = 0) uniform GWebGPUParams {\\n  float u_iter;\\n} gWebGPUUniformParams;\\nlayout(std430, set = 0, binding = 1) buffer readonly  GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\nlayout(std430, set = 0, binding = 2) buffer   GWebGPUBuffer1 {\\n  vec4 u_AveMovement[];\\n} gWebGPUBuffer1;\\n\\n\\n\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n\\n\\nvoid main() {float movement = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {vec4 vertex = gWebGPUBuffer0.u_Data[j];\\nmovement += vertex.w;}\\nmovement = movement / float(VERTEX_COUNT);\\ngWebGPUBuffer1.u_AveMovement[0] = vec4(movement, 0.0, 0.0, 0.0);}\\n","GLSL100":"\\n\\nfloat epsilon = 0.00001;\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x + epsilon), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n#define VERTEX_COUNT __DefineValuePlaceholder__VERTEX_COUNT\\n\\nuniform sampler2D u_Data;\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\nuniform float u_iter;\\nuniform sampler2D u_AveMovement;\\nuniform vec2 u_AveMovementSize;\\nvec4 getDatau_AveMovement(vec2 address2D) {\\n  return vec4(texture2D(u_AveMovement, address2D).rgba);\\n}\\nvec4 getDatau_AveMovement(float address1D) {\\n  return getDatau_AveMovement(addrTranslation_1Dto2D(address1D, u_AveMovementSize));\\n}\\nvec4 getDatau_AveMovement(int address1D) {\\n  return getDatau_AveMovement(float(address1D));\\n}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\nfloat movement = 0.0;\\nfor (int j = 0; j < VERTEX_COUNT; j++) {vec4 vertex = getDatau_Data(j);\\nmovement += vertex.w;}\\nmovement = movement / float(VERTEX_COUNT);\\ngl_FragColor = vec4(vec4(movement, 0.0, 0.0, 0.0));if (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}}\\n"},"context":{"name":"","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"VERTEX_COUNT","type":"Float","runtime":true}],"uniforms":[{"name":"u_Data","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_iter","type":"Float","storageClass":"Uniform","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_AveMovement","type":"vec4<f32>[]","storageClass":"StorageBuffer","readonly":false,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_AveMovement","size":[1,1],"length":1},"needPingpong":true}}`;