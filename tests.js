import { it, describe } from "mocha";
import { expect } from "chai";
import { add } from "./code";

describe("add function", () => {
    it("should add two numbers", () => {
        expect(add(2, 3)).to.equal(5);
    });
});
