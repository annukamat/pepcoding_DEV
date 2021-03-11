require('chromedriver');

const wd = require('selenium-webdriver');
// const chrome = require("selenium-webdriver/chrome");

const browser = new wd.Builder().forBrowser('chrome').build();

let matchId = process.argv[2];
let innings = process.argv[3];

let batsmenScorecard = [];
let bowlerScoreCard = [];

let batsmenKeys = [
  'playerName',
  'out',
  'runs',
  'ballsPlayed',
  'foure',
  'sixes',
  'strikeRate',
];
let bowlerKeys = [
  'playerName',
  'over',
  'M',
  'runs',
  'wicket',
  'NB',
  'WD',
  'ECO',
];

async function main() {
  await browser.get('https://www.cricbuzz.com/live-cricket-scores/' + matchId);
  // scorecard
  await browser.wait(wd.until.elementLocated(wd.By.css('.cb-nav-bar a')));
  let buttons = await browser.findElements(wd.By.css('.cb-nav-bar a'));
  await buttons[1].click(); // scorecard clicked

  await browser.wait(
    wd.until.elementLocated(
      wd.By.css('#innings_' + innings + ' .cb-col.cb-col-100.cb-ltst-wgt-hdr')
    )
  );
  let tables = await browser.findElements(
    wd.By.css('#innings_' + innings + ' .cb-col.cb-col-100.cb-ltst-wgt-hdr')
  );

  for (let t = 0; t < 2; t++) {
    let innings1BatsmenRows = await tables[t].findElements(
      wd.By.css('.cb-col.cb-col-100.cb-scrd-itms')
    );

    for (let i = 0; i < innings1BatsmenRows.length; i++) {
      let columns = await innings1BatsmenRows[i].findElements(wd.By.css('div'));
      if (columns.length == 7) {
        let data = {};
        for (let j = 0; j < columns.length; j++) {
          let temp = await columns[j].getAttribute('innerText');
          data[batsmenKeys[j]] = await columns[j].getAttribute('innerText');
        }
        batsmenScorecard.push(data);
      } else if (columns.length == 8) {
        let data = {};
        for (let j = 0; j < columns.length; j++) {
          let temp = await columns[j].getAttribute('innerText');
          data[bowlerKeys[j]] = await columns[j].getAttribute('innerText');
        }
        bowlerScoreCard.push(data);
      }
    }
  }
  console.log(batsmenScorecard);
  console.log(bowlerScoreCard);
  await browser.close();
}

main();
