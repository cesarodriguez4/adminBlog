import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Tab, Tabs } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import store from './store/Store';
import CircularProgress from 'material-ui/CircularProgress';

const URL_POST_NEWS = `http://api.cesarjs.xyz/news`;
const URL_POST_DRAFTS = `http://api.cesarjs.xyz/drafts`;
const URL_GET_NEWS = `http://api.cesarjs.xyz/news`;
const URL_GET_DRAFTS = `http://api.cesarjs.xyz/drafts`;
export default class Panel extends Component {
  constructor(props) {
      super(props);
      this.state = {
        openPublish: false,
        catSel: 1,
        langSel: 1,
        titlePub: '',
        contentPub: '',
        loading: false,
        cover: '',
        articles: [],
        drafts: []
      };
      this.modalPublish = this.modalPublish.bind(this);
      this.handleCat = this.handleCat.bind(this);
      this.handleLang = this.handleLang.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.saveDraft = this.saveDraft.bind(this);
      this.resetHistory = this.resetHistory.bind(this);
      this.onArticlesActive = this.onArticlesActive.bind(this);
      this.onDraftActive = this.onDraftActive.bind(this);
      this.onFetchDraft = this.onFetchDraft.bind(this);
  }

  modalPublish() {
    this.setState({titlePub: store.getState().markdown.title});
    this.setState({contentPub: store.getState().markdown.content});
    this.setState({cover: store.getState().markdown.cover});
    this.setState({openPublish: true});
  }

  handleCat(event, index, val) {
    this.setState({catSel: val});
  }

  handleLang(event, index, val) {
    this.setState({langSel: val});
  }

  handleClose() {
    this.setState({openPublish: false});
  }

  resetHistory() {
    this.saveDraft();
    this.setState({titlePub: ''});
    this.setState({contentPub: ''});
    this.setState({cover: ''});
    document.getElementById('titlePub').value = '';
    document.getElementById('content').value = '';
    document.getElementById('cover').value = '';
  }

  saveDraft() {
    this.setState({titlePub: document.getElementById('titlePub').value });
    this.setState({contentPub: document.getElementById('content').value });
    this.setState({cover: document.getElementById('cover').value });
    const draf = {
      title:  document.getElementById('titlePub').value,
      content: document.getElementById('content').value,
      cover: document.getElementById('cover').value,
      date: new Date()
    };
    console.log(draf);
    fetch(URL_POST_DRAFTS, {
      method: 'POST',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(draf)
    }).then(response => {
      return this.props.draft();
    });
  }

  onFetchDraft(data) {
    console.log(data);
    this.setState({titlePub: data.title});
    this.setState({titlePub: data.content});
    this.setState({cover: data.cover});
    document.getElementById('titlePub').value = data.title;
    document.getElementById('content').value = data.content;
    document.getElementById('cover').value = data.cover;
  }

  onArticlesActive() {
    fetch(URL_GET_NEWS).then(response => {
      if (response.status !== 200) {
        console.log('Problem with the response');
        return;
      }
      response.json().then(data => {
        this.setState({articles: data});
      });
    });
  }

  onDraftActive() {
    fetch(URL_GET_DRAFTS).then(response => {
      if (response.status !== 200) {
        console.log('Problem with the response');
        return;
      }
      response.json().then(data => {
        this.setState({drafts: data});
      });
    });
  }

  handleSubmit() {
    const history = {
      title:  this.state.titlePub,
      content: this.state.contentPub,
      category: this.state.catSel,
      language: this.state.langSel,
      cover: this.state.cover,
      date: new Date()
    }
    this.setState({loading: true});
    fetch(URL_POST_NEWS, {
      method: 'POST',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(history)
    }).then(response => {
      this.setState({loading: false});
      this.setState({openPublish: false});
    });
  }

  render() {
    const actions = [
       <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ]
    let loading = null;
    const loadingClass = {
      position: 'absolute',
      top: '40%',
      left: '45%',
      width: '100%'
    }
    const tabBack = {
      backgroundColor: '#282e33'
    }
    if (this.state.loading) {
      loading =
        <div style={loadingClass}>
          <CircularProgress size={80} thickness={5} />
        </div>;
    }
		return(
          <div>
            <Paper>
              <Tabs>
                <Tab style={tabBack} label="File">
                  <Menu>
                    <MenuItem primaryText='New Article'
                      onClick={this.resetHistory}/>
                    <MenuItem primaryText='Publish'
                      onClick={this.modalPublish}/>
                    <MenuItem primaryText='Save to Draft'
                      onClick={this.saveDraft}/>
                  </Menu>
                </Tab>
                <Tab style={tabBack} label="Articles"
                  onActive={this.onArticlesActive}>
                  <Menu>
                    {this.state.articles.map(art => {
                      return <MenuItem key={art._id} primaryText={art.title}
                        onClick={this.onFetchDraft.bind(this, art)}/>
                    })}
                  </Menu>
                </Tab>
                <Tab style={tabBack} label="Drafts"
                  onActive={this.onDraftActive}>
                  <Menu>
                    {this.state.drafts.map(art => {
                      return <MenuItem key={art._id} primaryText={art.title.slice(0,20)}
                        onClick={this.onFetchDraft.bind(this, art)}/>
                    })}
                  </Menu>
                </Tab>
              </Tabs>
            </Paper>
            <Dialog
             title="Submit History"
             actions = {actions}
             modal={true}
             open={this.state.openPublish}>
              <h3>{this.state.titlePub || 'Untitled'}</h3>
              <p>Select the options below</p>
              <p>Category</p>
              <DropDownMenu
                value={this.state.catSel}
                onChange={this.handleCat}>
                <MenuItem value={1} primaryText="Code"/>
                <MenuItem value={2} primaryText="World"/>
              </DropDownMenu>
              <p>Language</p>
              <DropDownMenu
                value={this.state.langSel}
                onChange={this.handleLang}>
                <MenuItem value={1} primaryText="Spanish"/>
                <MenuItem value={2} primaryText="English"/>
              </DropDownMenu>
              {loading}
            </Dialog>
          </div>
			);
	}
}
