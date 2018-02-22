'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

// Cannot click the update button because the keyboard isn't droppable

describe('User Update - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(tempUser.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(tempUser.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Update Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Open the page, and check that the details auto fill', () => {
		return driver
			.waitForElementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.firstName}"]`, webdriver.asserters.isDisplayed, 10000)
			.isDisplayed().should.become(true)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.lastName}"]`)
			.isDisplayed().should.become(true)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.username}"]`)
			.isDisplayed().should.become(true)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.username}"]`)
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.isDisplayed().should.become(true);
	});

	it('Change the Email of the User', () => {
		return driver
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.email}"]`)
			.clear()
			.sendKeys(tempUser.secondEmail)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(tempUser.password)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.sendKeys(tempUser.password)
			.elementById('Done')
			.click()
			.elementById('UPDATE')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 200').should.equal(true);
			});
	});
});
