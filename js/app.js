import * as watcher from "./watcher";
import * as force from "./force";
import * as config from "../config.js";

let watching = false;

function start() {
    if (!watching) {
        let user = config.defaultForceLogin;
        console.log(`logging into a Salesforce Sandbox with ${user}`);
        force.runChildProcess("force", ["active",user])
            .then(() => { 
                console.log(`Logged in as ${user}, monitoring repository`);
                watcher.watchSrc(handleChange);
                watching = true;
            })
            .catch(() => { 
                console.log(`Force login failure`);
                process.exit; 
            });        
    }

    setTimeout(start, 1000);
}

function handleChange(fileName) {
    let pushArgs = force.buildPushCommand(fileName);
    let testFileName = watcher.findTests(fileName);
    let testArgs = force.buildTestCommand(testFileName);

    if (pushArgs.length > 0) { 
        force.runChildProcess("force", pushArgs)
            .then(() => {})
            .catch(() => { console.log(`Failed to push ${fileName}`); });
    }
    if (testArgs.length > 0) { 
        force.runChildProcess("force", testArgs)
            .then(() => {})
            .catch(() => { console.log(`Failed to push ${fileName}`); });
    }
}

export { start, handleChange };