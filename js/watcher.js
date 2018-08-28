import fs from "fs";
import path from "path";

const folders = [
    "src/classes",
    "src/aura",
    "src/pages",
    "src/components",
    "src/triggers"
];

let watchers = [];

function findTests(fileName) {
    const testClassFolder = "src/classes";
    const filePrefix = fileName.split(".")[0];
    let postTestLowerName = `${filePrefix}test.cls`;
    let postTestUpperName = `${filePrefix}Test.cls`;
    let preTestName = `_tst_${filePrefix}.cls`;

    if (fileExists(`${testClassFolder}/${postTestLowerName}`)) { return postTestLowerName; }
    if (fileExists(`${testClassFolder}/${postTestUpperName}`)) { return postTestUpperName; }

    let preTestFile = fileExists(`${testClassFolder}/${preTestName}`);
    if (preTestFile) { return preTestFile; }

    return "";
}

function watchSrc(callback, logger) {
    folders.map((folder) => {
        if (!fileExists(folder)) { return; }
        watchers.push(fs.watch(folder, (eventType, fileName) => {
            if (typeof logger === "function") { logger(`Detected a ${eventType} in ${fileName}`); }
            if (eventType !== "change") { return; }
            callback(fileName);
        }));
    });
}

function fileExists(filepath) {
    var dir = path.dirname(filepath);
    if (dir === "/" || dir === ".") { return true; }

    var filenames = fs.readdirSync(dir);

    var filteredFiles = filenames.filter((fileName) => {
        return fileName.includes(path.basename(filepath));
    });

    if (filteredFiles.length == 0) {
        return false;
    }
    else {
        return filteredFiles[0];
    }
}

export {
    findTests,
    watchSrc,
    fileExists
};