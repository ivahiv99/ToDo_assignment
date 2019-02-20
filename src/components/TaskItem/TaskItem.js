import React, {Component} from 'react';
import firebase from '../../firebase';
import './taskItem.scss';

class TaskItem extends Component{
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state={
            done: this.props.status === 'done'
        }
    }

    handleCheck(){
        this.setState({
            done : !this.state.done
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
              <input  type='checkbox' onClick={this.handleCheck} />
              <p className={this.state.done ? 'taskItem__task--done':'taskItem__task'} >{this.props.task}</p>
              <button className='taskItem__btn' onClick={this.handleDelete}>
                  {/*<img src='./deleteIcon.png'/>*/}
                  <i className='fa fa-trash' ></i>
              </button>
          </div>  
        );
    }
}

export default TaskItem;