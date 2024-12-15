import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import './index.css';
import FacebookEmojiCounter from './Facebookemoji';
import ToggleMode from './ToggleModeComponent';


const rootElement = document.getElementById('root');


const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.Fragment>
    <FacebookEmojiCounter type="Like" />
    <FacebookEmojiCounter type="Love" />
    <FacebookEmojiCounter type="happy" />
    <ToggleMode />
  </React.Fragment>
);
