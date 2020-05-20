const https = require('https');
const fs = require('fs-extra');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const spawn = require('child_process').spawn;

const basePath = 'static/report';
const lighthousePath = `${basePath}/audit`;

const url = "http://localhost:8080";
const opts = {
  configPath: './lighthouserc.js',
  chromeFlags: ['--headless'],
  logLevel: 'info',
  output: 'html'
};

let job = null;

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results)
    });
  });
}

(async function build() {
  fs.ensureDir(`${lighthousePath}`);
  job = spawn('node', ['./scripts/serve-static.js'], {
    detached : false,
    stdio: [process.stdin, process.stdout, process.stderr]
  });

launchChromeAndRunLighthouse(url, opts, null).then(results => {
  const scoreList = createScoreList(results);
  createReport(results);
  createBadges(scoreList);
  logSoreList(scoreList);
  job.kill('SIGTERM');
});

})();

const createScoreList = results => {
  const lhrScoreList = [];
  Object.keys(results.lhr.categories).forEach(key => {
    var category = results.lhr.categories[key];
    lhrScoreList.push({'id': key, 'title': category.title, 'score': (category.score*100)});
  });
  return lhrScoreList;
}

const createReport = results => {
  fs.writeFileSync(`./${lighthousePath}/report.html`, results.report );
}

const createBadges = resultList => {
  resultList.forEach(r => {
    const badgeColor = (r.score >= 0 && r.score <= 49) ? 'red' :
      (r.score >= 50 && r.score <= 89) ? 'important' :
      'success' ;
    https.get(`https://img.shields.io/badge/${r.title}-${r.score}-${badgeColor}`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        fs.writeFileSync(`./${lighthousePath}/${r.id}.svg`, data );
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  });
}

const logSoreList = scoreList => {
  console.log('Finished generating report');
  console.log('Results:');
  scoreList.forEach(s => {
    console.info(s.title, s.score);
  });
}
