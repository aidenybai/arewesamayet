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
        <h1>its so over 💀</h1>
        <p>
          current status: sam is gg forever. emmet shear is ceo{' '}
          <a href="https://www.bloomberg.com/news/articles/2023-11-20/openai-s-board-hires-former-twitch-executive-shear-as-ceo?embedded-checkout=true">
            [source]
          </a>
        </p>
        <img
          src="/favicon.jpeg"
          alt="sama"
          loading="lazy"
          width={300}
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
