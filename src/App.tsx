import React from 'react';
import './App.css';
import { List } from './features/list/List';
import { ResultsDisplay } from './features/resultsDisplay/ResultsDisplay';
import { VideoDisplay } from './features/videoDisplay/VideoDisplay';

function App() {
  return (
    <div className="App">
      <h1>Youtube Library</h1>
      <div className="content">
        <List />
        <VideoDisplay />
        <ResultsDisplay />
      </div>
    </div>
  );
}

export default App;
