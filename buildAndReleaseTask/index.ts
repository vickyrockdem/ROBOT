//This index.ts file is about creating a custom task in marketplace

import tl = require('azure-pipelines-task-lib/task');
var request = require("request");



//This is the function whaich needs to be executed

async function run() {
    try {
          //Getting inputs from the users
          const TestcasePath: string | undefined = tl.getInput("testpath", true);
          const username: string | undefined = tl.getInput("username", true);
          const password: string | undefined = tl.getInput("password", true);
          await publishTR(username, password);
          await publishadd(username, password);
          await publishupdate(username, password)
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
         //var link : string; 

        } catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);   
          }

}
var link : string;
var link1 : number;
run();

function RunAllTestCases(
        TestPath: string | undefined
)
{
  console.log ("Running all test cases in path " + TestPath);
  const { exec } = require('child_process')
  exec( 'robot --pythonpath .' + ' ' + '-x outputxunit.xml' + ' ' + TestPath,
  (error: any, stdout: any, stderr: any)=>{
      /*if(error) {
        console.error(`Error: ${stderr}`);
        tl.setResult(tl.TaskResult.Failed,error);
        return;
      }
      */

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
    }*/
}  )
}

async function publishTR(
  username: string | undefined,
  password: string | undefined,
) {
  console.log("calling REST api to create new test run");
  return new Promise((resolve: any, reject: any) => {
    

      var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/runs?api-version=5.0";
      var request = require("request");

      request.get(
        { url
         },

         function (error: any, response: any, body: any) {
          resolve(body);
          console.log(body);
         link1 = JSON.parse(body).value[0].id;
         console.log(link1);
          /*link2 = body.value[0].id;
          link3 = JSON.parse(JSON.stringify(body)).id;
          link4 = body.value[0].count.id;
          link5 = JSON.parse(body).count.id;
          console.log(link1);
          console.log(link2);
          console.log(link3);
          console.log(link4);
          console.log(link5);*/


      }).auth(username, password, true); 
}) 
 
}
 async function publishadd(
  username: string | undefined,
  password: string | undefined,
) {
  console.log("calling REST api to add test results to a test run");
  return new Promise((resolve: any, reject: any) => {
    

      var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/Runs/"+link1+"/results?api-version=5.0";
      var request = require("request");

      request.get(
        { url
         },

        function (error: any, response: any, body: any) {
          //resolve(body);
          console.log(body);
          //const link = JSON.parse(body).id;
          //console.log(link);
          //console.log("end of call api ");
      }).auth(username, password, true);
      
    
    }
  )}
  async function publishupdate(
    username: string | undefined,
    password: string | undefined,
  ) {
    console.log("calling REST api to update test results to a test run");
    return new Promise((resolve: any, reject: any) => {
      
  
        var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/runs/"+link1+"?api-version=5.0";
        var request = require("request");
  
        request.patch(
          { url
           },
  
          function (error: any, response: any, body: any) {
            //resolve(body);
            console.log(body);
            //const link = JSON.parse(body).id;
            //console.log(link);
            //console.log("end of call api ");
        }).auth(username, password, true);
        
      
      }
    )}
  