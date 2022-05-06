import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button} from 'react-native';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
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
        this.setState({
            messages,
        });
    };

    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    componentDidMount() {
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

        onSend(messages = []) {
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            // this function sends the current message to the database
            () => {
                this.addMessages();
            }
            );
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
        const { bgColor } = this.props.route.params;
        
        return (
            <View style={{flex:1, backgroundColor: bgColor }} >
            <GiftedChat
                renderBubble={this.renderBubble.bind()}
                messages={this.state.messages}
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

