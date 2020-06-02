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
              RunIndividualTestCase(TestCaseName,TestcasePath);
              console.log("Selected to run individual test case");
          }
          else {
              console.log("selected to run all test cases");	
              RunAllTestCases(TestcasePath);
          }

        } catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);   
          }

}

var dash: string;
var sliced: string;
run();

function RunAllTestCases(
        TestPath: string | undefined
)
{
  console.log ("Running all test cases in path " + TestPath);
  const { exec } = require('child_process')
  var dash =exec( 'robot' + ' --pythonpath .' + ' ' + '-x outputxunit.xml' + TestPath,
  (error: any, stdout: any, stderr: any)=>{
      /*if(error) {
        console.error(`Error: ${stderr}`);
        tl.setResult(tl.TaskResult.Failed,error);
        return;
      }
      console.log(dash);
  sliced = JSON.parse(JSON.stringify(dash)).output; TestPath
          console.log(sliced);
    console.log(`${stdout}`);
      console.log(`${stdout}`);*/

    })
  }

function RunIndividualTestCase( 
          TestCaseName: string | undefined,      
          TestPath: String | undefined
          
)      
{
  console.log ("Run Individual Test Cases" + ' ' + TestCaseName);
  const { exec } = require('child_process')
  exec('robot -t' + ' '  + TestCaseName + ' ' +  TestPath,
  (error: any, stdout: any, stderr: any)=>{
    /*if(error) {
      console.error(`Error: ${stderr}`);
      tl.setResult(tl.TaskResult.Failed,error);
      return;P
    }
    console.log(dash);
  sliced = JSON.parse(JSON.stringify(dash)).output; 
          console.log(sliced);TestPath
    console.log(`${stdout}`);
      console.log(`${stdout}`);*/
}  )
}


     


