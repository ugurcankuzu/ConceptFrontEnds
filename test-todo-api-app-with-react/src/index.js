import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Index from './pages/index';
import {Helmet} from 'react-helmet';

ReactDOM.render(
  <BrowserRouter>
  <Helmet>
    <title>Take {'<N0T3S/>'}</title>
    <script src="https://kit.fontawesome.com/02e7caa908.js" crossorigin="anonymous"></script>
  </Helmet>
    <Switch>
      <Route exact path='/' component={Index}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
