#!/usr/bin/env node

const fs = require('fs');
let arguments = process.argv.slice(2);

function wcat(arguments) {
  let options = arguments.filter(function (data, index) {
    return data.startsWith('-');
  });

  let files = arguments.filter(function (data, index) {
    return !data.startsWith('-');
  });

  // file length
  if (files.length == 0) {
    console.log('Please specify a file name.');
    return;
  }

  for (let i = 0; i < files.length; i++) {
    if (!fs.existsSync(files[i])) {
      console.log(files[i] + ' does not exist');
      return;
    }
  }

  let numbering = 0;
  for (let i = 0; i < files.length; i++) {
    let data = fs.readFileSync(files[i], 'utf-8');
    // console.log(data);
    //
    //
    // for space
    if (options.includes('-s')) {
      let lines = data.split('\n');
      for (let j = 0; j < lines.length; j++) {
        //
        // [BINA SPACE KE NUMBERING PRINT HOGI]
        if (lines[j] != '') {
          if (options.includes('-n') || options.includes('-b')) {
            console.log(numbering + '. ' + lines[j]);
            numbering += 1;
          } else {
            console.log(lines[j]);
          }
        }
      }
    } else if (
      // 1- sirf 'n' 'b' nahi
      // 2- "n" "b" and idx(n) <<< idx(b)[n pehle hai b se]
      (options.includes('-n') && !options.includes('-b')) ||
      (options.includes('-n') &&
        options.includes('-b') &&
        options.indexOf('-n') < options.indexOf('-b'))
    ) {
      // [SPACE KE SATH NUMBERING PRINT HOGI]
      let lines = data.split('\n');
      for (let j = 0; j < lines.length; j++) {
        console.log(numbering + '. ' + lines[j]);
        numbering += 1;
      }
    } else if (options.includes('-b')) {
      // [SPACE KO NO. NHI MILEGI NUMBERING PRINT HOGI]
      let lines = data.split('\n');
      for (let j = 0; j < lines.length; j++) {
        if (lines[j] != '') {
          console.log(numbering + '. ' + lines[j]);
          numbering += 1;
        } else {
          console.log(lines[j]);
        }
      }
    } else if (options.includes('-w')) {
      if (files.length != 2 || arguments.indexOf('-w') != 1) {
        console.log('unable to run this command');
        return;
      }
      let data = fs.readFileSync(files[0], 'utf-8');
      fs.writeFileSync(files[1], data);
    } else if (options.includes('-a')) {
      if (files.length != 2 || arguments.indexOf('-a') != 1) {
        console.log('unable to run this command');
        return;
      }
      let data1 = fs.readFileSync(files[0], 'utf-8');
      let data2 = fs.readFileSync(files[1], 'utf-8');
      fs.writeFileSync(files[1], data2 + data1);
      return;
    } else {
      console.log(data);
    }
  }
}

wcat(arguments);
