import {NativeModules} from "react-native";
import CouchbaseClient from "react-native-couchbase-lite";
let CouchbaseOGM = NativeModules.RNCouchbaseOgm;

/**
 * Returns a new Promise that contains the manager if everything went well.
 * @returns {Promise}
 */
function initManager(){
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

/**
 * Creates a new database with the specified name, must conform to Couchbase Naming Rules
 * Awaits for the manager to be started and then returns a promise with the given result or error in resolve and reject.
 * @param database_name
 * @returns {Promise}
 */
CouchbaseOGM.createDB = async function(database_name){
    let manager = await initManager();
    return new Promise((resolve,reject) => {
        manager.database.put_db({db: database_name}).then(
            function success(response){
                console.log("Success creating database: " + database_name);
                resolve(response);
            },
            function error(response){
                console.log("Error creating database: " + database_name);
                reject(response);
                return;
            }
        )
    })
};

/**
 * Gets all documents contained in the database with the given name
 * Awaits for the manager to be started and then returns a promise with the given result or error in resolve and reject.
 * @param database_name
 * @returns {Promise}
 */
CouchbaseOGM.getDBDocuments = async function(database_name){
    let manager = await initManager();
    return new Promise((resolve,reject) => {
        manager.query.get_db_all_docs({db: database_name}).then(
            function success(response){
                console.log("Success querying documents for database: " + database_name);
                let result = JSON.parse(response.data);
                resolve(result);
            },
            function error(response){
                console.log("Error trying to query documents for database: " + database_name);
                reject(response);
                return;
            }
        )
    })
};





module.exports = CouchbaseOGM;
