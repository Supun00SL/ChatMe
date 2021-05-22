
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, Text } from 'react-native';

//Components
import Splash from './src/Components/Splash/Splash';
import MainStackNavigator from './src/Navigators/MainStackNavigator';
import { USER } from './src/Util/asyc-storage-const';

class App extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props)
    this.state =
    {
      interactionsComplete: false,
      isOld: false,
      isLoading: true
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.checkForUser()
    InteractionManager.runAfterInteractions(() => {
      this.loading()
      this.setState({ interactionsComplete: true });
    })
  }

  checkForUser = async () => {
    var user = await AsyncStorage.getItem(USER)
    if (user) {
      this.setState({
        isOld: true
      })
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          resolve('result')
        },
        2000
      )
    );
  }

  loading = async () => {
    try {
      const data = await this.performTimeConsumingTask();

      if (data !== null) {
        this.setState({
          isLoading: false
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Splash />;
    } else {
      return <MainStackNavigator isOld={this.state.isOld} />
    }
  }
}

export default App;
