const GAMES_CATALOG = [
  {
    id: 'bug-hunter',
    title: 'Bug Hunter: Release Day',
    desc: 'Лови падающие баги на проде до того, как они дойдут до заказчика!',
    icon: '🐛',
    tag: 'ARCADE',
    controlsTip: 'Управление: [A] Влево, [D] Вправо, [Пробел] Фикс бага'
  },
  {
    id: 'coffee-rush',
    title: 'Coffee Machine Protocol',
    desc: 'Напои команду кофе во время утреннего дейли, пока не сгорели дедлайны.',
    icon: '☕',
    tag: 'TIMING',
    controlsTip: 'Управление: Клик мышью / Тап по чашке'
  }
];

const gamesGrid = document.getElementById('gamesGrid');
const gameModal = document.getElementById('gameModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const btnCloseGame = document.getElementById('btnCloseGame');
const modalTitle = document.getElementById('modalTitle');
const gameControlsTip = document.getElementById('gameControlsTip');
const gameViewport = document.getElementById('gameViewport');

function renderCatalog() {
  gamesGrid.innerHTML = '';
  
  GAMES_CATALOG.forEach(game => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="card-banner">
        <span>${game.icon}</span>
        <span class="card-tag">${game.tag}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${game.title}</h3>
        <p class="card-desc">${game.desc}</p>
        <button class="btn-play">▶ ЗАПУСТИТЬ</button>
      </div>
    `;

    card.addEventListener('click', () => openGame(game));
    gamesGrid.appendChild(card);
  });
}

function openGame(game) {
  modalTitle.textContent = game.title;
  gameControlsTip.textContent = game.controlsTip;
  gameViewport.innerHTML = `
    <div style="text-align: center; font-family: monospace;">
      <h3 style="color: #ff1e42; margin-bottom: 8px;">[ ${game.title} ]</h3>
      <p style="color: #00f3ff;">Канал инициализирован. Игра будет подключена на следующем шаге.</p>
    </div>
  `;

  gameModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  gameModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  gameViewport.innerHTML = '';
}

modalBackdrop.addEventListener('click', closeGame);
btnCloseGame.addEventListener('click', closeGame);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && gameModal.getAttribute('aria-hidden') === 'false') {
    closeGame();
  }
});

renderCatalog();
