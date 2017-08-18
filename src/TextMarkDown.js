import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import store from './store/Store';
import { newTitle, newContent, newCover } from './actions/Actions';

const dblock = {
	display: 'block'
};

const MDStyle = {
  display: 'inline-block',
  width: '100%'
};


export default class TextMarkDow extends Component {
  constructor(props) {
    super(props);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleHead = this.handleHead.bind(this);
  }
  handlePreview = event => {
  	store.dispatch(newContent(event.target.value));
  }
  handleHead = event => {
  	store.dispatch(newTitle(event.target.value));
  }
	handleCover = event => {
		store.dispatch(newCover(event.target.value));
	}
  render() {
  	return (
  		<div>
  		   <div style={MDStyle}>
    	  		<TextField style={dblock}
    	  		  floatingLabelText='Title'
							id="titlePub"
    	  		  onBlur={this.handleHead}
              value={this.props.title}
              fullWidth={true}/>
							<TextField style={dblock}
							  id="cover"
	    	  		  floatingLabelText='Cover Image'
	    	  		  onBlur={this.handleCover}
	              value={this.props.cover}
	              fullWidth={true}/>
    	  		<TextField id='content' style={dblock}
							value={this.props.content}
    	  		  hintText="Type some wonderful"
    	          floatingLabelText="Content"
    	          multiLine={true}
    	          rows={3}
    	          fullWidth={true} onBlur={this.handlePreview}/>
	        </div>
  		</div>);
  }
}
