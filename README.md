# Client Generator Appium  [Build Status](https://travis-ci.org/pradeepgudipati/Client-Generator-Appium.svg?branch=master)
An Appium testing framework for the SDK client generator sample applications.

## Running
Providing all the setup steps have been met, you can use any of the following commands to run the tests:

* Run all tests: `npm run test`
* Run iOS tests: `npm run testios`
* Run Android tests: `npm run testandroid`

## Adding New Test Files
To add a test, go to your relevant platform under `Tests > <Platform> > <API>`, and then create the test file here. To include your test in the test suite run, you will have to add the location into the `TestOrder.js` file for that platform in the format `<API>/<File Name>`. This allows for tests to be loaded in using a preferred order, rather than leaving it to alphabetical order.

## Setup
Several environment setup steps are required before the suite will work.

### Xcode
* Install Xcode from the App Store (Currently using 9.2)

* Install command line tools:
```
xcode-select --install
```

* Accept the Xcode EULA:
```
sudo xcodebuild -license accept
```

* Open Xcode and download the required simulators (Currently 10.3)

### Homebrew
* Install Homebrew:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* Allow Homebrew to see versions:
```
brew tap caskroom/versions
```

### Java
* A version of Java is required, this will install Java 8, which is better supported by our product:
```
brew cask install java8
```

* Add the Java Home environment variable to the bash profile:
```
echo "export JAVA_HOME=$(/usr/libexec/java_home)" >> ~/.bash_profile
echo "export PATH=\$PATH:\$JAVA_HOME/bin" >> ~/.bash_profile
source ~/.bash_profile
```

### Node
* Install Node:
```
brew install node
```

* Install n for managing node versions (Optional):
```
npm install n -g
```

### Android Studio and AVD
* Install the Android Studio IDE:
```
brew cask install android-studio
```

* Launch Android Studio, and go through the setup steps

* Add the Android environment variables to the bash profile:
```
echo "export ANDROID_HOME=/Users/$(whoami)/Library/Android/sdk" >> ~/.bash_profile
echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> ~/.bash_profile
echo "export PATH=\$PATH:\$ANDROID_HOME/tools/bin" >> ~/.bash_profile
source ~/.bash_profile
```

* Download the required SDK for our test device (Currently version 25):
```
sdkmanager 'system-images;android-25;google_apis;x86'
```

* Create an AVD for testing with
```
avdmanager create avd --force --abi 'x86' --device '18' --name 'Google_Pixel' --package 'system-images;android-25;google_apis;x86'
```

### Appium Specifics
* Install Carthage:
```
brew install carthage
```

* Install the Appium doctor
```
npm install appium-doctor -g
```

### Test Configuration
Now that all of the tools have been installed, run `appium-doctor` and check the output, all of Appiums requirements should be satisfied in the output.

### Suite Specifics
* Install tool dependencies (Run from project root):
```
npm install
```
