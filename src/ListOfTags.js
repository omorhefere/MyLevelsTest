import React from 'react';
import './App.css';
const ListOfTags = (props) => {
    const tags = props.tags; // Array of tags has been passed as props from parent component
    const listItems = tags.map((tag) => // Creates list of tags
      <div class="tags" key={Math.random()} >
        <span>{tag}</span>
      </div>
  //Reverse list below, so the latest tag show first
     
    );
    return (
      <div class="two">
       {listItems.reverse()} 
       </div> 
      
    );
  }
  export default ListOfTags;