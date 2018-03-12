'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).place,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Update Place - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Places")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Query Place")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter Place Name', () => {
		return driver
			.sleep(5000)
			.elementByAndroidUIAutomator(`new UiSelector().text("${place.name}")`)
			.click()
			.elementById('com.example.axway.mbaas:id/places_show_update_button2')
  			.click()
			.elementById('com.example.axway.mbaas:id/places_update_name_field')
			.clear()
			.sendKeys(tempPlace.name)
			.elementById('com.example.axway.mbaas:id/places_update_name_field')
			.text().should.become(tempPlace.name)
			.hideKeyboard();
	});
	it('Update Place', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_update_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":400');
				text.should.include('"status":"fail"');
				text.should.include('"message":"Failed to authenticate user"');
			});
	});
});
