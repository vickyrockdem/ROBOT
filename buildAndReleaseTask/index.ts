//This index.ts file is about creating a custom task in marketplace

import tl = require('azure-pipelines-task-lib/task');
var request = require("request");

//This is the function whaich needs to be executed

async function run() {
    try {
      //Getting inputs from the users
      var TestcasePath: string | undefined = tl.getInput("TestCasePath", true);
      var RunIndividualTestCase: string | undefined = tl.getInput("RunIndividualTestCase", false);
      var TestCaseName: string | undefined = tl.getInput("TestCaseName", true);
      
       await details({ TestCasePath: TestcasePath, RunIndividualTestCase, TestCaseName }) ;
       await details(
         { TestCasePath: TestcasePath, RunIndividualTestCase, TestCaseName });
      
     } 
        catch (err) {
        console.log("error in input");
        
        var output: string;
        var sliced: string;
    }

     }
      run();

        async function details(
{ TestCasePath, RunIndividualTestCase, TestCaseName }: { TestCasePath: string | undefined; RunIndividualTestCase: string | undefined; TestCaseName: string | undefined; }      )
        
        {
          console.log ("calling clild_process");

        const { exec } = require('child_process');
        exec( 'robot -t ' + ' ' + TestCasePath, 
        {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=>{
        
        
       })
    }
