import {NativeModules} from "react-native";
import CouchbaseClient from "react-native-couchbase-lite";
let CouchbaseOGM = NativeModules.RNCouchbaseOgm;

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
                console.error(response);
            },
            error = (response) => {
                //console.log(response);
                console.log(response.statusText);
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
            function success(something){
                console.log(something);
            },
            function error(something){
                console.error(something);
            }
        )
    })
};

/*
CouchbaseOGM.init = function () {
    //console.log("khe pasion amigos");
    //console.log(CouchbaseClient);
    CouchbaseClient.initRESTClient(manager => {
        // use manager to perform operations
        //manager.help();
        //manager.database.put_db.help();
        manager.database.put_db({db: "Test"});
        //console.log(manager.database.get_db({db: "Test"}));

        manager.database.get_db({db: "Test"}).then(
            function success(something){
                console.log(something);
            },
            function error(something){
                console.error(something);
            }
        )
    });
};
*/

module.exports = CouchbaseOGM;
