'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	photoCollection = require(`${global.projRoot}/Config/data_config.js`).photoCollection;
describe('Create PhotoCollection - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Photo Collections")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Create Photo Collection")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter PhotoCollection Name', () => {
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
				text.should.include('"code":400');
				text.should.include('"status":"fail"');
				text.should.include('"message":"Failed to authenticate user"');
			});
	});
});
