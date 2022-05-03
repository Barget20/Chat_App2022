import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Button} from 'react-native';

export default class Chat extends React.Component {

    constructor () {
        super();
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.setState ({
            messages: [
              { _id: 1,
              text: 'Hello Developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
              },
              { _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
            ],
          });
        }

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
    })
