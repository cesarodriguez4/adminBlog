import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

registerServiceWorker();
injectTapEventPlugin();

ReactDOM.render(
	  <MuiThemeProvider>
	    <App />
	  </MuiThemeProvider>, document.getElementById('root'));

