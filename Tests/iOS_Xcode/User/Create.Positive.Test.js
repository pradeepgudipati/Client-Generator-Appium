'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

describe('User Creation - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Create User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter a first name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="First Name"]')
			.sendKeys(tempUser.firstName)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.firstName}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter a last name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Last Name"]')
			.sendKeys(tempUser.lastName)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.lastName}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter a user name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="User Name"]')
			.sendKeys(tempUser.username)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.username}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter an email', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Email ID"]')
			.sendKeys(tempUser.email)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempUser.email}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter a password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(tempUser.password)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••"]')
			.isDisplayed().should.become(true);
	});

	it('Confirm the password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.sendKeys(tempUser.password)
			.elementsByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••"]')
			.then(elements => {
				elements.length.should.equal(2);
			});
	});

	it('Create the user', () => {
		return driver
			.elementById('Done')
			.click()
			.elementById('CREATE')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
			});
	});
});
