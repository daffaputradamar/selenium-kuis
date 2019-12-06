const { describe, it, after, before } = require("mocha");
const orangehrm = require("../lib/orangehrm");

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

process.on("unhandledRejection", () => {});

(async function example() {
  try {
    describe("OrangeHRM login automated testing", async function() {
      this.timeout(50000);
      let driver, orange;

      beforeEach(async () => {
        orange = new orangehrm();
        driver = orange.driver;
        await orange.visit(
          "https://s2.demo.opensourcecms.com/orangehrm/symfony/web/index.php/auth/login"
        );
      });

      afterEach(async () => {
        await orange.quit();
      });

      it("find the input box and login button", async () => {
        const result = await orange.findInputAndButton();
        expect(result.usernameEnabled).to.equal(true);
        expect(result.passwordEnabled).to.equal(true);
        expect(result.buttonText).to.include("LOGIN");
      });

      it("put keyword in form and click login", async () => {
        const result = await orange.submitKeywordAndGetResult();
        expect(result).to.include("Welcome Admin");
      });
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
