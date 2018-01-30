'use strict';

const

    driver = global.driver,
    webdriver = global.webdriver,
    user = require(`${global.projRoot}/Config/data_config.js`).user,
    photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection

    describe('Search - Photo Collection - Positive',() => {
    
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
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
            .click()
            .elementById('Photo Collections')
            .click()
            .waitForElementById('Search Photo Collection', webdriver.asserters.isDisplayed, 10000)
			.click()
        });

        after(() => {
            return driver.resetApp();
        });

        it('Choose Photo Collection name', () => {

            return driver
            .waitForElementById(photocollection.name, webdriver.asserters.isDisplayed, 10000)
            .click()
            .sleep(10000);
        });


    })

