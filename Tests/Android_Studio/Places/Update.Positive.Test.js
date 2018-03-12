'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).place,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Update Place - Positive', () => {
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
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name":"updatePlace"');
			});
	});
});
