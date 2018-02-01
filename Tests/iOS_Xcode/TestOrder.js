'use strict';

exports.tests = [
  
	//Tests for the Photo Collection module
	'PhotoCollection/Create.Positive.test.js',
	'PhotoCollection/Create.Negative.test.js',
	'PhotoCollection/Search.Positive.test.js',
	'PhotoCollection/ShowPhotos.Positive.test.js',
	'PhotoCollection/ShowSubCollection.Positive.test.js',
	'PhotoCollection/Update.Positive.test.js',
	'PhotoCollection/Remove.Positive.test.js',

	// Tests for the Chat module
	'Chat/Create.Negative.Test.js',
	'Chat/Create.Positive.Test.js',
	'Chat/Query.Positive.Test.js',

	// Tests for the Place module
	'Place/Create.Positive.Test.js',
	'Place/Search.Positive.Test.js',
	'Place/Search.Negative.Test.js',
	'Place/Update.Positive.Test.js',
	'Place/Delete.Positive.Test.js',

	// Tests for the Checkin module
	'Checkin/Create.Positive.test.js',
	'Checkin/Query.Positive.test.js',

	// Tests for the ACL module
	'ACL/Create.Positive.test.js',
	'ACL/Show.Positive.test.js',
	'ACL/Show.Negative.test.js',
	'ACL/Permissions.Positive.test.js',
	'ACL/Permissions.Negative.test.js',
	'ACL/Delete.Positive.test.js',
	'ACL/Delete.Negative.test.js',

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
]