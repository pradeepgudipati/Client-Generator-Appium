'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).place;
describe('Create Place - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Places")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Create Place")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
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
			.text().should.become(place.longitude);
	});
	it('Create Place', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/places_create_button1')
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
