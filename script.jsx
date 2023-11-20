import React from 'react';
import { createRoot } from 'react-dom/client';
import './multiplayer';

function App() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 'auto',
          paddingRight: 'auto',
        }}
      >
        <h1>we're so back 😎</h1>
        <p>
          current status: we are so fucking back{' '}
          <a href="https://twitter.com/satyanadella/status/1726509045803336122e">
            [source]
          </a>
        </p>
        <div
          id="button"
          style={{
            display: 'flex',
            height: '50px',
            paddingBottom: '2rem',
            textAlign: 'center',
          }}
        >
          <small
            style={{
              margin: 'auto',
              opacity: 0.5,
              fontSize: '1.5rem',
            }}
          >
            gimme a sec...
          </small>
        </div>
        <img
          src="/favicon.png"
          alt="sama"
          loading="lazy"
          height={400}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <br />
        <small style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          how is this so fast? website powered by react.js +{' '}
          <a href="https://million.dev">million.js</a>
        </small>
      </div>
      {/* <button
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '5rem',
        }}
      >
        ⬅️
      </button>
      <button
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '5rem',
        }}
      >
        ➡️
      </button> */}
    </>
  );
}

const root = document.getElementById('root');
createRoot(root).render(<App />);
