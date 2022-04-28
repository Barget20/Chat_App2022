import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Pressable, Touchable, TouchableOpacity} from 'react-native';

const Image = require('../assets/Background.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: null,
    };
  }  

  changeBgColor = (newColor) => {
    this.setState({bgColor: newColor });
  };

  colors= {
    black: "#090C08",
    charcoal: "#474056",
    grey: "#8A95A5",
    green: "#B9C6AE",
  };
  
  render() {
      return (
        <View style={styles.container}>
          <ImageBackground source={Image} resizeMode="cover" style= {styles.headerImage}>

          <Text style={styles.appTitle}>App Title</Text>
          {console.log(this.state.bgColor)}
         
        {/* Input box for setting the users name before enterting into chat screen */}
          <Text style={styles.yourName}
          //Input style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => this.setState({ name})}
            value={this.state.name}
            placeholder="Your Name Here..." />
          
        {/* Allows users to choose a background color/theme   */}
          <Text style={styles.backgroundColorChoose}>Choose Background Color:</Text>  
            {/* Color Hex option codes go here! */}
          <View style={styles.colorArray}>
              <TouchableOpacity style={ styles.color1}
              onPress={() => this.changeBgColor(this.colors.black)} />
              <TouchableOpacity style={ styles.color2}
              onPress={() => this.changeBgColor(this.colors.charcoal)} />
              <TouchableOpacity style={ styles.color3}
              onPress={() => this.changeBgColor(this.colors.grey)} />
              <TouchableOpacity style={ styles.color4}
              onPress={() => this.changeBgColor(this.colors.green)} />
          </View>
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

    colorArray: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
    },

    color1: {
      backgroundColor: "#090C08",
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    color2: {
      backgroundColor: "#474056",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    color3: {
      backgroundColor: "#8A95A5",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    color4: {
      backgroundColor: "#B9C6AE",
      width: 50,
      height: 50,
      borderRadius: 25,
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