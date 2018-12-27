import React, { Component } from 'react';
import { Button, Input, List } from 'semantic-ui-react';

class ListItemInput extends Component{
  constructor(){
    super()
    this.state={
      newItem:{
        name: '',
        quantity: 1,
        status: 'Open',
      }
    }
  }

  handleClear = () => {
    this.setState({
      newItem:{
        name: '',
        quantity: 1,
        status: 'Open',
      }
    })
  }

  handleItemUpdate = (event) => {
    this.setState({
      newItem:{
        name: event.target.value,
        quantity: 1,
        status: 'Open',
      }
    })
  }

  render(){
    return(
      <List.Item>
        <Input focus placeholder='Enter new entry' size='small' onChange={this.handleItemUpdate} value={this.state.newItem.name} />
        <Button onClick={() => {this.props.handleAddItem(this.state.newItem); this.handleClear()}} color='teal'>Submit</Button>
      </List.Item>
    )
  }
}

export default ListItemInput;