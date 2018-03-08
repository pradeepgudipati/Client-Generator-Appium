'use strict';
exports.tests = [
	// Tests for the Checkin module
	'Checkin/Create.Checkin.Negative.test.js',
	'Checkin/Create.Checkin.Positive.test.js',
	'Checkin/Checkin.Query.Positive.test.js',
	'Checkin/Checkin.Delete.Negative.test.js',
	'Checkin/Checkin.Delete.Positive.test.js',

	// Tests for the ACL module
	'ACL/Create.Positive.Test.js',
	'ACL/Show.Positive.Test.js',

	// Tests for the User module
	'User/Create.Positive.Test.js',
	'User/Login.Positive.Test.js',
	'User/Login.Negative.Test.js',
	'User/Logout.Positive.Test.js',
	'User/Show.Positive.Test.js',
	'User/Show.Negative.Test.js',
	'User/Update.Positive.Test.js',
	'User/Remove.Positive.Test.js'
]
