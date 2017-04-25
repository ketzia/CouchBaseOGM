import { NativeModules } from 'react-native';
const { RNCouchbaseOgm } = NativeModules;

RNCouchbaseOgm.prototype.init = function(){
    console.log("Oye khi onda");
};

export default RNCouchbaseOgm;
