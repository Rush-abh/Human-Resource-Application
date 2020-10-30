import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import './styles.css';
import {createBrowserHistory} from "history";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// import * as serviceWorker from './serviceWorker';

let axios = require("axios");
let axiosDefaults = require("axios/lib/defaults");
const store = createStore(reducer);

axiosDefaults.xsrfCookieName = "csrftoken";
axiosDefaults.xsrfHeaderName = "X-CSRFToken";

export const browserHistory = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
	    <React.StrictMode>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
	        <App />
				</MuiPickersUtilsProvider>
	    </React.StrictMode>
    </Provider>
    ,
    document.getElementById('root')
);
