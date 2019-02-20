import React, {Component} from 'react';
import TaskItem from '../TaskItem/TaskItem';
import firebase from '../../firebase';
import './tasklist.scss';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state={
            taskInfo: [] ,
            loaded: false
        };
        this.getTasks = this.getTasks.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
    }
    componentWillMount(){
        this.getTasks(this.props.userId);
    }
    async getTasks(userId) {
        let taskInfo =[];
        firebase.firestore().collection('user_tasks').where('creator', '==', userId).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                taskInfo.push({task: doc.data().task , status: doc.data().status , docId: doc.id })
            });
            this.setState({loaded: true, taskInfo: taskInfo});
        });
    }
    listUpdate(){
        this.getTasks(this.props.userId);
    }
    render() {
        return !this.state.loaded
            ? <span>Loading ... </span>
            : <div className='taskList'>
                {this.state.taskInfo.map((taskItem)=>{
                    return <TaskItem
                        task = {taskItem.task}
                        status = {taskItem.status}
                        docId = {taskItem.docId}
                        updateList = {this.listUpdate}
                        // firstCheckHack = {this.props.firstCheckHack}
                    />
                })}
              </div>
    }
    componentDidUpdate() {
        if(this.props.shouldListUpdate){
            this.getTasks(this.props.userId);
            this.props.listResponse();
        }
    }

}

export default TaskList;