//This index.ts file is about creating a custom task in marketplace

import tl = require('azure-pipelines-task-lib/task');
var request = require("request");

//This is the function whaich needs to be executed

async function run() {
    try {
      //Getting inputs from the users
      var TestcasePath: string | undefined = tl.getInput("Test Case Path", true);
      var TestCaseName: string | undefined = tl.getInput("Test Case Name", true);
      
       details(TestcasePath, TestCaseName);
      
     } 
        catch (err) {
        console.log("error in input");
        
    }

     }
      run();

        function details(
        TestPath: string | undefined,
        TestCaseName: string | undefined
      )
        
        {
          console.log ("calling clild_process");

        const { exec } = require('child_process');
        exec( 'robot  ' + ' ' + TestPath, 
        {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=>{
        
        
       })
    }