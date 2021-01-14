const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');
const request = require('request');
const yourResponse = process.argv.slice(2); //isoltes the right input
const yourURL = yourResponse[0]; //isolates the URL we go to
const yourFile = yourResponse[1]; // isolates where we put it. 


const fetcher = function () {
  request(`${yourURL}`, (error, response, body) => {
      if(error){
          console.log(`Your so stupid. That's not a real website.`);
          // console.log(`This is the error`, error)
          rl.pause()
          return;   
      }
      else if (!error) {
      fs.exists(`${yourFile}`, function (exists) {
          if (exists) {
            rl.question("This file already exists. Would you like to overwrite? (Y/N)", (answer) => {
                if (answer === 'y') {
                  console.log('Fuck ya!')
                  writeToFile(body);
                } else if (answer === 'n') {
                  console.log('Cya');
                  rl.pause();
                  return;
                }
                else {
                  console.log(`That's not an answer, ya prick.`)
                  rl.pause()
                  return;
                }
              })
            }
          else {
            writeToFile(body);
          }
        })      
        }  
    })
  };

const writeToFile = function (content) {
  fs.writeFile(`${yourFile}`, content, function (error, data) {
    if (error) {console.log('error')}
    else {console.log(`It's saved!`);}
    rl.pause();
    return;
  })
}


fetcher()



//This is going to get me the information from the website. 