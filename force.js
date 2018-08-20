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

export { buildPushCommand, buildTestCommand };