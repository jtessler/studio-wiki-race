import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import WikiGameHistory from './WikiGameHistory';
import WikiSetup from './WikiSetup';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <div>
        <Route path="/" exact component={WikiSetup} />
        <Route path="/:title" component={WikiGameHistory}/>
      </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
