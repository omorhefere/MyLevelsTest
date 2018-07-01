import React from 'react';
import './App.css';
const ListOfTags = (props) => {
    const tags = props.tags; // pass array of tags as props from parent component
    const listItems = tags.map((tag) => // create list of tags
      <div class="tags" key={Math.random()} >
        <span>{tag}</span>
      </div>
  //Reverse list below, so latest tag comes first.
     
    );
    return (
      <div class="two">
       {listItems.reverse()} 
       </div> 
      
    );
  }
  export default ListOfTags;