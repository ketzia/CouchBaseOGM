# react-native-couchbase-lite

## Disclaimer

_This package is not an official couchbase plugin and is not supported in any way by couchbase._

* [Installation](#installation)
* [Getting Started](#getting-started)

## Installation

1. Create a new React Native project.

	```bash
	react-native init <project-name>
	```

2. Navigate to your project directory and install the plugin.

	```bash
	cd <project-name>
	npm install couchbase-ogm --save
	```

3. Link the native libraries.

	```
	react-native link couchbase-ogm
	```

	#### iOS only

	Download the Couchbase Lite iOS SDK from [here](http://www.couchbase.com/nosql-databases/downloads#) and drag **CouchbaseLite.framework**, **CouchbaseLiteListener.framework**, **CBLRegisterJSViewCompiler.h**, **libCBLJSViewCompiler.a** in the Xcode project.

	![](http://cl.ly/image/3Z1b0n0W0i3w/sdk.png)

4. Start React Native.

	```bash
	react-native start
	```

5. Build and run for iOS/Android.


## Getting Started

Check the ExampleIndex.android.js to see an example implementation of the library