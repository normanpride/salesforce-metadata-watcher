import watcher from "./watcher";
import force from "./force";

function start() {
    watcher.watchSrc(handleChange);
}

function handleChange(fileName) {
    let pushArgs = force.buildPushCommand(fileName);
    let testArgs = force.buildTestCommand(fileName);

    
}


function runChildProcess(proc, args) {
    const child = child_process.spawn(proc, args);

    child.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
        process.stderr.write(data);
    });
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", (exitCode) => {
            if(exitCode !== 0) {
                process.exit(exitCode);
            }
            resolve();
        });
    });
}