import React, { Component } from 'react';
import './App.css';
import Downshift from 'downshift' ;//Library for autocomplete dropdown
import ListOfTags from './ListOfTags.js'; // Functional component that renders the tag list


// options for autoselect dropdown
const items = [
  {value: '#mylevels'},
  {value: 'laura'},
  {value: '#iliyan'},
  {value: 'efe'},
  {value: '#hangry'},
]


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {tags: []}; //Store new tags in state
  }

  renderList(tags){
    return ( 
      <ListOfTags tags = {tags} /> // Renders list of tags
    );
  }

  //Function that adds tag from dropdown to state, this adds a hashtag to the list  
  handleSelect(x) {
    let newTag = x.value

    if ( (newTag).slice(0,1) !== '#'){ // Check if the input has a hash at the beginning
      newTag = `#${x.value}`
     
    }
    this.setState({
      tags: [...this.state.tags, newTag] //Adds new hashstag to state
    } )

  }

  render() {
    return (
      //Autocomplete component
      <Downshift
     
      selectedItem={(this.state.tags).slice(-1)[0]}
      onChange={selection => 
        this.handleSelect(selection)} //Adds tags from the dropdown list
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div class="container">
         <h1> Enter Your Hashtag Below</h1>
         <div class="one">
          <input {...getInputProps({ //Input for the hash tag
            type:'text',
             onKeyDown: e => { //Allows you to enter your own hashtags
              if (e.key === 'Enter') {
                e.preventDefault()
                let newTag = inputValue
              if ( (inputValue).slice(0,1) !== '#'){ // Checks if input was a hash tag
                newTag = `#${inputValue}`  
              }
              this.setState({
                tags: [...this.state.tags, newTag] // Adds hashtag to state
              },function () {
                console.log(this.state.tags);
                
            } )
              }
              // { this.renderList(this.state.tags) } Line 88 renders the list of tags
              
            },
          })} />
          
        </div>
        
          { this.renderList(this.state.tags) } 
          
          {isOpen ? (// This renders the autocomplete dropdown
            <div class="autocomplete">
              {items
                .filter(item => !inputValue || item.value.includes(inputValue.toLowerCase()))
                .map((item, index) => (
                  <div class="suggestions"
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.value}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>

    );
  }
}

export default App;
