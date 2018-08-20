import { expect } from "chai";
import sinon from "sinon";
import { watchSrc } from "../watcher";
import * as fs from "fs";

const fileName = "src/test.xml";

describe("source directory watcher", () => {
    beforeEach(() => {
        fs.writeFileSync(fileName, "", () => {});
    });

    it("should call given function on file save", () => {
        var callback = sinon.spy();
        
        watchSrc(callback);        

        fs.appendFile(fileName, "test", () => {
            expect(callback.called).to.be.true;
        });        
    });

    it("should call given function on file save in deeper folder", () => {
        let deepFile = "src/classes/test.xml";
        var callback = sinon.spy();
        fs.writeFileSync(deepFile, "");

        watchSrc(callback);

        fs.appendFile(deepFile, "test", () => {
            expect(callback.called).to.be.true;
        });
    });

    it("should log the actions being taken", () => {
        var callback = sinon.spy();
        var logger = sinon.fake();

        watchSrc(callback, logger);

        fs.appendFile(fileName, "test", () => {
            console.log(logger.lastCall.lastArg);
            expect(logger.lastCall.lastArg).to.equal("Detected a change in test.xml");
        });
    });

    afterEach(() => {
        fs.unlink(fileName, () => {});
    })
});
