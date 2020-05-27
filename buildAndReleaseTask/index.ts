//This index.ts file is about creating a custom task in marketplace

import tl = require('azure-pipelines-task-lib/task');
var request = require("request");

//This is the function whaich needs to be executed

async function run() {
    try {
      //Getting inputs from the users
      const TestcasePath: string | undefined = tl.getInput("testpath", true);
      if (TestcasePath == 'bad') {
        tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
        return;
    }
      const TestCaseName: string | undefined = tl.getInput("TestcaseName", false);
      const RunIndividualTC: Boolean | undefined = tl.getBoolInput("RunIndividualTestCase",false)
      console.log("Testing this if it works.");
      
      if (RunIndividualTC == true)
      {
        RunIndividualTestCase(TestcasePath,TestCaseName);
        console.log("Selected to run individual test case");
      }
      else {
        console.log("selected to run all test cases");
        RunAllTestCases(TestcasePath);
      }
       //details(TestcasePath, TestCaseName);
       
      
     } 
        catch (err) {
          tl.setResult(tl.TaskResult.Failed, err.message);
        
    }

}

run();

function RunAllTestCases(
        TestPath: string | undefined
)
{
  console.log ("Running all test cases in path " + TestPath);
  const { exec } = require('child_process')
  exec( 'robot' + ' ' + TestPath, 
    (error: any, stdout: any, stderr: any)=>{
      if(error) {
        tl.setResult(tl.TaskResult.Failed,error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    })
}

function RunIndividualTestCase(
          TestPath: String | undefined,
          TestCaseName: string | undefined
)      
{
  console.log ("Run Individual Test Case");
  //const { exec } = require('child_process')
  //exec('robot')
}
