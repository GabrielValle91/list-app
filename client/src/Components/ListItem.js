import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';

class ListItem extends Component{
  constructor(){
    super();
    this.state={
      deleteHovering: false,
      itemHovering: false
    }
  }

  handleDeleteEnter = () => {
    this.setState({
      deleteHovering: true
    })
  }

  handleDeleteLeave = () => {
    this.setState({
      deleteHovering: false
    })
  }

  handlePlus = (list_item) => {
    this.props.listItem.quantity++;
    fetch(`/api/list_items/${list_item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list_item})
    })
  }

  handleMinus = (list_item) => {
    if (this.props.listItem.quantity > 0) {
      this.props.listItem.quantity--;
      fetch(`/api/list_items/${list_item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({list_item})
      })
    }
  }

  handleStatusChange = (list_item) => {
    if (list_item.status == 'Open'){
      list_item.status = 'Completed'
    } else {
      list_item.status = 'Open'
    }
    fetch(`/api/list_items/${list_item.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list_item})
    })
  }

  render(){
    return(
      <List.Item>
        <List.Content floated='right'>
          <List.Icon 
            name='minus square' 
            inverted verticalAlign='middle' 
            onClick={() => this.handleMinus(this.props.listItem)} 
          />
          {this.props.listItem.quantity}
          <List.Icon 
            name='plus square' 
            inverted 
            verticalAlign='middle' 
            onClick={() => this.handlePlus(this.props.listItem)} 
          />
          <Button 
            color='blue' 
            onClick={() => this.handleStatusChange(this.props.listItem)}
          >
            {this.props.listItem.status == 'Open' ? 'Mark complete' : 'Mark incomplete'}
          </Button>
          <List.Icon 
            name='trash alternate outline' 
            bordered 
            inverted 
            verticalAlign='top' 
            onClick={() => this.props.handleDeleteItem(this.props.listItem.id)} 
            onMouseEnter={this.handleDeleteEnter} 
            onMouseLeave={this.handleDeleteLeave} 
            onMouseMove={this.handleDeleteEnter} 
            color={this.state.deleteHovering ? 'red' : 'grey' } 
          />
        </List.Content>
        <List.Content>
          {this.props.listItem.status == 'Open' ? <span>{this.props.listItem.name}</span> : <span className='complete'>{this.props.listItem.name}</span>}
        </List.Content>
      </List.Item>
    )
  }
}

export default ListItem;