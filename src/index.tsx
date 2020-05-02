import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

// css imports
import './css/HoverBtn.css';
import './css/Popup.css';
import './css/Content.css';
import './css/Beliefs.css';
import './css/BeliefItem.css';
import './css/BeliefDetail.css';

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);