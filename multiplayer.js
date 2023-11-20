import { createClient } from '@liveblocks/client';

(async () => {
  let PUBLIC_KEY =
    'pk_prod_JCkj01X9spV3u3p2idL9XxDLa_jmwu7YzVTNP6gNBna5_JsYHDRf6ykIpO0WxRGQ';
  let roomId = 'javascript-live-cursors';

  const client = createClient({
    throttle: 16,
    publicApiKey: PUBLIC_KEY,
  });

  const room = client.enter(roomId, {
    initialPresence: { cursor: null },
  });
  const status = room.getStorageStatus();
  console.log(status);
  const { root } = await room.getStorage();

  let localCount = !isNaN(root.get('liveCount')) ? root.get('liveCount') : 0;

  function incrementCount() {
    const currentCount = root.get('liveCount');
    root.set('liveCount', currentCount + 1);
  }

  const button = document.createElement('button');

  button.style.zIndex = '100';
  button.style.padding = '10px';
  button.style.border = 'none';
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.style.fontSize = '20px';
  button.style.fontWeight = 'bold';
  button.style.cursor = 'pointer';
  button.style.outline = 'none';
  button.style.marginLeft = 'auto';
  button.style.marginRight = 'auto';
  button.addEventListener('click', () => {
    incrementCount();
    room.broadcastEvent({ type: 'OVER' });
    button.innerText = `We're so backs: ${++localCount}`;
  });
  room.subscribe('event', ({ event }) => {
    if (event.type === 'OVER') {
      button.innerText = `We're so backs: ${root.get('liveCount')}`;
    }
  });
  button.innerText = `We're so backs: ${localCount}`;

  let backoff = 100;

  const mount = () => {
    if (document.getElementById('button') == null) {
      queueMicrotask(() => {
        queueMicrotask(() => {
          setTimeout(() => {
            console.log('mounting');
            mount();
          }, backoff);
          backoff *= 2;
        });
      });
      return;
    }
    document.getElementById('button').innerHTML = '';
    document.getElementById('button').appendChild(button);
  };
  queueMicrotask(() => {
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        mount();
      });
    });
  });
})();
