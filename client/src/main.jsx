
import { createRoot } from 'react-dom/client';
import App from './App.jsx'

//importing BrowserRouter to sync my application with the address row
import {BrowserRouter} from 'react-router'

const root= createRoot(document.getElementById('root'));
root.render (<BrowserRouter><App/ ></BrowserRouter>)
