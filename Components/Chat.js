import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button} from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import App from '../App';

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
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
        };
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        // This collects the list of messages
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
        this.setState({
            messages,
        });
    };

    // function that retrieves all your messages in order
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    // function that saves all your messages
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        }   catch (error) {
            console.log(error.message);
        }
    }

    // function to delete any message
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        }   catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        

        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');
            } else {
                console.log('offline');
            }
        });

        this.getMessages();
        const {name} = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
        // Sets state when app loads
            this.setState ({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: "http://placeimg.com/140/140/any",
                },
            });

            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
            });     
    }

        renderInputToolbar(props) {
            if (this.state.isConnected == false) {
            } else {
                return( <InputToolbar
                    {...props}
                    />
                );
            }
        }

        onSend(messages = []) {
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }), () => {
                this.saveMessages();
            });
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

        addMessages() {
            const message = this.state.messages[0];
            this.referenceChatMessages.add({
                _id: message._id,
                text: message.text || "",
                createdAt: message.createdAt,
                user: this.state.user,
            });
        }

    render () {
        const { bgColor } = this.props.route.params;
        
        return (
            <View style={{flex:1, backgroundColor: bgColor }} >
            <GiftedChat
                renderBubble={this.renderBubble.bind()}
                messages={this.state.messages}
                renderInputToolbar={this.renderInputToolbar}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: this.state.user._id,
                    name: this.state.name,
                    avatar: this.state.user.avatar,
                }}
                />   

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

