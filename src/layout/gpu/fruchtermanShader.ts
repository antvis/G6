export
    const gCode = `
import { globalInvocationID } from 'g-webgpu';

const SPEED_DIVISOR = 800;
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
  u_CenterX: float;

  @in
  u_CenterY: float;

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

        // 临时的无需计算平均中心的聚类方法
        // if (this.u_Clustering == 1) {
        //   const attributesi = this.u_AttributeArray[i];
        //   const attributesj = this.u_AttributeArray[j];
        //   const clusteri = attributesi[0];
        //   const clusterj = attributesj[0]
        //   if (clusteri != clusterj) {
        //     param = param * 2;
        //   } else {
        //     param *= -1
        //   }
        // }
        
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
    const vx = currentNode[0] - this.u_CenterX;
    const vy = currentNode[1] - this.u_CenterY;
    const gf = 0.01 * this.u_K * this.u_Gravity;
    dx = gf * vx;
    dy = gf * vy;

    if (this.u_Clustering == 1) {
      const clusterIdx = nodeAttributes[0];
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

      // 临时的无需计算平均中心的聚类方法
    //   if (this.u_Clustering == 1) {
    //     const attributesi = this.u_AttributeArray[i];
    //     const attributesj = this.u_AttributeArray[int(float_j)];
    //     const clusteri = attributesi[0];
    //     const clusterj = attributesj[0]
    //     if (clusteri == clusterj) {
    //       attractiveF = attractiveF * 3;
    //     }
    //   }
    
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
    const gravity = this.calcGravity(currentNode, nodeAttributes);//
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

export const cCode = '{"shaders":{"WebGPU":"\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n#define SPEED_DIVISOR 800\\nlayout(std140, set = 0, binding = 0) uniform GWebGPUParams {\\n  float u_K;\\n  float u_K2;\\n  float u_CenterX;\\n  float u_CenterY;\\n  float u_Gravity;\\n  float u_Speed;\\n  float u_MaxDisplace;\\n  float u_Clustering;\\n} gWebGPUUniformParams;\\nlayout(std430, set = 0, binding = 1) buffer   GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nlayout(std430, set = 0, binding = 2) buffer readonly  GWebGPUBuffer1 {\\n  vec4 u_AttributeArray[];\\n} gWebGPUBuffer1;\\n\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(gl_WorkGroupSize);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n\\n\\nvoid debug(vec4 o) {\\n  gWebGPUDebug = true;\\n  gWebGPUDebugOutput = o;\\n}\\nvoid debug(vec3 o) {\\n  debug(vec4(o.xyz, 0.0));\\n}\\nvoid debug(vec2 o) {\\n  debug(vec4(o.xy, 0.0, 0.0));\\n}\\nvoid debug(ivec4 o) {\\n  debug(vec4(o));\\n}\\nvoid debug(ivec3 o) {\\n  debug(vec4(o.xyz, 0.0));\\n}\\nvoid debug(ivec2 o) {\\n  debug(vec4(o.xy, 0.0, 0.0));\\n}\\nvoid debug(float o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvoid debug(int o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvoid debug(bool o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvec2 calcRepulsive(int i,vec4 currentNode) {\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nfor (int j = 0; (j < int(VERTEX_COUNT)); j++) {if ((i != int(j))) {vec4 nextNode = gWebGPUBuffer0.u_Data[j];\\nfloat xDist = (currentNode[0] - float(nextNode[0]));\\nfloat yDist = (currentNode[1] - float(nextNode[1]));\\nfloat dist = (((xDist * float(xDist)) + float((yDist * float(yDist)))) + float(0.01));\\nfloat param = (gWebGPUUniformParams.u_K2 / float(dist));\\nif ((gWebGPUUniformParams.u_Clustering == float(1.0))) {vec4 attributesi = gWebGPUBuffer1.u_AttributeArray[i];\\nvec4 attributesj = gWebGPUBuffer1.u_AttributeArray[j];\\nfloat clusteri = attributesi[0];\\nfloat clusterj = attributesj[0];\\nif ((clusteri != float(clusterj))) {param = float((param * float(2.0)));}}\\nif ((dist > float(0.0))) {dx += float((param * float(xDist)));\\ndy += float((param * float(yDist)));}}}\\nreturn vec2(dx,dy);\\n}\\nvec2 calcGravity(vec4 currentNode) {\\nfloat vx = (currentNode[0] - float(gWebGPUUniformParams.u_CenterX));\\nfloat vy = (currentNode[1] - float(gWebGPUUniformParams.u_CenterY));\\nfloat gf = ((0.01 * float(gWebGPUUniformParams.u_K)) * float(gWebGPUUniformParams.u_Gravity));\\nreturn vec2((gf * float(vx)),(gf * float(vy)));\\n}\\nvec2 calcAttractive(int i,vec4 currentNode) {\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nint arr_offset = int(floor((currentNode[2] + float(0.5))));\\nint length = int(floor((currentNode[3] + float(0.5))));\\nvec4 node_buffer;\\nfor (int p = 0; (p < int(MAX_EDGE_PER_VERTEX)); p++) {if ((p >= int(length))) {break;}\\nint arr_idx = (arr_offset + int(p));\\nint buf_offset = (arr_idx - int(((arr_idx / int(4)) * int(4))));\\nif ((p == int(0)) || (buf_offset == int(0))) {node_buffer = vec4(gWebGPUBuffer0.u_Data[int((arr_idx / 4))]);}\\nfloat float_j = ((buf_offset == int(0))) ? (node_buffer[0]) : (((buf_offset == int(1))) ? (node_buffer[1]) : (((buf_offset == int(2))) ? (node_buffer[2]) : (node_buffer[3])));\\nvec4 nextNode = gWebGPUBuffer0.u_Data[int(float_j)];\\nfloat xDist = (currentNode[0] - float(nextNode[0]));\\nfloat yDist = (currentNode[1] - float(nextNode[1]));\\nfloat dist = (sqrt(((xDist * float(xDist)) + float((yDist * float(yDist))))) + float(0.01));\\nfloat attractiveF = (dist / float(gWebGPUUniformParams.u_K));\\nif ((gWebGPUUniformParams.u_Clustering == float(1.0))) {vec4 attributesi = gWebGPUBuffer1.u_AttributeArray[i];\\nvec4 attributesj = gWebGPUBuffer1.u_AttributeArray[int(float_j)];\\nfloat clusteri = attributesi[0];\\nfloat clusterj = attributesj[0];\\nif ((clusteri == float(clusterj))) {attractiveF = float((attractiveF * float(3.0)));}}\\nif ((dist > float(0.0))) {dx -= float((xDist * float(attractiveF)));\\ndy -= float((yDist * float(attractiveF)));}}\\nreturn vec2(dx,dy);\\n}\\nvoid main() {\\nint i = globalInvocationID.x;\\nvec4 currentNode = gWebGPUBuffer0.u_Data[i];\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nif ((i >= int(VERTEX_COUNT))) {gWebGPUBuffer0.u_Data[i] = vec4(currentNode);\\nreturn ;}\\nvec2 repulsive = calcRepulsive(i,currentNode);\\ndx += float(repulsive[0]);\\ndy += float(repulsive[1]);\\nvec2 attractive = calcAttractive(i,currentNode);\\ndx += float(attractive[0]);\\ndy += float(attractive[1]);\\nvec2 gravity = calcGravity(currentNode);\\ndx -= float(gravity[0]);\\ndy -= float(gravity[1]);\\ndx *= float(gWebGPUUniformParams.u_Speed);\\ndy *= float(gWebGPUUniformParams.u_Speed);\\nfloat distLength = sqrt(((dx * float(dx)) + float((dy * float(dy)))));\\nif ((distLength > float(0.0))) {float limitedDist = min((gWebGPUUniformParams.u_MaxDisplace * float(gWebGPUUniformParams.u_Speed)),distLength);\\ngWebGPUBuffer0.u_Data[i] = vec4(vec4((currentNode[0] + float(((dx / float(distLength)) * float(limitedDist)))),(currentNode[1] + float(((dy / float(distLength)) * float(limitedDist)))),currentNode[2],currentNode[3]));}\\n\\nif (gWebGPUDebug) {\\n  // gWebGPUBuffer0.u_Data[i] = gWebGPUDebugOutput;\\n}\\n}\\n","WebGL":"\\n#ifdef GL_FRAGMENT_PRECISION_HIGH\\n  precision highp float;\\n#else\\n  precision mediump float;\\n#endif\\n#define SPEED_DIVISOR 800\\nuniform sampler2D u_Data;\\nuniform float u_K;\\nuniform float u_K2;\\nuniform float u_CenterX;\\nuniform float u_CenterY;\\nuniform float u_Gravity;\\nuniform float u_Speed;\\nuniform float u_MaxDisplace;\\nuniform float u_Clustering;\\nuniform sampler2D u_AttributeArray;\\n\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\n\\n\\nuniform vec2 u_AttributeArraySize;\\nvec4 getDatau_AttributeArray(vec2 address2D) {\\n  return vec4(texture2D(u_AttributeArray, address2D).rgba);\\n}\\nvec4 getDatau_AttributeArray(float address1D) {\\n  return getDatau_AttributeArray(addrTranslation_1Dto2D(address1D, u_AttributeArraySize));\\n}\\nvec4 getDatau_AttributeArray(int address1D) {\\n  return getDatau_AttributeArray(float(address1D));\\n}\\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\n\\n\\nvoid debug(vec4 o) {\\n  gWebGPUDebug = true;\\n  gWebGPUDebugOutput = o;\\n}\\nvoid debug(vec3 o) {\\n  debug(vec4(o.xyz, 0.0));\\n}\\nvoid debug(vec2 o) {\\n  debug(vec4(o.xy, 0.0, 0.0));\\n}\\nvoid debug(ivec4 o) {\\n  debug(vec4(o));\\n}\\nvoid debug(ivec3 o) {\\n  debug(vec4(o.xyz, 0.0));\\n}\\nvoid debug(ivec2 o) {\\n  debug(vec4(o.xy, 0.0, 0.0));\\n}\\nvoid debug(float o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvoid debug(int o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvoid debug(bool o) {\\n  debug(vec4(o, 0.0, 0.0, 0.0));\\n}\\nvec2 calcRepulsive(int i,vec4 currentNode) {\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nfor (int j = 0; (j < int(VERTEX_COUNT)); j++) {if ((i != int(j))) {vec4 nextNode = getDatau_Data(j);\\nfloat xDist = (currentNode[0] - float(nextNode[0]));\\nfloat yDist = (currentNode[1] - float(nextNode[1]));\\nfloat dist = (((xDist * float(xDist)) + float((yDist * float(yDist)))) + float(0.01));\\nfloat param = (u_K2 / float(dist));\\nif ((u_Clustering == float(1.0))) {vec4 attributesi = getDatau_AttributeArray(i);\\nvec4 attributesj = getDatau_AttributeArray(j);\\nfloat clusteri = attributesi[0];\\nfloat clusterj = attributesj[0];\\nif ((clusteri != float(clusterj))) {param = float((param * float(2.0)));}}\\nif ((dist > float(0.0))) {dx += float((param * float(xDist)));\\ndy += float((param * float(yDist)));}}}\\nreturn vec2(dx,dy);\\n}\\nvec2 calcGravity(vec4 currentNode) {\\nfloat vx = (currentNode[0] - float(u_CenterX));\\nfloat vy = (currentNode[1] - float(u_CenterY));\\nfloat gf = ((0.01 * float(u_K)) * float(u_Gravity));\\nreturn vec2((gf * float(vx)),(gf * float(vy)));\\n}\\nvec2 calcAttractive(int i,vec4 currentNode) {\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nint arr_offset = int(floor((currentNode[2] + float(0.5))));\\nint length = int(floor((currentNode[3] + float(0.5))));\\nvec4 node_buffer;\\nfor (int p = 0; (p < int(MAX_EDGE_PER_VERTEX)); p++) {if ((p >= int(length))) {break;}\\nint arr_idx = (arr_offset + int(p));\\nint buf_offset = (arr_idx - int(((arr_idx / int(4)) * int(4))));\\nif ((p == int(0)) || (buf_offset == int(0))) {node_buffer = vec4(getDatau_Data(int((arr_idx / int(4)))));}\\nfloat float_j = ((buf_offset == int(0))) ? (node_buffer[0]) : (((buf_offset == int(1))) ? (node_buffer[1]) : (((buf_offset == int(2))) ? (node_buffer[2]) : (node_buffer[3])));\\nvec4 nextNode = getDatau_Data(int(float_j));\\nfloat xDist = (currentNode[0] - float(nextNode[0]));\\nfloat yDist = (currentNode[1] - float(nextNode[1]));\\nfloat dist = (sqrt(((xDist * float(xDist)) + float((yDist * float(yDist))))) + float(0.01));\\nfloat attractiveF = (dist / float(u_K));\\nif ((u_Clustering == float(1.0))) {vec4 attributesi = getDatau_AttributeArray(i);\\nvec4 attributesj = getDatau_AttributeArray(int(float_j));\\nfloat clusteri = attributesi[0];\\nfloat clusterj = attributesj[0];\\nif ((clusteri == float(clusterj))) {attractiveF = float((attractiveF * float(3.0)));}}\\nif ((dist > float(0.0))) {dx -= float((xDist * float(attractiveF)));\\ndy -= float((yDist * float(attractiveF)));}}\\nreturn vec2(dx,dy);\\n}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\n\\nint i = globalInvocationID.x;\\nvec4 currentNode = getDatau_Data(i);\\nfloat dx = 0.0;\\nfloat dy = 0.0;\\nif ((i >= int(VERTEX_COUNT))) {gl_FragColor = vec4(currentNode);\\nreturn ;}\\nvec2 repulsive = calcRepulsive(i,currentNode);\\ndx += float(repulsive[0]);\\ndy += float(repulsive[1]);\\nvec2 attractive = calcAttractive(i,currentNode);\\ndx += float(attractive[0]);\\ndy += float(attractive[1]);\\nvec2 gravity = calcGravity(currentNode);\\ndx -= float(gravity[0]);\\ndy -= float(gravity[1]);\\ndx *= float(u_Speed);\\ndy *= float(u_Speed);\\nfloat distLength = sqrt(((dx * float(dx)) + float((dy * float(dy)))));\\nif ((distLength > float(0.0))) {float limitedDist = min((u_MaxDisplace * float(u_Speed)),distLength);\\ngl_FragColor = vec4(vec4((currentNode[0] + float(((dx / float(distLength)) * float(limitedDist)))),(currentNode[1] + float(((dy / float(distLength)) * float(limitedDist)))),currentNode[2],currentNode[3]));}\\n\\nif (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}\\n}\\n    "},"context":{"name":"Fruchterman","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"SPEED_DIVISOR","value":800,"runtime":false},{"name":"MAX_EDGE_PER_VERTEX","value":14,"runtime":true},{"name":"VERTEX_COUNT","value":34,"runtime":true}],"uniforms":[{"name":"u_Data","type":"sampler2D","format":"vec4[]","readonly":false,"writeonly":false,"size":[1,1]},{"name":"u_K","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_K2","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_CenterX","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_CenterY","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Gravity","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Speed","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_MaxDisplace","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_Clustering","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1],"data":0},{"name":"u_AttributeArray","type":"sampler2D","format":"vec4[]","readonly":true,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_Data","size":[1,1],"length":256,"outputElementsPerTexel":4}}}'