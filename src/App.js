import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Header from './components/Header';
import Login from './components/Login';
import Articles from './components/Articles';
import Article from './components/Article';
import User from './components/User';
import Submit from './components/Submit';

class App extends Component {
  state = {
    username: '',
    userId: '',
    heading: ''
  }

  render() {
    const { username, userId, heading } = this.state;
    return (
      <div className="App">
        <Nav username={username} changeLoginState={this.changeLoginState} />
        <Header heading={heading} />
        <Router>
          <Login path='/login' changeLoginState={this.props.changeLoginState} />
          <Articles path='/*' setHeadingInAppState={this.setHeadingInAppState} />
          <Articles path='/' setHeadingInAppState={this.setHeadingInAppState} />
          <Articles path='/topics/:topic' setHeadingInAppState={this.setHeadingInAppState} />
          <Article path='/articles/:article_id' username={username} userId={this.props.userId} />
          <User path='/users/:username' setHeadingInAppState={this.setHeadingInAppState} />
          <Submit path='/submit' username={username} userId={userId} changeLoginState={this.props.changeLoginState} />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

  changeLoginState = (data) => {
    const { username, userId } = data;
    this.setState({
      username,
      userId
    })
  }

  cacheLoginData(data) {
    const { username, userId } = data;
    localStorage.setItem('loginData', JSON.stringify({ username, userId }))
  }

  componentDidMount() {
    this.retrieveLoginData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId } = this.state;
    if (prevState.username !== username) {
      this.cacheLoginData({ username, userId })
    }
  }

  retrieveLoginData() {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    if (loginData && loginData.username) {
      const { username, userId } = loginData;
      this.changeLoginState({ username, userId })
    }
  }

  setHeadingInAppState = (heading) => {
    this.setState({heading})
  }

  // setHeadingInAppState = (prevProps, prevState) => {
  //   if (prevState.currentTopic !== this.props.topic) {
  //     if (this.props.topic) { this.setState({ currentTopic: this.props.topic }) }
  //     else {
  //       if (this.props['*'] === '' && this.state.currentTopic !== 'Home') {
  //         this.setState({ currentTopic: 'Home' })
  //       }
  //     }
  //   }
  // }
}

export default App;
