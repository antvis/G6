const layoutProbMap = (sensitiveFields, force: string, tense: string) => { 
  // ToDo: add directivity after PR #1881
  
  const layoutProb = {
    "force": 0,
    "radial": 0,
    "concentric": 0,
    "grid": 0,
    "circular": 0,
    "dagre": 0,
    "mds": 0,
    "fruchterman": 0
  }

  for (var n in sensitiveFields) {
    switch (sensitiveFields[n]) {
      case "tree":
        console.warn("recommend to use a tree graph");
        break;
      case "cluster":
        layoutProb["force"] += 0.8;
        layoutProb["radial"] += 0.1;
        layoutProb["fruchterman"] += 0.9;
        break;
      case "level":
        layoutProb["dagre"] += 0.9;
        break;
      default:
        break;
    }
  }

  switch (force) {
    case 'connected':
      // ToDo: in a finer-grain.
      layoutProb["force"] += 0.2;
      layoutProb["radial"] += 0.6;
      layoutProb["concentric"] += 0.9;
      layoutProb["circular"] += 0.1;
      layoutProb["dagre"] += 0.1;
      layoutProb["mds"] += 0.1;
      layoutProb["fruchterman"] += 0.1;
    case 'dense':
      if (tense === "high") {
        layoutProb["force"] += 0.6;
        layoutProb["circular"] += 0.1;
        layoutProb["dagre"] += 0.1;
        layoutProb["mds"] += 0.8;
        layoutProb["fruchterman"] += 0.1;
      } else {
        layoutProb["force"] += 0.3;
        layoutProb["circular"] += 0.1;
        layoutProb["dagre"] += 0.1;
        layoutProb["mds"] += 0.4;
        layoutProb["fruchterman"] += 0.1;
      }
      break;
    case 'normal':
      if (tense === "high") {
        layoutProb["force"] += 0.6;
        layoutProb["radial"] += 0.2;
        layoutProb["concentric"] += 0.1;
        layoutProb["circular"] += 0.1;
        layoutProb["dagre"] += 0.1;
        layoutProb["mds"] += 0.1;
        layoutProb["fruchterman"] += 0.8;
      } else {
        layoutProb["force"] += 0.3;
        layoutProb["radial"] += 0.2;
        layoutProb["concentric"] += 0.1;
        layoutProb["circular"] += 0.1;
        layoutProb["dagre"] += 0.1;
        layoutProb["mds"] += 0.1;
        layoutProb["fruchterman"] += 0.4;
      }
      break;
    case 'sparse':
      if (tense === "high") {
        layoutProb["force"] += 0.7;
        layoutProb["fruchterman"] += 0.9;
      } else {
        layoutProb["force"] += 0.7;
        layoutProb["grid"] += 0.8;
        layoutProb["fruchterman"] += 0.7;
      }
      break;
    case 'grid':
      layoutProb["grid"] += 0.9;
      break;
    default:
      break;
  }

  return layoutProb;
}

export default layoutProbMap
