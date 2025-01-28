import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/app.tsx";
import {Provider} from 'react-redux';
import './index.css'
import store from "./services/store.ts";
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
          <Provider store={store}>
              <App />
          </Provider>
      </Router>
  </React.StrictMode>,
)
