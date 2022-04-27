import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Pressable} from 'react-native';

const Image = require('../assets/Background.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: null,
    };
  }  
  
  render() {
      return (
        <View style={styles.container
          // flex:1, justifyContent: 'center', alignItems: 'center'
          }>
          <ImageBackground source={Image} resizeMode="cover" style= {styles.headerImage}>

          
          <Text style={styles.appTitle}>App Title</Text>
          <Text style={styles.yourName}
          // Input style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => this.setState({ name})}
            value={this.state.name}
            placeholder="Your Name" />
          <Text style={styles.backgroundColorChoose}>Choose Background Color:</Text>  
          {/* Color Hex option codes go here! */}
          <Pressable style={styles.startChatButton}
          onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name})}> 
          <Text styles={styles.startChatButtonText}>Start Chatting</Text>
          </Pressable>
          </ImageBackground>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    appTitle: {
      color: 'white',
      fontSize: 45,
      fontWeight: "600"
    },
    container: {
      flex: 1,
    },

    yourName: {
      color: '#757083',
      fontSize: 16,
      fontWeight: "300",
      opacity: 50,
    },

    backgroundColorChoose: {
      color: '#757083',
      fontSize: 16,
      fontWeight: "300",
      opacity: 100,
    },

    startChatButton: {
      width: "88%",
      height: 70,
      borderRadius: 8,
      backgroundColor: '#757083',
      alignItems: "center",
      justifyContent: "center",
      color: '#FFFFFF',
    },

    startChatButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF",
    },

    headerImage: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });