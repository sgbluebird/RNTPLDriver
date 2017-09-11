/**
 * iOS版主页面
 *    1. 实现主界面布局，iOS版本使用的是底部Tab(TabBarIOS + TabBarIOS.Item)Pgae的风格
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TabBarIOS, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

import MessagePage from './MessagePage'
import TaskPage from './TaskPage'
import MinePage from './MinePage'

import {MAIN_TABS} from '../actions/types';
import {switchTab} from '../actions/navigator';


class MainPage extends Component {

    _onTabSelect(tab) {
        if (this.props.tab !== tab) {
            this.props.dispatch(switchTab(tab));
        }
    }
    render() {
        return (
            <TabBarIOS
                tintColor={'#FF5000'}
                barTintColor={'#F5FCFF'}>
                <TabBarIOS.Item
                    title="消息"
                    icon={require('../img/tabicon/ic_home_tab_gank.png')}
                    selected={this.props.tab === MAIN_TABS.MESSAGE}
                    onPress={this._onTabSelect.bind(this, MAIN_TABS.MESSAGE)}>
                    <MessagePage navigator={this.props.navigator}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="任务"
                    icon={require('../img/tabicon/ic_home_tab_rec.png')}
                    selected={this.props.tab === MAIN_TABS.TASK}
                    onPress={this._onTabSelect.bind(this, MAIN_TABS.TASK)}>
                    <TaskPage navigator={this.props.navigator}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="我的"
                    icon={require('../img/tabicon/ic_home_tab_girl.png')}
                    selected={this.props.tab === MAIN_TABS.MINE}
                    onPress={this._onTabSelect.bind(this, MAIN_TABS.MINE)}>
                    <MinePage navigator={this.props.navigator}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

}


const styles = StyleSheet.create({});

function select(store) {
    return {
        tab: store.navigatorStore.tab,
    }
}

export default connect(select)(MainPage);
