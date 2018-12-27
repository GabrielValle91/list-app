import React, { Component } from 'react';
import { Button, Input, List } from 'semantic-ui-react';

class ListEntryInput extends Component{
  constructor(){
    super()
    this.state={
      newList:{
        title: '',
        status: 'Open',
        user_id: 1
      }
    }
  }

  handleClear = () => {
    this.setState({
      newList:{
        title: '',
        status: 'Open',
        user_id: 1
      }
    })
  }

  handleListUpdate = (event) => {
    this.setState({
      newList:{
        title: event.target.value,
        status: 'Open',
        user_id: 1
      }
    })
  }

  render(){
    return(
      <List.Item>
        <Input focus placeholder='Enter new list name' onChange={this.handleListUpdate} value={this.state.newList.name} /><Button onClick={() => {this.props.handleAddList(this.state.newList); this.handleClear()}} color='teal'>Submit</Button>
      </List.Item>
    )
  }
}

export default ListEntryInput;
