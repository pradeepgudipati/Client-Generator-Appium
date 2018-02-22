'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;
describe('Photo Create - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Photos')
			.click()
			.elementById('Create Photo')
			.click()
			.waitForElementById('Select Photo From Gallery', webdriver.asserters.isDisplayed, 10000)
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Create a Photo', () => {
		return driver
			.waitForElementByXPath('//XCUIElementTypeButton[@name="OK"]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeCell[@name="Photo, Landscape, August 08, 2012, 11:52 AM"]')
			.click()
			.elementById('Choose')
			.click()
			.elementById('Create')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 50000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 200').should.equal(true);
				text.includes('status = ok');
				text.includes('"method_name" = createPhoto').should.equal(true);
			});
	});
});
