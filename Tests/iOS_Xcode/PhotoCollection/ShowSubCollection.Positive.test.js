'use strict';

const

    driver = global.driver,
    webdriver = global.webdriver,
    user = require(`${global.projRoot}/Config/data_config.js`).user,
    photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection

    describe('ShowSubCollection - Photo Collection - Positive',() => {
    
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
            .waitForElementById(photocollection.name, webdriver.asserters.isDisplayed, 10000)
            .click();
        });

        after(() => {
            return driver.resetApp();
        });

        it('Show SubCollection', () => {

            return driver
            .elementById('Show SubCollection')
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
            .getAttribute('name')
            .then(text => {
                text.should.include('code = 200');
                text.should.include('"method_name" = showCollectionSubcollections');
                
            });
        });

    });

