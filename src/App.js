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
import * as api from './api';

class App extends Component {
  state = {
    username: '',
    userId: '',
    heading: '',
    topics: []
  }

  render() {
    const { changeLoginState, setHeading } = this;
    const { username, userId, heading, topics } = this.state;
    return (
      <div className="App">
        <Nav username={username} changeLoginState={changeLoginState} topics={topics} />
        <Header heading={heading} />
        <Router>
          <Login path='/login' changeLoginState={changeLoginState} />
          <Articles path='/*' setHeading={setHeading} />
          <Articles path='/' setHeading={setHeading} />
          <Articles path='/topics/:topic' setHeading={setHeading} />
          <Article path='/articles/:article_id' username={username} userId={userId} setHeading={setHeading} />
          <User path='/users/:username' setHeading={setHeading} />
          <Submit path='/submit' username={username} userId={userId} changeLoginState={changeLoginState} setHeading={setHeading} />
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
    this.fetchTopics()
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

  setHeading = (heading) => {
    this.setState({ heading })
  }

  fetchTopics() {
    api.fetchTopics()
      .then(({ topics }) => {
        this.setState({ topics })
      })
  }
}

export default App;
