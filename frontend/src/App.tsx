
import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import CandidateForm from './components/CandidateForm';



function App() {
  const [showCandidateForm, setShowCandidateForm] = React.useState(false);

  const handleAddCandidate = () => {
    setShowCandidateForm(true);
  };

  const handleCloseCandidateForm = () => {
    setShowCandidateForm(false);
  };

  return (
    <div className="App">
      <Dashboard onAddCandidate={handleAddCandidate} />
      {showCandidateForm && (
        <CandidateForm onClose={handleCloseCandidateForm} />
      )}
    </div>
  );
}

export default App;
