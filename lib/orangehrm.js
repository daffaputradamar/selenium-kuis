let orangeHrm = require("./baseOrangehrm");
const locator = require("../utils/locator");
const data = require("../utils/data");

const usernameInputName = locator.usernameInputName;
const passwordInputName = locator.passwordInputName;
const buttonLoginName = locator.buttonLoginName;
const konfirmasiLoginId = locator.konfirmasiLoginId;

const usernameKeyword = data.usernameKeyword;
const passwordKeyword = data.passwordKeyword;

let usernameInput, passwordInput, btnLogin, konfirmasi;

orangeHrm.prototype.findInputAndButton = async function() {
  usernameInput = await this.findByName(usernameInputName);
  passwordInput = await this.findByName(passwordInputName);
  btnLogin = await this.findByName(buttonLoginName);

  const result = await this.driver.wait(async function() {
    const btnLoginText = await btnLogin.getAttribute("value");
    const usernameInputEnableFlag = await usernameInput.isEnabled();
    const passwordInputEnableFlag = await passwordInput.isEnabled();

    return {
      usernameEnabled: usernameInputEnableFlag,
      passwordEnabled: passwordInputEnableFlag,
      buttonText: btnLoginText
    };
  }, 5000);
  return result;
};

orangeHrm.prototype.submitKeywordAndGetResult = async function() {
  await this.findInputAndButton();
  await this.write(usernameInput, usernameKeyword);
  await this.write(passwordInput, passwordKeyword);
  await btnLogin.click();
  konfirmasi = await this.findPath("//li");
  return await this.driver.wait(async function() {
    return await konfirmasi.getText();
  }, 5000);
};

module.exports = orangeHrm;
