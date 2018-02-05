'use strict';

const

    driver = global.driver,
    webdriver = global.webdriver,
    user = require(`${global.projRoot}/Config/data_config.js`).user,
    photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection

    describe('Create Photo Collection - Positive',() => {
    
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
            .waitForElementById('Create Photo Collection', webdriver.asserters.isDisplayed, 10000)
			.click();
	

        });

        after(() => {
            return driver.resetApp();
        });

        it('Enter Collection name', () => {

            return driver
            .elementByXPath('//XCUIElementTypeTextField[@value="Name"]')
			.sendKeys(photocollection.name)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${photocollection.name}"]`)
			.isDisplayed().should.become(true);
        });

        it('Create Photo Collection',() => {

            return driver
            .elementById('Create')
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
            .then(text => {
				text.should.include('code = 200');
                text.should.include('"method_name" = createCollection');
                text.should.include(`name = "${photocollection.name}"`);
            });

        });


    });

