import React, { Component } from 'react';
import { Button, List, Modal, Segment } from 'semantic-ui-react';
import ListItem from './ListItem';
import ListItemInput from './ListItemInput';

class ListEntry extends Component{
  constructor(){
    super();
    this.state={
      deleteHovering: false,
      listHovering: false,
    }
  }

  populateListItems = data => {
    for (let i = 0; i < data.list_items.length; i++){
      if (!this.state.listItems){
        this.setState({listItems: [data.list_items[i]]})
      } else {
        this.setState({listItems: [...this.state.listItems, data.list_items[i]]});
      }
    }
  }

  getListItems = () => {
    fetch(`/api/lists/${this.props.list.id}`)
    .then(resp => resp.json())
    .then(resp => this.populateListItems(resp))
  }

  componentDidMount(){
    this.getListItems();
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

  handleListEnter = () => {
    this.setState({
      listHovering: true
    })
  }

  handleListLeave = () => {
    this.setState({
      listHovering: false
    })
  }

  handleDeleteItem = (itemId) => {
    this.setState({
      listItems: this.state.listItems.filter(item => item.id !== itemId)
    })
    fetch(`/api/lists/${this.props.list.id}/list_items/${itemId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: itemId})
    })
  }

  handleAddItem = (list_item) => {
    list_item = {...list_item, list_id: this.props.list.id}
    fetch(`/api/lists/${this.props.list.id}/list_items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list_item})
    })
      .then(response => response.json())
      .then(newItem => {
        if (!this.state.listItems){
          this.setState({listItems: [newItem]})
        } else {
          this.setState({listItems: [...this.state.listItems, newItem]});
        }
      })
  }

  handleStatusChange = (list) => {
    if (list.status == 'Open'){
      list.status = 'Completed'
    } else {
      list.status = 'Open'
    }
    fetch(`/api/lists/${list.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list})
    })
  }

  render(){
    let listItems;
    if(this.state.listItems){listItems = this.state.listItems.map(listItem => {
      return(<ListItem
        listItem={listItem}
        key={listItem.id}
        handleDeleteItem={this.handleDeleteItem}
      />)
    })}
    return(
      <List.Item 
        onMouseEnter={this.handleListEnter} 
        onMouseLeave={this.handleListLeave} 
        onMouseMove={this.handleListEnter}
      >
        <List.Content floated='right'>
          <Button color='blue' onClick={() => this.handleStatusChange(this.props.list)}>{this.props.list.status == 'Open' ? 'Mark completed' : 'Mark incomplete'}</Button>
          
          <List.Icon 
            name='trash alternate outline' 
            bordered 
            inverted 
            verticalAlign='top' 
            onClick={() => this.props.handleDelete(this.props.list.id)} 
            onMouseEnter={this.handleDeleteEnter} 
            onMouseLeave={this.handleDeleteLeave} 
            onMouseMove={this.handleDeleteEnter} 
            color={this.state.deleteHovering ? 'red' : 'grey' } 
          />

        </List.Content>
        <List.Icon 
          name='bookmark outline' 
          size='large' 
          inverted 
          verticalAlign='middle' 
          color={this.state.listHovering ? 'teal' : 'grey'} 
        />
          <Modal 
            size='large' 
            trigger={this.props.list.status == 'Open' ? <List.Content> {this.props.list.title} </List.Content> : <List.Content className='complete'> {this.props.list.title} </List.Content>} 
            closeIcon
          >
            <Modal.Header>{this.props.list.title}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Segment inverted>
                  <List inverted divided animated relaxed size='large'>
                    {listItems}
                  </List>
                  <ListItemInput handleAddItem={this.handleAddItem} />
                </Segment>
              </Modal.Description>
            </Modal.Content>
          </Modal>
      </List.Item>
    )
  }
}

export default ListEntry;
