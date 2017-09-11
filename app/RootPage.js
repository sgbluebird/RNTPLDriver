/**
 * 根页面
 *    1. 初始化导航器（Navigator）
 *    2. 处理Android返回键事件处理
 */
import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, BackHandler, Platform} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainPage from './pages/MainPage';
import {showToast} from './comp/CommonComp';
class RootPage extends Component {

    static childContextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.backButtonListeners = ([]: Array<() => boolean>);
        this.onBack = this._onBack.bind(this);
        this.addBackButtonListener = this._addBackButtonListener.bind(this);
        this.removeBackButtonListener = this._removeBackButtonListener.bind(this);
        this.handlerConfigureScene = this._handlerConfigureScene.bind(this);
    }

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBack);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.2)'}/>
                <Navigator
                    ref={component => this.navigator = component}
                    initialRoute={{}}
                    configureScene={this.handlerConfigureScene}
                    renderScene={this._renderScene.bind(this)}
                />
            </View>
        );
    }

    _handlerConfigureScene() {
        if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
        } else {
            return Navigator.SceneConfigs.PushFromRight;
        }
    }

    _addBackButtonListener(listener) {
        this.backButtonListeners.push(listener);
    }

    _removeBackButtonListener(listener) {
        this.backButtonListeners = this.backButtonListeners.filter((handler) => handler !== listener);
    }

    _onBack() {
        // 判断是否有子组件需要消耗返回键事件
        for (let i = this.backButtonListeners.length - 1; i >= 0; i--) {
            if (this.backButtonListeners[i]()) return true;
        }

        let navigator = this.navigator;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        let curTimestamp = new Date().getTime();

        // 判断3秒内两次按返回键才真正退出APP
        if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 3000) {
            // 真正退出
            return false;
        } else {
            showToast('再按一次退出APP');
            this.extTimestamp = curTimestamp;
            return true;
        }
    }

    _renderScene(route, navigator) {
        if (route && route.component) {
            var {component: Component, ...route} = route;
            return <Component navigator={navigator} {...route} />;
        }

        return <MainPage navigator={navigator} {...route} />;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default RootPage;