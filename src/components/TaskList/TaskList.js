import React, {Component} from 'react';
import TaskItem from '../TaskItem/TaskItem';
import firebase from '../../firebase';
import './tasklist.scss';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks: [] ,
            userId: this.props.userId,
            loaded: false,
            updateList: false
        };
        this.getTasks = this.getTasks.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
    }
     listUpdate(){
         this.getTasks(this.props.userId);
         this.setState({
             updateList: !this.state.updateList
         });
     }
    componentWillMount(){
        this.getTasks(this.props.userId);//need to call this again when trigering rerender
    }
    async getTasks(userId) {
        let tasks =[];
        firebase.firestore().collection('user_tasks').where('creator', '==', userId).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                tasks.push({task: doc.data().task , status: doc.data().status , docId: doc.id })
            });
            this.setState({loaded: true, tasks: tasks});
        });
    }
    render() {
        return !this.state.loaded
            ? <span>Loading ... </span>
            : <div className='taskList'>
                {this.state.tasks.map((taskItem)=>{
                    return <TaskItem
                        task={taskItem.task}
                        status={taskItem.status}
                        docId={taskItem.docId}
                        updateList={this.listUpdate}
                    />
                })}
              </div>
    }
}

export default TaskList;