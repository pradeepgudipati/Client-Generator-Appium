'use strict';

module.exports = {
	iOS_Xcode: {
		git: 'https://github.com/pradeepgudipati/mbaas_ios-swift_test',
		appName: 'Axway-Test',
		appium: {
			platformVersion: '10.3',
			deviceName: 'iPhone 7'
		}
	},
	Android_Studio: {
		git: 'https://github.com/pradeepgudipati/mbaas_android_test',
		appName: 'Axway-Test',
		appium: {
			platformVersion: '7.1.1',
			deviceName: 'Google_Pixel',
			appPackage: 'com.example.axway.mbaas',
			appActivity: '.LoginActivity'
		}
	}
}
