import React from 'react';

const Dashboard: React.FC<{ onAddCandidate?: () => void }> = ({ onAddCandidate }) => {
  return (
    <main role="main" className="dashboard" style={{ padding: '2rem' }}>
      <h1>Recruiter Dashboard</h1>
      <button
        type="button"
        className="add-candidate-btn"
        aria-label="Add Candidate"
        style={{
          backgroundColor: '#0052cc',
          color: '#fff',
          fontSize: '1.25rem',
          padding: '0.75rem 2rem',
          borderRadius: '6px',
          border: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          outline: 'none',
          cursor: 'pointer',
        }}
        onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px #2684ff'}
        onBlur={e => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)'}
        onClick={onAddCandidate}
      >
        Add Candidate
      </button>
    </main>
  );
};

export default Dashboard;
