const { Builder, By, until } = require("selenium-webdriver");

var baseOrangehrm = function() {
  this.driver = new Builder().forBrowser("firefox").build();

  this.visit = async function(theUrl) {
    return await this.driver.get(theUrl);
  };

  this.quit = async function() {
    return await this.driver.quit();
  };

  this.findById = async function(id) {
    await this.driver.wait(
      until.elementLocated(By.id(id)),
      10000,
      "Looking for element"
    );
    return await this.driver.findElement(By.id(id));
  };

  this.findPath = async function(path) {
    await this.driver.wait(
      until.elementLocated(By.xpath(path)),
      10000,
      "Looking for element"
    );
    return await this.driver.findElement(By.xpath(path));
  };

  this.findByName = async function(name) {
    await this.driver.wait(
      until.elementLocated(By.name(name)),
      10000,
      "Looking for element"
    );
    return await this.driver.findElement(By.name(name));
  };

  // fill input web elements
  this.write = async function(el, txt) {
    return await el.sendKeys(txt);
  };
};

module.exports = baseOrangehrm;
