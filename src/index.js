import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import "./bootstrap.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faChevronRight)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
