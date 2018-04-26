'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Delete Place - Negative', () => {
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
	it('Choose Place Name', () => {
		return driver
			.sleep(5000)
			.elementByAndroidUIAutomator(`new UiSelector().text("${tempPlace.name}")`)
			.text().should.become(tempPlace.name);
	});
	it('Delete Place', () => {  
		return driver
			.elementByAndroidUIAutomator(`new UiSelector().text("${tempPlace.name}")`)
			.click()
			.elementById('com.example.axway.mbaas:id/places_show_remove_button1')
			.click()
			.elementById('com.example.axway.mbaas:id/places_remove_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => { // will remove selected place
				text.should.include('"code":400');
				text.should.include('"status":"fail"');
				text.should.include('"message":"Failed to authenticate user"');
			});
	});
});
