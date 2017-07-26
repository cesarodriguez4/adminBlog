import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MarkDown from 'react-markdown';

const dblock = {
	display: 'block'
};

const initialState = {
  previewText: ''
};

const MDStyle = {
  display: 'inline-block',
  width: 400
};
const PwStyle = {
  display: 'inline-block',
  width: 400,
  float: 'right'
};

export default class TextMarkDow extends Component {
  constructor(props) {
    super(props);
  	this.state = initialState;
    this.handlePreview = this.handlePreview.bind(this);
    this.handleHead = this.handleHead.bind(this);
  }
  handlePreview = event => {
  	this.setState({previewText: event.target.value});
  }
  handleHead = event => {
  	this.setState({headText: event.target.value});
  }
  render() {
  	return (
  		<div>
  		   <div style={MDStyle}>
	  		<TextField style={dblock} 
	  		  floatingLabelText='Title' 
	  		  onChange={this.handleHead}/>
	  		<TextField id='content' style={dblock} 
	  		  hintText="Escribe algo asombroso"
	          floatingLabelText="Contenido"
	          multiLine={true}
	          rows={3}
	          fullWidth={true} onChange={this.handlePreview}/>
	        </div>
	        <div style={PwStyle}>
	          <h1>{this.state.headText}</h1>
              <MarkDown source={this.state.previewText}></MarkDown>
            </div>
  		</div>);
  }
}