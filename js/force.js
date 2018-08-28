/* globals process */

import child_process from "child_process";

const fileSuffixes = {
    cls : "ApexClass",
    trigger : "ApexTrigger",
    component : "ApexComponent",
    page : "ApexPage",
    js : "Aura",
    cmp : "Aura"
};

function buildPushCommand(fileName) {
    const filePieceArray = fileName.split(".");

    if (filePieceArray.length === 1) { return []; }

    const fileSuffix = filePieceArray[filePieceArray.length - 1];
    const metadataType = fileSuffixes[fileSuffix];

    if (!metadataType) { return []; }

    var metadataItemName = "";
    if (fileSuffix === "js") {
        var cleanName = filePieceArray[0]
            .replace("Helper", "")
            .replace("Controller", "");
        metadataItemName = `src/aura/${cleanName}`;
    }
    else if (fileSuffix === "cmp") {
        metadataItemName = `src/aura/${filePieceArray[0]}`;
    }
    else {
        metadataItemName = filePieceArray[0];
    }

    return ["push", "-t", metadataType, "-n", metadataItemName];
}

function buildTestCommand(fileName) {
    const filePieceArray = fileName.split(".");

    if (filePieceArray.length === 1) { return []; }

    const fileSuffix = filePieceArray[filePieceArray.length - 1];
    const metadataType = fileSuffixes[fileSuffix];

    if (metadataType !== "ApexClass") { return []; }

    return ["test", filePieceArray[0]];
}

function runChildProcess(proc, args) {
    const child = child_process.spawn(proc, args);

    child.stdout.on("data", (data) => {
        process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
        process.stderr.write(data);
    });
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", (exitCode) => {
            if(exitCode !== 0) {
                reject();
            }
            resolve();
        });
    });
}

export { 
    buildPushCommand,
    buildTestCommand,
    runChildProcess
};