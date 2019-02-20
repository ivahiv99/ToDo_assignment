import React, {Component} from 'react';
import firebase from '../../firebase';
import './newTask.scss';

class NewTask extends Component{
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    async handleSave(){
        const value = this.refs.newTaskInput.value;
        if(value.replace(/\s/g,'')===''){
            this.refs.newTaskInput.value = 'Hey! Type something';
            return null;
        }
        await firebase.firestore().collection('user_tasks').add({
            creator:this.props.userId,
            status:'undone',
            task: value
        }).then(this.props.updateList);
        this.refs.newTaskInput.value = '';
    }

    render(){
        return(
            <div className='newTask'>
                <h1 className='newTask__title' >New task?</h1>
                <input  className='newTask__input'
                        type='text' ref='newTaskInput'
                        placeholder='Type your task'/>
                <button className='newTask__btn' onClick={this.handleSave} >Save</button>
            </div>
        );
    }
}

export default NewTask;