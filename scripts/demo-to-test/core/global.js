// global object
let GLOBALSTATE = {
  staticCode: [],
};

const RESETGLOBAL = () => {
  GLOBALSTATE = { staticCode: [] };
};

const SETGLOBAL = ([start, end]) => {
  GLOBALSTATE['staticCode'].push([start, end]);
};

const INGLOBALRANGE = ([start, end]) => {
  const { staticCode } = GLOBALSTATE;
  let flag = false;
  for (let i = 0; i < staticCode.length; i++) {
    const [s, e] = staticCode[i];
    if ((start >= s && start <= e) || (end >= s && end <= e)) {
      flag = true;
    }
  }
  return flag;
};

module.exports = { RESETGLOBAL, INGLOBALRANGE, SETGLOBAL };
