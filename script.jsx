import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>its so over 💀</h1>
      <p>
        current status: emmet shear is ceo{' '}
        <a href="https://www.bloomberg.com/news/articles/2023-11-20/openai-s-board-hires-former-twitch-executive-shear-as-ceo?embedded-checkout=true">
          [source]
        </a>
      </p>
      <img
        src="/favicon.jpeg"
        width={300}
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      />
    </div>
  );
}

const root = document.getElementById('root');
createRoot(root).render(<App />);
