'use strict';

module.exports = {
	iOS_Xcode: {
		git: 'https://github.com/pradeepgudipati/mbaas_ios-swift_test',
		appName: 'Axway-Test',
		appium: {
			platformVersion: '11.0',
			deviceName: 'iPhone 6'
		}
	},
	Android_Studio: {
		git: 'https://github.com/pradeepgudipati/mbaas_android_test',
		appName: 'Axway-Test',
		appium: {
			platformVersion: '7.0',
			deviceName: 'Nexus_6_API_26',
			appPackage: 'com.example.axway.mbaas',
			appActivity: '.LoginActivity'
		}
	}
}
