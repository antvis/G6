// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const setEnv = (env, value) => {
  process.env[env] = value;
};

const updatePackageJson = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (process.env.USE_TS_NODE === 'true') {
    packageJson.type = 'module';
  } else {
    delete packageJson.type;
  }
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
};

const [, , env, value] = process.argv;
setEnv(env, value);
updatePackageJson();
