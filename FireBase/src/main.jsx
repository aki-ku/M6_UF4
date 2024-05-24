import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { firebaseConfig } from './components/config/config.js'
import * as firebase from 'firebase/app'; 


firebase.initializeApp(firebaseConfig); 
console.log(firebase.SDK_VERSION); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
