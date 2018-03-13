'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).place;
describe('Create Place - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Create Place")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	// binding data to textfields
	it('Enter Place Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_name_field')
			.sendKeys(place.name)
			.elementById('com.example.axway.mbaas:id/places_create_name_field')
			.text().should.become(place.name);
	});
	it('Enter Address', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_address_field')
			.sendKeys(place.address)
			.elementById('com.example.axway.mbaas:id/places_create_address_field')
			.text().should.become(place.address);
	});
	it('Enter City', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_city_field')
			.sendKeys(place.city)
			.elementById('com.example.axway.mbaas:id/places_create_city_field')
			.text().should.become(place.city)
			.hideKeyboard();
	});
	it('Enter State', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_state_field')
			.sendKeys(place.state)
			.elementById('com.example.axway.mbaas:id/places_create_state_field')
			.text().should.become(place.state);
	});
	it('Enter PostalCode', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_postal_code_field')
			.sendKeys(place.postcode)
			.elementById('com.example.axway.mbaas:id/places_create_postal_code_field')
			.text().should.become(place.postcode);
	});
	it('Enter Latitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_latitude_field')
			.sendKeys(place.latitude)
			.elementById('com.example.axway.mbaas:id/places_create_latitude_field')
			.text().should.become(place.latitude);
	});
	it('Enter Longitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_longitude_field')
			.sendKeys(place.longitude)
			.elementById('com.example.axway.mbaas:id/places_create_longitude_field')
			.text().should.become(place.longitude)
	});
	it('Create Place', () => { // creates a place with given details
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name":"createPlace"');
			});
	});
});
