import { expect } from "chai";
import sinon from "sinon";
import { watchSrc, findTests, fileExists } from "../js/watcher";
import * as fs from "fs";

const folders = ["classes", "triggers", "pages", "aura", "components"];

folders.forEach((folder) => {
    describe(`${folder} watcher`, () => {
        let deepFile = `src/${folder}/test.xml`;
    
        beforeEach(() => {
            fs.writeFileSync(deepFile, "");
        });
    
        it("should call given function on file save", (done) => {        
            var callback = sinon.fake();
            
            watchSrc(callback);
    
            fs.appendFile(deepFile, "test", () => {
                expect(callback.called).to.be.true;
                expect(callback.lastCall.lastArg).to.equal("test.xml");
                expect(callback.calledOnce).to.be.true;
                done();
            });
        });

        it("should log the actions being taken", (done) => {
            var callback = sinon.spy();
            var logger = sinon.fake();
    
            watchSrc(callback, logger);
    
            fs.appendFile(deepFile, "test", () => {
                expect(logger.lastCall.lastArg).to.equal("Detected a change in test.xml");
                done();
            });
        });

        it("should only log change actions", (done) => {
            var callback = sinon.fake();
            fs.writeFileSync(deepFile+".cls", "");

            watchSrc(callback);

            fs.unlink(deepFile+".cls",() => {
                expect(callback.called).to.be.false;
                done();
            });
        });
    
        afterEach((done) => {
            fs.unlink(deepFile, () => { done(); });
        });
    });
})

describe("test finder", () => {
    it("should find no tests", () => {
        expect(findTests("test.xml")).to.equal("");
    });

    it("should find testtest.cls", (done) => {
        let lowerFileName = "src/classes/testtest.cls";

        fs.writeFileSync(lowerFileName, "");
        
        expect(findTests("test.xml")).to.equal("testtest.cls");
        
        fs.unlink(lowerFileName, () => { done(); });
    });

    it("should find testTest.cls", (done) => {
        let lowerFileName = "src/classes/testTest.cls";

        fs.writeFileSync(lowerFileName, "");
        
        expect(findTests("test.xml")).to.equal("testTest.cls");
        
        fs.unlink(lowerFileName, () => { done(); });
    });

    it("should find anything_tst_test.cls", (done) => {
        let lowerFileName = "src/classes/anything_tst_test.cls";

        fs.writeFileSync(lowerFileName, "");
        
        expect(findTests("test.xml")).to.equal("anything_tst_test.cls");
        
        fs.unlink(lowerFileName, () => { done(); });
    });
});

describe("file finder", () => {
    it("should return false for no file", () => {
        expect(fileExists("src/classes/test.xml")).to.be.false;
    });

    it("should return filename when found a file", (done) => {
        let fileName = "src/classes/anything_tst_test.cls";

        fs.writeFileSync(fileName, "");

        expect(fileExists(fileName)).to.equal("anything_tst_test.cls");

        fs.unlink(fileName, () => { done(); });
    });

    it("should return filename when found partial file", (done) => {
        let fileName = "src/classes/anything_tst_test.cls";

        fs.writeFileSync(fileName, "");

        expect(fileExists("src/classes/_tst_test.cls")).to.equal("anything_tst_test.cls");

        fs.unlink(fileName, () => { done(); });
    });
});