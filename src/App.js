import React, { Component } from 'react';
import TaskList from './components/TaskList';
import Header from './components/Header';
import NewTask from './components/NewTask';

import firebase from './firebase';

import './App.scss';
import './responcive.scss';


class App extends Component {
    constructor(props) {
        super(props);
        this.giveUsername = this.giveUsername.bind(this);
        this.rerenderList = this.rerenderList.bind(this);
        this.listRerendered = this.listRerendered.bind(this);
        this.state = {
            userId :   null,
            username : null,
            loaded:    false,
            rerenderTest: false,
            // firstCheckHack: true
        };
    }
    rerenderList(){
        this.setState({
            rerenderTest: true,
            // firstCheckHack: false
        })
    }
    listRerendered(){
        this.setState({
            rerenderTest: false,
            // firstCheckHack: true
        })
    }
    componentWillMount() {
        const userId = firebase.auth().currentUser.email;
        this.giveUsername(userId);
    }

    async giveUsername(userId){
        let username ;
        await firebase.firestore().collection('users').where('email', '==', userId).get().then((snapshot) =>{
            snapshot.docs.forEach(doc =>{
                username = doc.data().username;
            });
        }).catch((error)=>alert(error));
        this.setState( {
            userId : userId,
            username : username,
            loaded: true
        });
    }

    render() {
        return (
          !this.state.loaded
          ? <span>Loading ... </span>
          : <div className='App'>
                <Header   username={this.state.username}/>
                <NewTask  userId={this.state.userId} updateList={this.rerenderList} />
                <TaskList userId={this.state.userId}
                          shouldListUpdate={this.state.rerenderTest}
                          listResponse={this.listRerendered}
                          // firstCheckHack={this.state.firstCheckHack}
                />
            </div>
        );
    }
}

export default App;
