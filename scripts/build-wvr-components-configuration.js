const dotEnv = require('dotenv-override-true');
const { exec } = require('child_process');
const fs = require('fs-extra');

dotEnv.config({
  path: `${process.cwd()}/defaults.env`
});

if(process.argv[2]) {
  dotEnv.config({
    path: `${process.cwd()}/${process.argv[2]}`
  });
}

exec(`${process.cwd()}/docker-entrypoint`, () => {
  fs.copy('dist/bundle/latest/config.json', `src/config.json`);
});
