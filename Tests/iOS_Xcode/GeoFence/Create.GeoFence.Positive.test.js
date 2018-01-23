'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	geofence = require(`${global.projRoot}/Config/data_config.js`).geofence, 
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('GeoFence Create - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username) //binding static information to input fields
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password) //binding static information to input fields
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			//will wait for 10000 seconds when alert is being display
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000) 
			.click()
			.elementById('Axway')
			.click()
			.elementById('Geo Fences')
			.click()
			.waitForElementById('Create Geo Fence', webdriver.asserters.isDisplayed, 10000)
			.click();
			// .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Create"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter Geo Fence Data', () => {
		return driver
			.elementById('Name')
			.sendKeys(geofence.name) //binding static information to input fields
			.elementById(geofence.name)
            .isDisplayed().should.become(true)

            .elementById('Latitude')
			.sendKeys(geofence.latitude) //binding static information to input fields
			.elementById(geofence.latitude)
            .isDisplayed().should.become(true)

            .elementById('Longitude')
			.sendKeys(geofence.longitude) //binding static information to input fields
			.elementById(geofence.longitude)
            .isDisplayed().should.become(true)

            .elementById('Radius')
			.sendKeys(geofence.radius) //binding static information to input fields
			.elementById(geofence.radius)
			.isDisplayed().should.become(true)
			
	});

	it('Create Geo Fence',()=>{
	  return driver
			.elementById('Create') //will search for element id namely create Geo Fence
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { //Api response is handled
				text.should.include('code = 200');
				text.should.include('"method_name" = createGeoFence');
				text.should.include(`name = "${geofence.name}"`);
				text.should.include('"public_read" = 0');
				text.should.include('"public_write" = 0');
			});


	});
});
