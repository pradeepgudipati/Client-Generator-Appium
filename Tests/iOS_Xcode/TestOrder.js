'use strict';
exports.tests = [
  
	// Tests for the Chat module
	'Chat/Create.Positive.Test.js',
	'Chat/Create.Negative.Test.js',
	'Chat/Query.Positive.Test.js',
	'Chat/Query.Negative.Test.js',
	'Chat/Delete.Negative.Test.js',
	'Chat/Delete.Positive.Test.js',

	//Tests for the Photo Collection module
	'PhotoCollection/Create.Positive.test.js',
	'PhotoCollection/Create.Negative.test.js',
	'PhotoCollection/ShowPhotos.Positive.test.js',
	'PhotoCollection/ShowSubCollection.Positive.test.js',
	'PhotoCollection/Update.Positive.test.js',
	'PhotoCollection/Remove.Positive.test.js',

	// Tests for the CustomObjects module
	'CustomObjects/Create.Object.Positive.test.js',
	'CustomObjects/Create.Object.Negative.test.js',
	'CustomObjects/Query.Remove.Negative.test.js',
	'CustomObjects/Query.Remove.Positive.test.js',

	//Tests for the Place module
	'Place/Create.Positive.Test.js',
	'Place/Create.Negative.Test.js',
	'Place/Update.Negative.Test.js',
	'Place/Update.Positive.Test.js',
	'Place/Search.Positive.Test.js',
	'Place/Search.Negative.Test.js',
	'Place/Delete.Negative.Test.js',
	'Place/Delete.Positive.Test.js',

	// Tests for the Checkin module
	'Checkin/Create.Checkin.Positive.test.js',
	'Checkin/Create.Checkin.Negative.test.js',
	'Checkin/Query.Positive.test.js',
	'Checkin/Delete.Negative.test.js',
	'Checkin/Delete.Positive.test.js',

	// Tests for the ACL module
	'ACL/Create.Positive.test.js',
	'ACL/Create.Negative.test.js',
	'ACL/Update.Positive.test.js',
	'ACL/Update.Negative.test.js',
	'ACL/Show.Positive.test.js',
	'ACL/Show.Negative.test.js',
	'ACL/Permissions.Positive.test.js',
	'ACL/Permissions.Negative.test.js',
	'ACL/Delete.Negative.test.js',
	'ACL/Delete.Positive.test.js',

	// Tests for the User module
	'User/Create.Positive.Test.js',
	'User/Login.Positive.Test.js',
	'User/Login.Negative.Test.js',
	'User/Logout.Positive.Test.js',
	'User/Query.Negative.Test.js',
	'User/Show.Positive.Test.js',
	'User/Show.Negative.Test.js',
	'User/Update.Positive.Test.js',
	'User/Update.Negative.Test.js',
	'User/Remove.Positive.Test.js'
];
