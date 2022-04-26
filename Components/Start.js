import React from 'react';
import { View, Text, TextInput, Button, ImageBackground} from 'react-native';

const Image = {uri: '../Background Image.png'
};

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

          </ImageBackground>
          <Text style={styles.appTitle}>App Title</Text>
          <Text style={styles.yourName}
          // Input style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => this.setState({ name})}
            value={this.state.name}
            placeholder="Your Name" />
          <Text style={styles.backgroundColorChoose}>Choose Background Color:</Text>  
          {/* Color Hex option codes go here! */}
          <Button style={styles.startChatButton}>"Start Chatting"
          onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name})} </Button>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    appTitle: {
      color: 'white',
      fontSize: 45,
      fontWeight: 600
    },

    yourName: {
      color: '#757083',
      fontSize: 16,
      fontWeight: 300,
      opacity: '50%'
    },

    backgroundColorChoose: {
      color: '#757083',
      fontSize: 16,
      fontWeight: 300,
      opacity: '100%'
    },

    startChatButton: {
      color: '757083',
      fontSize: 16,
      fontWeight: 600,
      buttonColor: '#FFFFFF'
    },

    headerImage: {
      width: 25,
      height: 25,
    }

  })