import React from 'react';
import { View, Text, Button} from 'react-native';

export default class Chat extends React.Component {

    render () {
        let { bgColor, name} = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{flex:1, justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: bgColor,
                }} >
            <Button title="Go to Start"
                onPress={() => this.props.navigation.navigate("Start")} />
            </View>
        );
    }
}