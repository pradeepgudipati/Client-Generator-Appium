'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	photoCollection = require(`${global.projRoot}/Config/data_config.js`).photoCollection;
describe('Create PhotoCollection - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Photo Collections")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Create Photo Collection")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter Photo Collection Name', () => {
		return driver
            .elementById('com.example.axway.mbaas:id/photo_collections_create_name_field')
			.sendKeys(photoCollection.name)
			.elementById('com.example.axway.mbaas:id/photo_collections_create_name_field')
			.text().should.become(photoCollection.name);
	});
	it('Create PhotoCollection', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/photo_collections_create_create_button2')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name":"createCollection"');
			});
	});
});
