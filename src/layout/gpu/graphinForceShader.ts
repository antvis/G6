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

export const graphinForceBundle = `{"shaders":{"WebGPU":"\\nlayout (\\n  local_size_x = 1,\\n  local_size_y = 1,\\n  local_size_z = 1\\n) in;\\n\\n\\nlayout(std140, set = 0, binding = 0) uniform GWebGPUParams {\\n  float u_damping;\\n  float u_maxSpeed;\\n  float u_minMovement;\\n  float u_coulombDisScale;\\n  float u_factor;\\n  float u_CenterX;\\n  float u_CenterY;\\n  float u_gravity;\\n  \\n  \\n  float u_GatherDiscreteCenterX;\\n  float u_GatherDiscreteCenterY;\\n  float u_GatherDiscreteGravity;\\n  float u_gatherDiscrete;\\n  float u_interval;\\n} gWebGPUUniformParams;\\nlayout(std430, set = 0, binding = 1) buffer   GWebGPUBuffer0 {\\n  vec4 u_Data[];\\n} gWebGPUBuffer0;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nlayout(std430, set = 0, binding = 2) buffer readonly  GWebGPUBuffer1 {\\n  vec4 u_NodeAttributeArray[];\\n} gWebGPUBuffer1;\\n\\nlayout(std430, set = 0, binding = 3) buffer readonly  GWebGPUBuffer2 {\\n  vec4 u_EdgeAttributeArray[];\\n} gWebGPUBuffer2;\\n\\n\\n\\n\\n\\n\\n\\nivec3 globalInvocationID = ivec3(gl_GlobalInvocationID);\\nivec3 workGroupSize = ivec3(gl_WorkGroupSize);\\nivec3 workGroupID = ivec3(gl_WorkGroupID);\\nivec3 localInvocationID = ivec3(gl_LocalInvocationID);\\nivec3 numWorkGroups = ivec3(gl_NumWorkGroups);\\nint localInvocationIndex = int(gl_LocalInvocationIndex);\\n\\n\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nvec2 calcRepulsive(int i,vec4 currentNode) {\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nfor (int j = 0; (j < int(VERTEX_COUNT)); j++) {if ((i != int(j))) {vec4 nextNode = gWebGPUBuffer0.u_Data[j];\\nfloat vx = (currentNode.x - float(nextNode.x));\\nfloat vy = (currentNode.y - float(nextNode.y));\\nfloat dist = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.01));\\nfloat n_dist = (dist * float(gWebGPUUniformParams.u_coulombDisScale));\\nfloat direx = (vx / float(dist));\\nfloat direy = (vy / float(dist));\\nvec4 attributesi = gWebGPUBuffer1.u_NodeAttributeArray[i];\\nvec4 attributesj = gWebGPUBuffer1.u_NodeAttributeArray[j];\\nfloat massi = attributesi.x;\\nfloat nodeStrengthi = attributesi.z;\\nfloat nodeStrengthj = attributesj.z;\\nfloat nodeStrength = ((nodeStrengthi + float(nodeStrengthj)) / float(2.0));\\nfloat param = ((1000.0 * float(gWebGPUUniformParams.u_factor)) / float((n_dist * float(n_dist))));\\nax += float((direx * float(param)));\\nay += float((direy * float(param)));}}\\nreturn vec2(ax,ay);\\n}\\nvec2 calcGravity(int i,vec4 currentNode) {\\nfloat vx = (currentNode.x - float(gWebGPUUniformParams.u_CenterX));\\nfloat vy = (currentNode.y - float(gWebGPUUniformParams.u_CenterY));\\nfloat ax = (vx * float(gWebGPUUniformParams.u_gravity));\\nfloat ay = (vy * float(gWebGPUUniformParams.u_gravity));\\nvec4 attributes = gWebGPUBuffer1.u_NodeAttributeArray[i];\\nif ((gWebGPUUniformParams.u_gatherDiscrete == float(1.0)) && (attributes.y == float(0.0))) {float vdx = (currentNode.x - float(gWebGPUUniformParams.u_GatherDiscreteCenterX));\\nfloat vdy = (currentNode.y - float(gWebGPUUniformParams.u_GatherDiscreteCenterY));\\nax += float((gWebGPUUniformParams.u_GatherDiscreteGravity * float(vdx)));\\nay += float((gWebGPUUniformParams.u_GatherDiscreteGravity * float(vdy)));}\\nreturn vec2(ax,ay);\\n}\\nvec2 calcAttractive(int i,vec4 currentNode,vec4 attributes) {\\nfloat mass = attributes.x;\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nint arr_offset = int(floor((currentNode.z + float(0.5))));\\nint length = int(floor((currentNode.w + float(0.5))));\\nvec4 node_buffer;\\nfor (int p = 0; (p < int(MAX_EDGE_PER_VERTEX)); p++) {if ((p >= int(length))) {break;}\\nint arr_idx = (arr_offset + int((4 * int(p))));\\nint buf_offset = (arr_idx - int(((arr_idx / int(4)) * int(4))));\\nif ((p == int(0)) || (buf_offset == int(0))) {node_buffer = vec4(gWebGPUBuffer0.u_Data[int((arr_idx / 4))]);}\\nfloat float_j = node_buffer.x;\\nvec4 nextNode = gWebGPUBuffer0.u_Data[int(float_j)];\\nfloat vx = (nextNode.x - float(currentNode.x));\\nfloat vy = (nextNode.y - float(currentNode.y));\\nfloat dist = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.01));\\nfloat direx = (vx / float(dist));\\nfloat direy = (vy / float(dist));\\nfloat edgeLength = node_buffer.y;\\nfloat edgeStrength = node_buffer.z;\\nfloat diff = (edgeLength - float(dist));\\nfloat param = ((diff * float(edgeStrength)) / float(mass));\\nax -= float((direx * float(param)));\\nay -= float((direy * float(param)));}\\nreturn vec2(ax,ay);\\n}\\nvoid main() {\\nint i = globalInvocationID.x;\\nvec4 currentNode = gWebGPUBuffer0.u_Data[i];\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nif ((i >= int(VERTEX_COUNT))) {gWebGPUBuffer0.u_Data[i] = vec4(currentNode);\\nreturn ;}\\nvec4 nodeAttributes = gWebGPUBuffer1.u_NodeAttributeArray[i];\\nvec2 repulsive = calcRepulsive(i,currentNode);\\nax += float(repulsive.x);\\nay += float(repulsive.y);\\nvec2 attractive = calcAttractive(i,currentNode,nodeAttributes);\\nax += float(attractive.x);\\nay += float(attractive.y);\\nvec2 gravity = calcGravity(i,currentNode);\\nax -= float(gravity.x);\\nay -= float(gravity.y);\\nfloat interval = 0.02;\\nfloat param = (gWebGPUUniformParams.u_interval * float(gWebGPUUniformParams.u_damping));\\nfloat vx = (ax * float(param));\\nfloat vy = (ay * float(param));\\nfloat vlength = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.0001));\\nif ((vlength > float(gWebGPUUniformParams.u_maxSpeed))) {float param2 = (gWebGPUUniformParams.u_maxSpeed / float(vlength));\\nvx = float((param2 * float(vx)));\\nvy = float((param2 * float(vy)));}\\nfloat distx = (vx * float(gWebGPUUniformParams.u_interval));\\nfloat disty = (vy * float(gWebGPUUniformParams.u_interval));\\ngWebGPUBuffer0.u_Data[i] = vec4(vec4((currentNode.x + float(distx)),(currentNode.y + float(disty)),currentNode.z,currentNode.w));\\n\\nif (gWebGPUDebug) {\\n  // gWebGPUBuffer0.u_Data[i] = gWebGPUDebugOutput;\\n}\\n}\\n","WebGL":"\\n#ifdef GL_FRAGMENT_PRECISION_HIGH\\n  precision highp float;\\n#else\\n  precision mediump float;\\n#endif\\n\\nuniform sampler2D u_Data;\\nuniform float u_damping;\\nuniform float u_maxSpeed;\\nuniform float u_minMovement;\\nuniform float u_coulombDisScale;\\nuniform float u_factor;\\nuniform float u_CenterX;\\nuniform float u_CenterY;\\nuniform float u_gravity;\\nuniform sampler2D u_NodeAttributeArray;\\nuniform sampler2D u_EdgeAttributeArray;\\nuniform float u_GatherDiscreteCenterX;\\nuniform float u_GatherDiscreteCenterY;\\nuniform float u_GatherDiscreteGravity;\\nuniform float u_gatherDiscrete;\\nuniform float u_interval;\\n\\nfloat epsilon = 0.00001;\\nvec2 addrTranslation_1Dto2D(float address1D, vec2 texSize) {\\n  vec2 conv_const = vec2(1.0 / texSize.x, 1.0 / (texSize.x * texSize.y));\\n  vec2 normAddr2D = float(address1D) * conv_const;\\n  return vec2(fract(normAddr2D.x + epsilon), normAddr2D.y);\\n}\\n\\nvoid barrier() {}\\n  \\n\\nuniform vec2 u_DataSize;\\nvec4 getDatau_Data(vec2 address2D) {\\n  return vec4(texture2D(u_Data, address2D).rgba);\\n}\\nvec4 getDatau_Data(float address1D) {\\n  return getDatau_Data(addrTranslation_1Dto2D(address1D, u_DataSize));\\n}\\nvec4 getDatau_Data(int address1D) {\\n  return getDatau_Data(float(address1D));\\n}\\n\\n\\nuniform vec2 u_NodeAttributeArraySize;\\nvec4 getDatau_NodeAttributeArray(vec2 address2D) {\\n  return vec4(texture2D(u_NodeAttributeArray, address2D).rgba);\\n}\\nvec4 getDatau_NodeAttributeArray(float address1D) {\\n  return getDatau_NodeAttributeArray(addrTranslation_1Dto2D(address1D, u_NodeAttributeArraySize));\\n}\\nvec4 getDatau_NodeAttributeArray(int address1D) {\\n  return getDatau_NodeAttributeArray(float(address1D));\\n}\\n\\n\\nuniform vec2 u_EdgeAttributeArraySize;\\nvec4 getDatau_EdgeAttributeArray(vec2 address2D) {\\n  return vec4(texture2D(u_EdgeAttributeArray, address2D).rgba);\\n}\\nvec4 getDatau_EdgeAttributeArray(float address1D) {\\n  return getDatau_EdgeAttributeArray(addrTranslation_1Dto2D(address1D, u_EdgeAttributeArraySize));\\n}\\nvec4 getDatau_EdgeAttributeArray(int address1D) {\\n  return getDatau_EdgeAttributeArray(float(address1D));\\n}\\n\\nuniform vec2 u_OutputTextureSize;\\nuniform int u_OutputTexelCount;\\nvarying vec2 v_TexCoord;\\n\\nbool gWebGPUDebug = false;\\nvec4 gWebGPUDebugOutput = vec4(0.0);\\n\\nvec2 calcRepulsive(int i,vec4 currentNode) {\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nfor (int j = 0; (j < int(VERTEX_COUNT)); j++) {if ((i != int(j))) {vec4 nextNode = getDatau_Data(j);\\nfloat vx = (currentNode.x - float(nextNode.x));\\nfloat vy = (currentNode.y - float(nextNode.y));\\nfloat dist = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.01));\\nfloat n_dist = (dist * float(u_coulombDisScale));\\nfloat direx = (vx / float(dist));\\nfloat direy = (vy / float(dist));\\nvec4 attributesi = getDatau_NodeAttributeArray(i);\\nvec4 attributesj = getDatau_NodeAttributeArray(j);\\nfloat massi = attributesi.x;\\nfloat nodeStrengthi = attributesi.z;\\nfloat nodeStrengthj = attributesj.z;\\nfloat nodeStrength = ((nodeStrengthi + float(nodeStrengthj)) / float(2.0));\\nfloat param = ((1000.0 * float(u_factor)) / float((n_dist * float(n_dist))));\\nax += float((direx * float(param)));\\nay += float((direy * float(param)));}}\\nreturn vec2(ax,ay);\\n}\\nvec2 calcGravity(int i,vec4 currentNode) {\\nfloat vx = (currentNode.x - float(u_CenterX));\\nfloat vy = (currentNode.y - float(u_CenterY));\\nfloat ax = (vx * float(u_gravity));\\nfloat ay = (vy * float(u_gravity));\\nvec4 attributes = getDatau_NodeAttributeArray(i);\\nif ((u_gatherDiscrete == float(1.0)) && (attributes.y == float(0.0))) {float vdx = (currentNode.x - float(u_GatherDiscreteCenterX));\\nfloat vdy = (currentNode.y - float(u_GatherDiscreteCenterY));\\nax += float((u_GatherDiscreteGravity * float(vdx)));\\nay += float((u_GatherDiscreteGravity * float(vdy)));}\\nreturn vec2(ax,ay);\\n}\\nvec2 calcAttractive(int i,vec4 currentNode,vec4 attributes) {\\nfloat mass = attributes.x;\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nint arr_offset = int(floor((currentNode.z + float(0.5))));\\nint length = int(floor((currentNode.w + float(0.5))));\\nvec4 node_buffer;\\nfor (int p = 0; (p < int(MAX_EDGE_PER_VERTEX)); p++) {if ((p >= int(length))) {break;}\\nint arr_idx = (arr_offset + int((4 * int(p))));\\nint buf_offset = (arr_idx - int(((arr_idx / int(4)) * int(4))));\\nif ((p == int(0)) || (buf_offset == int(0))) {node_buffer = vec4(getDatau_Data(int((arr_idx / int(4)))));}\\nfloat float_j = node_buffer.x;\\nvec4 nextNode = getDatau_Data(int(float_j));\\nfloat vx = (nextNode.x - float(currentNode.x));\\nfloat vy = (nextNode.y - float(currentNode.y));\\nfloat dist = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.01));\\nfloat direx = (vx / float(dist));\\nfloat direy = (vy / float(dist));\\nfloat edgeLength = node_buffer.y;\\nfloat edgeStrength = node_buffer.z;\\nfloat diff = (edgeLength - float(dist));\\nfloat param = ((diff * float(edgeStrength)) / float(mass));\\nax -= float((direx * float(param)));\\nay -= float((direy * float(param)));}\\nreturn vec2(ax,ay);\\n}\\nvoid main() {\\nivec3 workGroupSize = ivec3(1, 1, 1);\\nivec3 numWorkGroups = ivec3(1, 1, 1);     \\nint globalInvocationIndex = int(floor(v_TexCoord.x * u_OutputTextureSize.x))\\n  + int(floor(v_TexCoord.y * u_OutputTextureSize.y)) * int(u_OutputTextureSize.x);\\nint workGroupIDLength = globalInvocationIndex / (workGroupSize.x * workGroupSize.y * workGroupSize.z);\\nivec3 workGroupID = ivec3(workGroupIDLength / numWorkGroups.y / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.z, workGroupIDLength / numWorkGroups.x / numWorkGroups.y);\\nint localInvocationIDZ = globalInvocationIndex / (workGroupSize.x * workGroupSize.y);\\nint localInvocationIDY = (globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y) / workGroupSize.x;\\nint localInvocationIDX = globalInvocationIndex - localInvocationIDZ * workGroupSize.x * workGroupSize.y - localInvocationIDY * workGroupSize.x;\\nivec3 localInvocationID = ivec3(localInvocationIDX, localInvocationIDY, localInvocationIDZ);\\nivec3 globalInvocationID = workGroupID * workGroupSize + localInvocationID;\\nint localInvocationIndex = localInvocationID.z * workGroupSize.x * workGroupSize.y\\n                + localInvocationID.y * workGroupSize.x + localInvocationID.x;\\n\\nint i = globalInvocationID.x;\\nvec4 currentNode = getDatau_Data(i);\\nfloat ax = 0.0;\\nfloat ay = 0.0;\\nif ((i >= int(VERTEX_COUNT))) {gl_FragColor = vec4(currentNode);\\nreturn ;}\\nvec4 nodeAttributes = getDatau_NodeAttributeArray(i);\\nvec2 repulsive = calcRepulsive(i,currentNode);\\nax += float(repulsive.x);\\nay += float(repulsive.y);\\nvec2 attractive = calcAttractive(i,currentNode,nodeAttributes);\\nax += float(attractive.x);\\nay += float(attractive.y);\\nvec2 gravity = calcGravity(i,currentNode);\\nax -= float(gravity.x);\\nay -= float(gravity.y);\\nfloat interval = 0.02;\\nfloat param = (u_interval * float(u_damping));\\nfloat vx = (ax * float(param));\\nfloat vy = (ay * float(param));\\nfloat vlength = (sqrt(((vx * float(vx)) + float((vy * float(vy))))) + float(0.0001));\\nif ((vlength > float(u_maxSpeed))) {float param2 = (u_maxSpeed / float(vlength));\\nvx = float((param2 * float(vx)));\\nvy = float((param2 * float(vy)));}\\nfloat distx = (vx * float(u_interval));\\nfloat disty = (vy * float(u_interval));\\ngl_FragColor = vec4(vec4((currentNode.x + float(distx)),(currentNode.y + float(disty)),currentNode.z,currentNode.w));\\n\\nif (gWebGPUDebug) {\\n  gl_FragColor = gWebGPUDebugOutput;\\n}\\n}\\n    "},"context":{"name":"GraphinForce","dispatch":[1,1,1],"threadGroupSize":[1,1,1],"maxIteration":1,"defines":[{"name":"MAX_EDGE_PER_VERTEX","value":14,"runtime":true},{"name":"VERTEX_COUNT","value":34,"runtime":true}],"uniforms":[{"name":"u_Data","type":"sampler2D","format":"vec4[]","readonly":false,"writeonly":false,"size":[1,1]},{"name":"u_damping","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_maxSpeed","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_minMovement","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_coulombDisScale","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_factor","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_CenterX","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_CenterY","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_gravity","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_NodeAttributeArray","type":"sampler2D","format":"vec4[]","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_EdgeAttributeArray","type":"sampler2D","format":"vec4[]","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_GatherDiscreteCenterX","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_GatherDiscreteCenterY","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_GatherDiscreteGravity","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_gatherDiscrete","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]},{"name":"u_interval","type":"float","format":"float","readonly":true,"writeonly":false,"size":[1,1]}],"globalDeclarations":[],"output":{"name":"u_Data","size":[1,1],"length":616,"outputElementsPerTexel":4},"needPingpong":true}}`


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