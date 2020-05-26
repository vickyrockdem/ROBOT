//This index.ts file is about creating a custom task in marketplace

import tl = require('azure-pipelines-task-lib/task');
var request = require("request");

{
          console.log ("calling clild_process");

        const { exec } = require('child_process');
        exec( 'robot Testcases.robot', 
        {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=>{
        
        
       })
    }
