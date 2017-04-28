import {NativeModules} from "react-native";
import CouchbaseClient from "react-native-couchbase-lite";
let CouchbaseOGM = NativeModules.RNCouchbaseOgm;

/**
 * Initializes the manager using the initRestClient function and saves a reference to the databaseManager.
 *
 */

function init(){
    return new Promise((resolve,reject) => {
        CouchbaseClient.initRESTClient(manager => {
            if(manager == null){
                reject();
                return;
            }else{
                resolve(manager);
            }

        })
    });
}


async function init2(){
    var manager = await init();
    console.log(manager);
}

CouchbaseOGM.testFunction = function (manager) {
    init().then(
        function success(manager){
            console.log(manager);
        },
        function error(error){
            console.log("error");
        }
    );
    //console.log(typeof CouchbaseClient.initRESTClient);
};

CouchbaseOGM.testFunction2 = function(){
    init2();
};


/**
 * Creates a new database with the specified name, must conform to Couchbase Naming Rules
 *
 * @param name
 */
CouchbaseOGM.createDB = function(name){
    let database_name = name;

    CouchbaseClient.initRESTClient(manager => {
        manager.database.put_db({db: database_name}).then(
            success = (response) => {
                console.info(response);
                return true;
                //console.error(response);
            },
            error = (response) => {
                //console.log(response);
                console.error(response.statusText);
            }
        )
    })
};


/**
 * Gets all of the documents contained in that database
 *
 * @param name - The name of the database that is going to be queried to get all documents
 */
CouchbaseOGM.getAllDocuments = function(name){
    let database_name = name;
    CouchbaseClient.initRESTClient(manager => {
        manager.query.get_db_all_docs({db: database_name}).then(
            function success(result){
                console.log(result);
                //console.log(JSON.parse(result.data));
                return JSON.parse(result.data);
            },
            function error(something){
                console.error(something);
            }
        )
    })
};




module.exports = CouchbaseOGM;
