"use strict";
//This index.ts file is about creating a custom task in marketplace
//import tl = require('azure-pipelines-task-lib/task');
//var request = require("request");
{
    var exec = require('child_process').exec;
    exec('robot Testcases.robot', { 'shell': 'powershell.exe' }, function (error, stdout, stderr) {
    });
}
