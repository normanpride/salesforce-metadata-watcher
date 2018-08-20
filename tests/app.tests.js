import { expect } from "chai";
import sinon from "sinon";

import { start } from "../app";

const fileName = "src/test.cls";

describe("file watcher", () => {
    beforeEach(() => {
        fs.writeFileSync(fileName, "");
    });

    it("should call the force cli", () => {
        start();

        fs.writeFileSync(fileName, "test");
    });
});