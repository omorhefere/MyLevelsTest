import React, { Component } from 'react';
import './App.css';
import Downshift from 'downshift' ;//library for autocomplete dropdown
import ListOfTags from './ListOfTags.js'; // functional component that renders the tag list


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
    this.state = {tags: []}; //store new tags in state
  }

  renderList(tags){
    return ( 
      <ListOfTags tags = {tags} /> // renders list of tag
    );
  }

  //function that adds tag from dropdown to state, this adds hash tag to the list  
  handleSelect(x) {
    let newTag = x.value

    if ( (newTag).slice(0,1) !== '#'){ // check if the input has a hashtag at the beginning
      newTag = `#${x.value}`
     
    }
    this.setState({
      tags: [...this.state.tags, newTag] //adds new hashstag to state
    } )

  }

  render() {
    return (
      //Autocoplert component
      <Downshift
     
      selectedItem={(this.state.tags).slice(-1)[0]}
      onChange={selection => 
        this.handleSelect(selection)} //adds tags from the dropdown list
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
             onKeyDown: e => { //allows you to enter your own hashtags
              if (e.key === 'Enter') {
                e.preventDefault()
                let newTag = inputValue
              if ( (inputValue).slice(0,1) !== '#'){ // check if you added a hash tag
                newTag = `#${inputValue}`  
              }
              this.setState({
                tags: [...this.state.tags, newTag] // adds hashtag to state
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
