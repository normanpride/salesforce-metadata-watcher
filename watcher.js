import { watch } from "fs";

export function watchSrc(callback, logger) {
    watch("src", (eventType, fileName) => {
        if (typeof logger === "function") { logger(`Detected a ${eventType} in ${fileName}`); }
        callback.call(fileName);
    });
}