import React, {Component} from 'react';
import firebase from '../../firebase';
import './taskItem.scss';

class TaskItem extends Component{
    constructor(props){
        super(props);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state={
            status: this.props.status,
        }
    }

    handleCheckbox(){
        const writeThis = this.state.status === 'done' ? 'undone' : 'done';
        firebase.firestore().collection('user_tasks')
            .doc(this.props.docId).update({
                status: writeThis
            })
            .then(()=>{
                this.setState({
                    status: this.state.status === 'done' ? 'undone' : 'done',
                });
                this.forceUpdate()
            });
    }
    async handleDelete(){
        await firebase.firestore().collection('user_tasks')
            .doc(this.props.docId).delete()
            .then(this.props.updateList);
    }
    render() {
        return(
          <div className='taskItem'>
              <input  type='checkbox' onClick={this.handleCheckbox}/>
              <p className={this.state.status === 'done' ? 'taskItem__task--done':'taskItem__task'} ref='task'>{this.props.task}</p>
              <button className='taskItem__btn' onClick={this.handleDelete}>
                  <i className='fa fa-trash' ></i>
              </button>
          </div>  
        );
    }
}

export default TaskItem;