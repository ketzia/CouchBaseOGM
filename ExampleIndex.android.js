/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeModules,
    TextInput,
    Button,
    Alert,
    FlatList
} from 'react-native';

import Couchbase from "couchbase-ogm";

//let prueba2 = {asdasd:"jiji"};
//Couchbase.createDocument("test",prueba2);

/*
 Couchbase.getDBDocuments("test").then(
 function success(response){
 console.log(response);
 },
 function error(response){
 console.log(response);
 }
 )
 */


//Couchbase.createDocument("one4","test",prueba2);
/*
 Couchbase.getDBDocument("one4","test").then(
 function success(response){
 console.log(response);
 },
 function error(response){
 console.log(response);
 }
 )
 */
/*
 Couchbase.deleteDocument("one4","test","1-98188693b9ba62e8573896e9f16bcc06").then(
 function success(response){
 //console.log(response);
 //console.log(response);
 },
 function error(response){
 //console.log(response);
 }
 )
 */
//Couchbase.printFn();

export default class TestProjectArquitectura extends Component {

    /*
     Esto tambien se puede usar
     {this.state.entries.map(function(algo){
     return <Text>{algo.id};</Text>
     })}
     */

    constructor(props){
        super(props);
        this.state = {
            id: 'Input Document ID',
            name: 'Input Document name field',
            value: 'Input Document value field',
            entries: []
        }
        //console.log(this.state);
        this.getEntries();


    }

    getEntries(){
        let self = this;
        Couchbase.getDBDocuments("test").then(
            function success(response){
                self.setState({entries: response.rows});
                console.log(response.rows);
            },
            function error(response){
                console.log("Error querying for objects :/ ");
            }
        )
    }

    saveData(){
        let id = this.state.id;
        let name = this.state.name;
        let value = this.state.value;
        let self = this;

        Couchbase.createDocument(id,"test",{value:value}).then(
            function success(){
                self.getEntries();
            },
            function error(){

            }
        )

    }

    clearData(){
        Couchbase.deleteDb("test");
        this.setState({entries:[]});
    }

    createDB(){
        Couchbase.createDB("test");
        this.setState({entries:[]});
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Couchbase OGM Test!
                </Text>
                <Text style={styles.instructions}>
                    Input values to create document, these are just placeholders, when you are done please submit the form.
                </Text>
                <TextInput
                    style={{height:40,width: 200}}
                    value={this.state.id}
                    editable= {true}
                    onChangeText={(text) => this.setState({id: text})}
                />
                <TextInput
                    style={{height:40,width: 200}}
                    value={this.state.name}
                    editable= {true}
                    onChangeText={(text) => this.setState({name: text})}
                />
                <TextInput
                    style={{height:40,width: 200}}
                    value={this.state.value}
                    editable= {true}
                    onChangeText={(text) => this.setState({value: text})}
                />

                <Text>{"\n"}</Text>
                <Button
                    onPress={this.saveData.bind(this)}
                    title="Save to DB"
                    color="#841584"
                    accessibilityLabel="Learn more about purple"
                />
                <Text>{"\n"}</Text>

                <View style={{flexDirection: 'row'}}>
                    <Button
                        onPress={this.clearData.bind(this)}
                        title="Clear DB"
                        color="#e74c3c"
                        accessibilityLabel="Learn more about purple"
                    />
                    <Text>  </Text>
                    <Button
                        onPress={this.createDB.bind(this)}
                        title="Create DB"
                        color="#27ae60"
                        accessibilityLabel="Learn more about purple"
                    />
                </View>

                <Text>
                    {"\n"}
                </Text>

                <FlatList
                    data={this.state.entries}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />






            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('TestProjectArquitectura', () => TestProjectArquitectura);
