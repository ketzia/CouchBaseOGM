import {NativeModules} from "react-native";
let Couchbase = NativeModules.RNCouchbaseOgm;

Couchbase.init = function () {
    console.log("khe");
};

module.exports = Couchbase;
