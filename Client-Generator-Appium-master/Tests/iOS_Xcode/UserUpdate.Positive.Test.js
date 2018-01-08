'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

// Cannot click the update button because the keyboard isn't droppable

describe.skip('User Update - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys('wluu')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('MonkeyLord!')
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
			.waitForElementByXPath('//XCUIElementTypeTextField[@value="Wilson"]', webdriver.asserters.isDisplayed, 10000)
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeTextField[@value="Luu"]')
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu"]')
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu@appcelerator.com"]')
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.isDisplayed().should.become(true)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.isDisplayed().should.become(true);
	});

	it('Change the Email of the User', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu@appcelerator.com"]')
			.clear()
			.sendKeys('wluu@axway.com')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('MonkeyLord!')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.sendKeys('MonkeyLord!')
			.hideKeyboard()
			.elementById('UPDATE')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				console.log(text);
				text.includes('code = 200').should.equal(true);
			});
	});
});