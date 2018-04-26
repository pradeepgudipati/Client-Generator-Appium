'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).place;
describe('Search Place - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click()
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(user.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(user.password)
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Success!")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.back()
			.elementByAndroidUIAutomator('new UiSelector().text("Places")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Search Place")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});

	it('Enter Place Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_textField')
			.sendKeys(place.name)
			.elementById('com.example.axway.mbaas:id/places_textField')
			.text().should.become(place.name);
	});
	
	it('Search Place', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/search_button')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => { // Test case fails as the api always returns empty response
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name":"searchPlace"');
			});
	});
});
