import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import './forms.scss';

class LogInForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'' ,
            password:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(function(error) {
                alert(error.code);
                alert(error.message);
            });
    }

    render() {
        return(
            <div className='authForm'>
                <form className='authForm__form' onSubmit={this.handleSubmit}>
                    <h5 className='authForm__title'>Log In</h5>
                    <input type='email'
                           id='email'
                           placeholder='Email'
                           className='authForm__input'
                           onChange={this.handleInputChange}/>
                    <input type='password'
                           id='password'
                           placeholder='Password'
                           className='authForm__input'
                           onChange={this.handleInputChange} />
                    <input className='authForm__input--submit-btn' type='submit' value='Log in'/>
                    <Link className='authForm__link' to='/signUp'>Dont have an account yet?</Link>
                </form>
            </div>
        );
    }
}

export default LogInForm;