'use strict';

const

    driver = global.driver,
    webdriver = global.webdriver,
    user = require(`${global.projRoot}/Config/data_config.js`).user,
    photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection

    describe('Remove - Photo Collection - Positive',() => {
    
        before( () => {
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
        });

        after(() => {
            return driver.resetApp();
        });

        it('Choose Photo Collection name', () => {

            return driver
            .waitForElementById(photocollection.updatedName, webdriver.asserters.isDisplayed, 5000)
            .click()
        });

        it('Remove photo colection', () => {

            return driver
            .elementById('Remove')
            .click()
            .elementById('Delete')
            .elementById('Ok')
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
            .getAttribute('name')
            .then(text => {
             text.should.include('Deleted Successfully');
        });

    });

    });

