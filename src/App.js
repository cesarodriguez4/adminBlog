import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextMarkDown from './TextMarkDown';
import Panel from './Panel';
import MarkDown from 'react-markdown';
import Paper from 'material-ui/Paper';
import store from './store/Store';
import Snackbar from 'material-ui/Snackbar';
import 'github-markdown-css';

const TMStyle = {
  marginLeft: '1em',
  float: 'left',
  width: '75%'
};

const PanelStyle = {
  float: 'right',
  width: '20%'
}

const PwStyle = {
  display: 'block'
};

const appBar = {
  backgroundColor: '#282e33'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleMd: '',
      contentMd: '',
      cover: '',
      snackDraft: false
    };
    this.handleSnackDraftOpen = this.handleSnackDraftOpen.bind(this);
    this.handleSnackDraftClose = this.handleSnackDraftClose.bind(this);
  }
  handleSnackDraftClose() {
    this.setState({ snackDraft: false});
  }
  handleSnackDraftOpen() {
    console.log(true);
    this.setState({ snackDraft: true});
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({ titleMd: store.getState().markdown.title});
      this.setState({ contentMd: store.getState().markdown.content});
      this.setState({cover: store.getState().markdown.cover});
    });
  }
  render() {
    return (
      <div className="App">
        <AppBar style={appBar} title='Admin'></AppBar>
          <div style={TMStyle}>
            <TextMarkDown></TextMarkDown>
            <div className='markdown-body' style={PwStyle}>
              <Paper>
                <h1>{this.state.titleMd}</h1>
                <img alt={this.state.titleMd} src={this.state.cover}/>
                <MarkDown source={this.state.contentMd || ''}></MarkDown>
              </Paper>
            </div>
          </div>
          <div style={PanelStyle}>
            <Panel draft={this.handleSnackDraftOpen}></Panel>
          </div>
          <Snackbar
          open={this.state.snackDraft}
          message="Draft saved successfully"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackDraftClose}
          />
      </div>
    );
  }
}

export default App;
