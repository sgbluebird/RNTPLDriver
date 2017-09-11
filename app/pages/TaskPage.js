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
    DeviceEventEmitter,
    InteractionManager
} from 'react-native';
import HeaderView from '../comp/HeaderView';
export default class TPLDriver extends Component {
    // TODO: 点击导航左侧Menu按钮时，打开或者关闭左侧列表
    _closeOrOpneLeftMenu() {
        InteractionManager.runAfterInteractions(() => {
            DeviceEventEmitter.emit('CloseOrOpen', true);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderView
                    titleView='消息'
                    leftMenu='navicon'
                    leftMenuAction={this._closeOrOpneLeftMenu.bind(this)}/>
                <Text style={styles.welcome}>
                    Welcome to React Native! -Task
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
