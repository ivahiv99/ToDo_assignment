import React, {Component} from 'react';

import './taskItem.scss';

class TaskItem extends Component{
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        console.log(`this.props.task from constructor --> ${this.props.task}`);
    }

    handleCheck(){

    }

    render() {
        return(
          <div className='TaskItem'>
              <input type='checkbox' onClick={this.handleCheck} value={this.props.task}/>
              <button><img src='./deleteIcon.png'/></button>
          </div>  
        );
    }
}

export default TaskItem;