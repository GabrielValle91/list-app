import React, { Component } from 'react';
import { Container, Dimmer, Divider, Header, Icon, List, Loader, Segment} from 'semantic-ui-react';
import ListEntry from '../Components/ListEntry';
import ListEntryInput from '../Components/ListEntryInput';

class ListsContainer extends Component{
  constructor(){
    super();
    this.state = {};
  }

  addList = (list) => {
    fetch(`/api/lists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list})
    })
      .then(response => response.json())
      .then(newList => {
        if (!this.state.lists){
          this.setState({lists: [newList]})
        } else {
          this.setState({lists: [...this.state.lists, newList]});
        }
      })
  }

  deleteList = (listId) => {
    fetch(`/api/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: listId})
    })
    this.setState({
      lists: this.state.lists.filter(list => list.id !== listId)
    })
  }

  populateState = data => {
    for (let i = 0; i < data.length; i++){
      if (!this.state.lists){
        this.setState({lists: [data[i]]})
      } else {
        this.setState({lists: [...this.state.lists, data[i]]});
      }
    }
  }

  getLists = () => {
    fetch('/api/lists')
    .then(resp => resp.json())
    .then(resp => this.populateState(resp))
  }

  componentDidMount(){
    this.getLists();
  }

  render(){
    let lists;
    if(this.state.lists){lists = this.state.lists.map(list => {
      return(<ListEntry
        list={list}
        key={list.id}
        handleDelete={this.deleteList}
      />)
    })}
    return(
      <React.Fragment>
        { this.state.lists ?
          <Container>
            <Header as='h2' icon textAlign='center' color='teal'>
              <Icon name='list' circular />
              <Header.Content>
                Your Lists
              </Header.Content>
            </Header>
            <Divider hidden section />
            { this.state.lists && this.state.lists.length ?
              <Container textAlign='left'><Segment inverted><List divided inverted relaxed size='big' animated>{lists}<ListEntryInput handleAddList={this.addList} /></List></Segment></Container>
              : <Container textAlign='center'>No Lists Found</Container>
            }
          </Container>
        :
          <Container>
            <Dimmer active>
              <Loader active inverted content='Loading' />
            </Dimmer>
          </Container>
          }
      </React.Fragment>
    )
  }
}

export default ListsContainer;
