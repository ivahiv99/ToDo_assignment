import React, {Component} from 'react';
import firebase from '../../firebase';
import './newTask.scss';

class NewTask extends Component{
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state={
            value: ''
        };
    }

    async handleSave(){
        // let test = this.refs.newTaskInput.value.split('')
        //     .map(this.refs.newTaskInput.value.replace(/\s/g,''))
        //     .join('');
        //
        // if(test === '' ){
        //     this.refs.newTaskInput.value = 'Hey! Type something ';
        //     return null
        // }
        /*clean this^*/
        const value = this.refs.newTaskInput.value;
        await firebase.firestore().collection('user_tasks').add({
            creator:this.props.userId,
            status:'undone',
            task: value
        });
        this.setState({  //for some reason cant set state on the first time method called
            value: this.refs.newTaskInput.value
        });
        this.refs.newTaskInput.value = '';
    }

    handleInputChange(e){
      this.setState({
          value: e.target.value
      })
    }
    render(){
        return(
            <div className='newTask'>
                <h1 className='newTask__title' >New task?</h1>
                <input  className='newTask__input'
                        type='text' ref='newTaskInput'
                        placeholder='Type your task'
                        onChange={this.handleInputChange}/>
                <button className='newTask__btn' onClick={this.handleSave} >Save</button>
            </div>
        );
    }
}

export default NewTask;