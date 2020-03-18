import React, { Component } from 'react';

class Todo extends Component {
  state = {
    priority : 'high',
  }

  onClick = () =>{ 
    const {priority} = this.state; 
    this.setState({priority : priority === 'high' ? 'low' : 'high'}); 
  }

  render() {
    const {title, desc} = this.props; 
    const {priority} = this.state; 

    return (
      <div>
        <Title title={title} />
        <p>{desc}</p>    
        <p>{priority === 'high' ? '우선순위 높음' : '우선순위 낮음'}</p>
        <button onClick={this.onClick}> 우선순위 변경 </button>
      </div>
    );
  }
}

class Title extends React.PureComponent{ 
  render(){
    const { title } = this.props; 
    return <p style ={{ color : 'blue' }}> {title} </p>
  }
}
export default Todo;