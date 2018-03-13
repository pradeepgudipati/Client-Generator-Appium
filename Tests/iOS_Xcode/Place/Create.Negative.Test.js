'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Create - Negative', () => {
	before(() => {
		return driver
			.elementById('Axway')
			.click()
			.elementById('Places')
			.click()
			.waitForElementById('Create Place', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeTextField[@value="Name"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter the Place Name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Name"]')
			.sendKeys(tempPlace.name)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.name}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Address', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Address"]')
			.sendKeys(tempPlace.address) // binding static information to input fields 
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.address}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place City', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="City"]')
			.sendKeys(tempPlace.city) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.city}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place State', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="State"]')
			.sendKeys(tempPlace.state) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.state}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Postal Code', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Postal code"]')
			.sendKeys(tempPlace.postcode) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.postcode}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Country', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Country"]')
			.sendKeys(tempPlace.country) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.country}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Latitiude', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Latitude"]')
			.sendKeys(tempPlace.latitude) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.latitude}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Longitude', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Longitude"]')
			.sendKeys(tempPlace.longitude) // binding static information to input fields
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.longitude}"]`)
			.isDisplayed().should.become(true);
	});

	it('Create the Place', () => {
		return driver
			.elementById('Done') // will search for element id namely create place
			.click()
			.elementById('Create Place')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});