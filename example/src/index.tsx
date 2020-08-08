import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.getElementById('root')
)
