import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button} from 'react-native';
import firebase from 'firebase';
import firestore from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import App from '../App';

// const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCx4iAzQBbUTKBQtcZUx72SskhWA1GXWh8",
    authDomain: "chatter-box-625a0.firebaseapp.com",
    projectId: "chatter-box-625a0",
    storageBucket: "chatter-box-625a0.appspot.com",
    messagingSenderId: "428772480448",
    appId: "1:428772480448:web:c678e94736a4fb19062425",
    measurementId: "G-Q42Q98PP68"
  };
  
  
  
  

export default class Chat extends React.Component {

    constructor () {
        super();
        this.state = {
            messages: [],
        };
        if (!firebase.app.length){
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    onCollectionUpdate = (querySnapShot) => {
        const messages = [];

        querySnapShot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
    }

    addMesssages() {
        this.referenceChatMessages.add({
            name: "MessageListTest",
            items: [],
        });
    }

    onSnapShot() {

    }

    render() {
        return(
            <View style={styles.container}>
                <Text>{this.state.loggedInText}</Text>
                <Text style={styles.text}>Your Message</Text>

                <FlatList
                    data={this.state.messages}
                    remderItem={({ item }) => 
                        <Text style={styles.item}>{item.user}: {item.messages}</Text>} 
            />

            <Button onPress={() => {
                this.sendMessage();
            }}
            message = "text here" />
            </View>
        );
    }

    componentDidMount() {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
        
            this.setState ({
                uid: user.uid,
                loggedInText: "Hello there",
            });

            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapShot(this.onCollectionUpdate);
            });     
    }

        //       No Longer Needed?!
                //  text: 'Hello Developer',
        //       loggedInText: 'Hello there',
        //       createdAt: new Date(),
        //       user: {
        //         _id: 2,
        //         name: 'React Native',
        //         avatar: 'https://placeimg.com/140/140/any',
        //       },
        //       },
        //       { _id: 2,
        //         text: 'This is a system message',
        //         createdAt: new Date(),
        //         system: true,
        //     },
        //     ],
        //   });
        // }

        

        onSend(messages = []) {
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }));
        }

        renderBubble(props) {
            return (
                <Bubble {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'white',
                    },
                    right: {
                        backgroundColor: '#000',
                    },
                }}
                />
            );
        }



    render () {
        let { bgColor, name} = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{flex:1, backgroundColor: bgColor }} >
            <GiftedChat
                renderBubble={this.renderBubble.bind()}
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                />   
            {/* <Button title="Go to Start"
                onPress={() => this.props.navigation.navigate("Start")} /> */}

            {/* This is to fix the overlap of the keyboard from seeing the text issue */}
            {Platform.OS === "android" ? (
                <KeyboardAvoidingView behavior='height' />
            )   : null}    
            </View>
        );
    }
}



    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        item: {
            fontSize: 20,
            color: 'blue',
        },
        text: {
            fontSize: 30,
        }
    });

