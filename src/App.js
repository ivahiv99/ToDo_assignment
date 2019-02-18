import React, { Component } from 'react';
import LogInForm from './components/Authorithation/LogIn';
import SignUpForm from './components/Authorithation/SingUp';
import TaskList from './components/TaskList';
import Header from './components/Header';
import NewTask from './components/NewTask';

import './App.scss';
import './responcive.scss';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header/>
        <NewTask/>
        <TaskList/>
      </div>
    );
  }
}

export default App;
