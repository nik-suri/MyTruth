import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

import './lib/enums';

// css imports
import './css/root.css';
import './css/CustomBtn.css';
import './css/HoverBtn.css';
import './css/Popup.css';
import './css/Content.css';
import './css/Beliefs.css';
import './css/BeliefItem.css';
import './css/BeliefDetail.css';
import './css/Settings.css';

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);