'use strict';

const driver = global.driver,
				webdriver = global.webdriver,
				user = require(`${global.projRoot}/Config/data_config.js`).user,
				place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Checkin Query Delete - Positive', () => {
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
												.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
												.click()
												.elementById('Axway')
												.click()
												.elementById('Checkins')
												.click()
												.waitForElementById('Query Checkin', webdriver.asserters.isDisplayed, 10000)
												.click()
												.waitForElementById(`Checked in to ${place.name}`, webdriver.asserters.isDisplayed, 10000);
				});

				after(() => {
								return driver.resetApp();
				});

				it('Get Details and  Delete Checkin', () => {
								return driver
												.elementById(`Checked in to ${place.name}`)
												.click()
												.waitForElementById('Delete', webdriver.asserters.isDisplayed, 10000)
												.click()
												.waitForElementById('Ok', webdriver.asserters.isDisplayed, 10000)
												.click()
												.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
												.getAttribute('value')
												.then(text => {
																text
																				.should
																				.include('code = 200');
																text
																				.should
																				.include('"method_name" = deleteCheckin');

												});
				});
});