#!/usr/bin/env node

const https = require('https');
const fs = require('fs-extra');
const glob = require("glob");
console.log(' \n\n in build-wvr-components-lighthouse-badges \n\n');
const basePath = 'static/weaver-components/reports';
const lighthousePath = `${basePath}/audit`;
const lighthouseAssetsPath = `${lighthousePath}/assets`;
const lighthouseCiPath = './.lighthouseci';
console.log('\n\n basePath = ', basePath, '\n\n\n lighthousePath ',lighthousePath ,
'\n\n\n lighthouseAssetsPath ',lighthouseAssetsPath, ' \n\n\n lighthouseCiPath = ', lighthouseCiPath );
const createScoreList = report => {
  const lhrScoreList = [];
  Object.keys(report.categories).forEach(key => {
    var category = report.categories[key];
    lhrScoreList.push({'id': key, 'title': category.title, 'score': (category.score*100)});
  });
  return lhrScoreList;
}

const createReport = htmlReportPath => {
  fs.copySync( htmlReportPath , `./${lighthousePath}/index.html`);
}

const createBadges = resultList => {
  fs.ensureDirSync(lighthouseAssetsPath);
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
        fs.writeFileSync(`./${lighthouseAssetsPath}/${r.id}.svg`, data );
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
console.log('\n\n lighthouseCiPath = ', lighthouseCiPath, '\n\n lighthousePath = ', `${lighthousePath}`, '', glob.sync(`${lighthouseCiPath}/lhr-*.html`, {})[0]);
if(fs.existsSync(lighthouseCiPath)) {
  fs.ensureDir(`${lighthousePath}`);
  const htmlReportPath = glob.sync(`${lighthouseCiPath}/lhr-*.html`, {})[0];
  const jsonReportPath = glob.sync(`${lighthouseCiPath}/lhr-*.json`, {})[0];
  const jsonReportRaw = fs.readFileSync(jsonReportPath);
  const jsonReport = JSON.parse(jsonReportRaw);
  const scoreList = createScoreList(jsonReport);
  createReport(htmlReportPath);
  createBadges(scoreList);
  logSoreList(scoreList);
} else {
  console.warn(`${lighthouseCiPath} does not exist. Please run 'npm run test:audit'`);
}



