"use strict";
//This index.ts file is about creating a custom task in marketplace
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
{
    console.log("calling clild_process");
    var exec = require('child_process').exec;
    exec('robot Testcases.robot', { 'shell': 'powershell.exe' }, function (error, stdout, stderr) {
    });
}
