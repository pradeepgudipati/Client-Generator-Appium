'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection;
describe('ShowPhotos - Photo Collection - Positive', () => {
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
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 5000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Photo Collections')
			.click()
			.waitForElementById('Search Photo Collection', webdriver.asserters.isDisplayed, 5000)
			.click()
			.waitForElementById(photocollection.name, webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);
	});
	after(() => {
		return driver.resetApp();
	});
	it('Open the Photo Collection', () => {
		return driver
			.elementById(photocollection.name) // binding static information to input fields to check the photo collection
			.click()
			.elementById('Show Photos')
			.isDisplayed().should.become(true);
	});
	it('Show Photos', () => {
		return driver
			.elementById('Show Photos') // will show selected photo collection
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = showCollectionPhotos');
			});
	});
})
