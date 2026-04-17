import React from 'react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        🚀 React App on Firebase
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '8px' }}>
        Deployed via GitHub Actions CI/CD Pipeline
      </p>
      <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '30px' }}>
        Experiment 10 — CI/CD with GitHub Actions + Firebase Hosting
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '20px 40px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: '6px 0' }}>✅ GitHub Actions CI — Tests Passing</p>
        <p style={{ margin: '6px 0' }}>✅ GitHub Actions CD — Build Artifact Uploaded</p>
        <p style={{ margin: '6px 0' }}>✅ Firebase Hosting — Live Deployment</p>
      </div>
    </div>
  )
}

export default App
