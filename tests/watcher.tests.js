import { expect } from "chai";
import sinon from "sinon";
import { watchSrc } from "../watcher";
import * as fs from "fs";

const fileName = "src/test.xml";

describe("source directory watcher", () => {
    before(() => {
        fs.writeFileSync(fileName, "");
    });

    it("should call given function on file save", () => {
        var callback = sinon.spy();
        
        watchSrc(callback);        

        fs.appendFile(fileName, "test", () => {
            expect(callback.called).to.be.true;
        });        
    });

    after(() => {
        fs.unlink(fileName);
    })
});
