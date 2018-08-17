import { expect } from "chai";
import { buildPushCommand, buildTestCommand } from "../force";

describe("force cli push command builder", () => {
    const tests = [
        { type: "nulls", arg: "", expected: "" },
        { type: "apex classes", arg: "apex.cls", expected: "force push -t ApexClass -n apex" },
        { type: "bad files", arg: "adswfhnjwetjw", expected: "" },
        { type: "apex triggers", arg: "apex.trigger", expected: "force push -t ApexTrigger -n apex" },
        { type: "unknown file formats", arg: "something.unknown", expected: "" },
        { type: "visualforce components", arg: "visualforce.component", expected: "force push -t ApexComponent -n visualforce" },
        { type: "visualforce pages", arg: "visualforce.page", expected: "force push -t ApexPage -n visualforce" },
        { type: "lightning component helper js", arg: "componentHelper.js", expected: "force push -t Aura -n src/aura/component" },
        { type: "lightning component controller js", arg: "componentController.js", expected: "force push -t Aura -n src/aura/component" },
        { type: "lightning component definition", arg: "component.cmp", expected: "force push -t Aura -n src/aura/component" },
    ];

    tests.forEach((test) => {
        it(`should create a valid command for ${test.type}`, () => {
            expect(buildPushCommand(test.arg)).to.equal(test.expected);
        });
    });
});

describe("force cli test command builder", () => {
    it("should create a test command for an apex class", () => {
        expect(buildTestCommand("test.cls")).to.equal("force test test");
    });

    it("should ignore other filenames", () => {
        expect(buildTestCommand("test.nope")).to.equal("");
    });
});