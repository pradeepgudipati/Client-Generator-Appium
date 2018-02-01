'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

// FIXME: There isn't anything on this page

describe('Chat Query - Negative', () => {
	before(() => {
		return driver
			.elementById('Axway')
			.click()
			.elementById('Chats')
            .click()   
			
	});

	after(() => {
		return driver.resetApp();
	});

	it('Navigate to Query Chat Groups', () => {
        return driver
        .sleep(5000)
        .waitForElementById('Query Chat Groups', webdriver.asserters.isDisplayed, 10000)
        .click();
       
    });
    
    it('Load the Current Chats', () => {

        return driver
        .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
        .getAttribute('value')
		.then(text => { //Api response is handled
			text.should.include('code = 400');
			text.should.include('message = "Failed to authenticate user"');
			});
    })
});