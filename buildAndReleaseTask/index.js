"use strict";
//This index.ts file is about creating a custom task in marketplace
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
var request = require("request");
//This is the function whaich needs to be executed
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Getting inputs from the users
            const TestcasePath = tl.getInput("testpath", true);
            const username = tl.getInput("username", true);
            const password = tl.getInput("password", true);
            yield publishTR(username, password);
            yield publishadd(username, password);
            yield publishupdate(username, password);
            if (TestcasePath == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const TestCaseName = tl.getInput("TestcaseName", false);
            const RunIndividualTC = tl.getBoolInput("RunIndividualTestCase", false);
            console.log("Testing this if it works.");
            if (RunIndividualTC == true) {
                RunIndividualTestCase(TestCaseName, TestcasePath);
                console.log("Selected to run individual test case");
            }
            else {
                console.log("selected to run all test cases");
                RunAllTestCases(TestcasePath);
            }
            //var link : string; 
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
var link;
var link1;
//var dash: string;
//var sliced: string;
run();
function RunAllTestCases(TestPath) {
    console.log("Running all test cases in path " + TestPath);
    const { exec } = require('child_process');
    exec('robot --pythonpath .' + ' ' + '-x outputxunit.xml' + ' ' + TestPath, (error, stdout, stderr) => {
        /*if(error) {
          console.error(`Error: ${stderr}`);
          tl.setResult(tl.TaskResult.Failed,error);
          return;
        }
        /*console.log(dash);
    sliced = JSON.parse(JSON.stringify(dash)).output; TestPath
            console.log(sliced);
      console.log(`${stdout}`);
        console.log(`${stdout}`);*/
    });
}
function RunIndividualTestCase(TestCaseName, TestPath) {
    console.log("Run Individual Test Cases" + ' ' + TestCaseName);
    const { exec } = require('child_process');
    exec('robot -t' + ' ' + TestCaseName + ' ' + TestPath, (error, stdout, stderr) => {
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
    });
}
function publishTR(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("calling REST api to create new test run");
        return new Promise((resolve, reject) => {
            var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/runs?api-version=5.0";
            var request = require("request");
            request.get({ url
            }, function (error, response, body) {
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
        });
    });
}
function publishadd(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("calling REST api to add test results to a test run");
        return new Promise((resolve, reject) => {
            var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/Runs/" + link1 + "/results?api-version=5.0";
            var request = require("request");
            request.get({ url
            }, function (error, response, body) {
                //resolve(body);
                console.log(body);
                //const link = JSON.parse(body).id;
                //console.log(link);
                //console.log("end of call api ");
            }).auth(username, password, true);
        });
    });
}
function publishupdate(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("calling REST api to update test results to a test run");
        return new Promise((resolve, reject) => {
            var url = "https://dev.azure.com/sivadeep1791/BotFrameworkTest/_apis/test/runs/" + link1 + "?api-version=5.0";
            var request = require("request");
            request.get({ url
            }, function (error, response, body) {
                //resolve(body);
                console.log(body);
                //const link = JSON.parse(body).id;
                //console.log(link);
                //console.log("end of call api ");
            }).auth(username, password, true);
        });
    });
}
