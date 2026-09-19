import App from '@/App.jsx'
import { store } from '@/store/index.js'
import '@/styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// Apply initial theme before render to prevent flash
const initialTheme = store.getState().ui.theme
document.documentElement.setAttribute('data-theme', initialTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
