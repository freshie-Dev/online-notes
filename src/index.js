import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import NoteState from './context/notes/NoteState';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteState>
      <App />
    </NoteState>
  </React.StrictMode>
);
