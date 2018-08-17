import { it } from "mocha";
import lint from "mocha-eslint";

it("should have passing linting rules", function() {
    lint(["*.js"], {
        formatter: "compact",
        strict: true
    });
});

