import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import './index.css';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Нужен чтобы мои стили перекрывали стили Material UI*/}
        <StylesProvider injectFirst>
          <Provider store={store}>
            <App />
          </Provider>
        </StylesProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
