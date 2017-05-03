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
 */
CouchbaseOGM.createDB = async function(database_name){
    let manager = await initManager();
    manager.database.put_db({db: database_name}).then(
        function success(){
            console.log("Success creating database: " + database_name);
        },
        function error(){
            console.log("Error creating database: " + database_name);
        }
    )
};

CouchbaseOGM.deleteDb = async function(database_name){
    let manager = await initManager();
    manager.database.delete_db({db : database_name}).then(
        function success(){
            console.log("Success deleting database"+ database_name);
        },
        function error(){
            console.log("Error deleting database" + database_name);
        }
    )
};


CouchbaseOGM.printFn = async function(){
    let manager = await initManager();
    manager.attachment.put_db_doc_attachment.help();
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
                //console.log("Success querying documents for database: " + database_name);
                let result = JSON.parse(response.data);
                resolve(result);
            },
            function error(response){
                //console.log("Error trying to query documents for database: " + database_name);
                reject(response);
                return;
            }
        )
    })
};

CouchbaseOGM.getDBDocument = async function(doc_id,database_name){
    let manager = await initManager();
    //manager.document.get.help();
    return new Promise((resolve,reject) => {
        manager.document.get({doc:doc_id,db: database_name}).then(
            function success(response){
                //console.log("Success querying documents for database: " + database_name);
                //let result = JSON.parse(response.data);
                resolve(response);
            },
            function error(response){
                //console.log("Error trying to query documents for database: " + database_name);
                reject(response);
                return;
            }
        )
    })

};

CouchbaseOGM.createDocument = async function(doc_id,database_name,object){
    let manager = await initManager();
    //manager.document.put.help();
    manager.document.put({doc : doc_id , db: database_name, body: JSON.stringify(object)}).then(
        function success(response){
            console.log("Success creating document for database: " + database_name);
            //console.log("Success inserting docuemnt",response);
        },
        function error(response){
            //console.log("Error creating document for database: " + database_name);
            console.log("Error",response);
        }
    )
};



CouchbaseOGM.updateDocument = async function(doc_id,database_name,object,rev){
    let manager = await initManager();
    //manager.document.put.help();
    manager.document.put({doc : doc_id , db: database_name, body: JSON.stringify(object),rev: rev}).then(
        function success(response){
            //console.log("Success creating document for database: " + database_name);
            //console.log("Success inserting docuemnt",response);
        },
        function error(response){
            //console.log("Error creating document for database: " + database_name);
            //console.log("Error",response);
        }
    )
};

CouchbaseOGM.deleteDocument = async function(doc_id,database_name,rev_id){
  let manager = await initManager();
  manager.document.delete({doc: doc_id, db: database_name,rev:rev_id}).then(
      function success(response){
          console.log("si bogge");
      },
      function error(response) {
          //console.log("no bogge");
          console.log(response);
      }
    )
};




module.exports = CouchbaseOGM;