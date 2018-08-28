import { expect } from "chai";
import sinon from "sinon";
import * as fs from "fs";
import * as force from "../js/force";

import { handleChange } from "../js/app";

const fileName = "src/classes/testtest.cls";
let runProc;

describe("file watcher", () => {
    beforeEach(() => {
        runProc = sinon.stub(force, "runChildProcess")
            .resolves("")
            .rejects("");
    });

    it("should call the force cli", () => {
        handleChange("test.cls");
        
        expect(runProc.calledOnce).to.be.true;
    });

    it("should have the right arguments", () => {
        const pushCommand = ["push", "-t", "ApexClass", "-n", "test"];
        handleChange("test.cls");

        expect(runProc.firstCall.args[0]).to.equal("force");
        expect(runProc.firstCall.args[1]).to.deep.equal(pushCommand);
    });

    it("should create a test command", (done) => {
        const testCommand = ["test", "testtest"];
        fs.writeFileSync(fileName, "");

        handleChange("test.cls");

        expect(runProc.secondCall.args[0]).to.equal("force");
        expect(runProc.secondCall.args[1]).to.deep.equal(testCommand);

        fs.unlink(fileName, () => { done(); });
    });

    afterEach(() => {
        runProc.restore();
    });
});