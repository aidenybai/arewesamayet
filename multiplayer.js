import { createClient } from '@liveblocks/client';

(async () => {
  let PUBLIC_KEY =
    'pk_prod_JCkj01X9spV3u3p2idL9XxDLa_jmwu7YzVTNP6gNBna5_JsYHDRf6ykIpO0WxRGQ';
  let roomId = 'javascript-live-cursors';

  const PRIMARY_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  overrideApiKeyAndRoomId();

  const client = createClient({
    throttle: 16,
    publicApiKey: PUBLIC_KEY,
  });

  const room = client.enter(roomId, {
    initialPresence: { cursor: null },
  });
  const { root } = await room.getStorage();

  const cursorsContainer = document.getElementById('cursors-container');
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    paint();
  });

  room.subscribe('my-presence', () => {});

  room.subscribe('others', (others, event) => {
    switch (event.type) {
      case 'reset': {
        cursorsContainer.innerHTML = '';
        for (const user of others) {
          updateCursor(user);
        }
        break;
      }
      case 'leave': {
        deleteCursor(event.user);
        break;
      }
      case 'enter':
      case 'update': {
        updateCursor(event.user);
        break;
      }
    }
  });

  room.subscribe('event', () => {});

  document.addEventListener('pointermove', (e) => {
    e.preventDefault();
    room.updatePresence({
      cursor: {
        x: Math.round(e.clientX / window.innerWidth),
        y: Math.round(e.clientY / window.innerHeight),
      },
    });
  });

  document.addEventListener('pointerleave', () => {
    room.updatePresence({ cursor: null });
  });

  function updateCursor(user) {
    const cursor = getCursorOrCreate(user);

    if (user.presence?.cursor) {
      cursor.style.transform = `translateX(${
        user.presence.cursor.x * window.innerWidth
      }px) translateY(${user.presence.cursor.y * window.innerHeight}px)`;
      cursor.style.opacity = '1';
    } else {
      cursor.style.opacity = '0';
    }
  }

  function getCursorOrCreate(user) {
    let cursor = document.getElementById(`cursor-${user.connectionId}`);

    if (cursor == null) {
      cursor = document.getElementById('cursor-template').cloneNode(true);
      cursor.id = `cursor-${user.connectionId}`;
      cursor.style.fill =
        PRIMARY_COLORS[user.connectionId % PRIMARY_COLORS.length];

      cursorsContainer.appendChild(cursor);
    }

    return cursor;
  }

  function deleteCursor(user) {
    const cursor = document.getElementById(`cursor-${user.connectionId}`);
    if (cursor) {
      cursor.parentNode.removeChild(cursor);
    }
  }

  /**
   * This function is used when deploying an example on liveblocks.io.
   * You can ignore it completely if you run the example locally.
   */
  function overrideApiKeyAndRoomId() {
    const query = new URLSearchParams(window?.location?.search);
    const apiKey = query.get('apiKey');
    const roomIdSuffix = query.get('roomId');

    if (apiKey) {
      PUBLIC_KEY = apiKey;
    }

    if (roomIdSuffix) {
      roomId = `${roomId}-${roomIdSuffix}`;
    }
  }

  let localCount = !isNaN(root.get('liveCount')) ? root.get('liveCount') : 0;

  // Function to increment the count
  function incrementCount() {
    const currentCount = root.get('liveCount');
    root.set('liveCount', currentCount + 1);
  }

  // create a button that is position absolute on bottom right that wehen click increment count and displays the count
  const button = document.createElement('button');
  button.style.position = 'absolute';
  button.style.bottom = '0';
  button.style.right = '0';
  button.style.zIndex = '100';
  button.style.padding = '10px';
  button.style.border = 'none';
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.style.fontSize = '20px';
  button.style.fontWeight = 'bold';
  button.style.cursor = 'pointer';
  button.style.outline = 'none';
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
  document.body.appendChild(button);
})();
