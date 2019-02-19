import React, {Component} from 'react';

import firebase from '../../firebase';

import './header.scss';


class Header extends Component{
    constructor(props){
        super(props);
        console.log(`props from Header ${this.props.username}`);
        this.logOutHandle = this.logOutHandle.bind(this);
    }

    logOutHandle(){
        firebase.auth().signOut().then(()=> {
            console.log('logout successful');
        }).catch(function(error) {
            alert(`${error.code}   ${error.message}`);
        });
    }

    render() {
        return(
            <div className='header'>
                <h1 className='header__title'>Hi, {this.props.username}</h1>
                <button className='header__logOut' onClick={this.logOutHandle}>Log out</button>
            </div>
        );
    }
}

export default Header;