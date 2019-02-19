import React, {Component} from 'react';
import TaskItem from '../TaskItem/TaskItem';
import firebase from "../../firebase";

import './tasklist.scss';


class TaskList extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks: [] ,
            userId: this.props.userId,
            loaded: false
        };
        this.getTasks = this.getTasks.bind(this);
    }
    async getTasks(userId) {
        let tasks =[];
        await firebase.firestore().collection('user_tasks').where('creator', '==', userId).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(`doc.data().task - ${doc.data().task}`);
                tasks.push({task: doc.data().task , status: doc.data().status })
            });
        });
        this.setState({loaded: true, tasks: tasks});
        console.log(tasks);
    }
    render() {
        return !this.state.loaded
            ? <span>Loading ... </span>
            : <div className='taskList'>
                <ul>
                    {this.state.tasks.map(()=>{
                        console.log('returning TaskItem');
                        return <TaskItem task={this.state.tasks.task} status={this.state.tasks.status}/>
                    })}
                </ul>
              </div>
        ;
    }
    componentDidMount() {
        this.getTasks(this.props.userId);
    }
}

export default TaskList;