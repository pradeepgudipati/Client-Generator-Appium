'use strict';

exports.tests = [

	// Tests for the Places module
	'Places/Create.Positive.Test.js',
	'Places/Create.Negative.Test.js',
	'Places/Delete.Negative.Test.js',
	'Places/Delete.Positive.Test.js',

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
];
