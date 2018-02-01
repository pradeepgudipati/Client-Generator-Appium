'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

// Querying a user details

describe('User Query - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Query User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Get the users list and check the response', () => {
		return driver
			.waitForElementById('a', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByClassName('XCUIElementTypeTextView', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = showUsers');
				text.should.include('status = ok');
			});
	
	});
});