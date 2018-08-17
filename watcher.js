import { watch } from "fs";

export function watchSrc(callback) {
    watch("src", (eventType, fileName) => {
        callback.call(fileName);
    });
}