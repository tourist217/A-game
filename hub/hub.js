const GAMES_CATALOG = [
  {
    id: 'bug-hunter',
    title: 'Bug Hunter: Release Day',
    desc: 'Лови падающие баги на проде до того, как они дойдут до заказчика!',
    icon: '🐛',
    tag: 'ARCADE',
    path: 'games/bug-hunter/index.html',
    controlsTip: 'Управление: [A] Влево, [D] Вправо или Движение мыши/пальца'
  },
  {
    id: 'coffee-rush',
    title: 'A-Racer: Синий таран',
    desc: 'Жми на газ! Сбивай синие «А», уворачивайся от красных «А». Каждые 10 очков скорость растет.',
    icon: '🏎️',
    tag: 'RACING',
    path: 'games/coffee-rush/index.html',
    controlsTip: 'Управление: [W][A][S][D] или Сенсор / Мышь'
  },
  {
    id: 'quiz',
    title: 'Кто хочет стать Альфа-Миллионером',
    desc: '11 легендарных вопросов: от ДРР Грибанова до покупки Адвант Шопа за 69 рублей!',
    icon: '💡',
    tag: 'QUIZ',
    path: 'games/quiz/index.html',
    controlsTip: 'Управление: Клик / Тап по вариантам ответа'
  },
  {
    id: 'kick-idle',
    title: 'Офисный Кик-Тайм',
    desc: 'Наведи порядок на площадке: доберись до 100 ударов!',
    icon: '👟',
    tag: 'ACTION',
    path: 'games/kick-idle/index.html',
    controlsTip: 'Управление: [W][A][S][D] или Сенсор / Мышь'
  },
  {
    id: 'buy-advant',
    title: 'Купить АдвантШоп',
    desc: 'Собери рубли по офису и накопи 69 рублей, чтобы провернуть сделку века!',
    icon: '💰',
    tag: 'CLICKER',
    path: 'games/buy-advant/index.html',
    controlsTip: 'Управление: [W][A][S][D] или Сенсор / Мышь'
  },
  {
    id: 'catch-drop',
    title: 'Защита АльфаСеллер',
    desc: 'Перехватывай летящие сверху подарки от Адвант Шопа и не дай испачкать офис!',
    icon: '🧺',
    tag: 'ARCADE',
    path: 'games/catch-drop/index.html',
    controlsTip: 'Управление: [A][D] или Сенсор / Мышь'
  },
  {
    id: 'egg-splat',
    title: 'Обучение по Адвант шоп',
    desc: 'Тотальный командный антистресс. Закидай стену яйцами и смой следы шваброй.',
    icon: '🥚',
    tag: 'ANTISTRESS',
    path: 'games/egg-splat/index.html',
    controlsTip: 'Управление: Клик / Тап по стене чтобы бросить яйцо'
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
  gameViewport.innerHTML = '';

  if (game.path) {
    const iframe = document.createElement('iframe');
    // Добавляем штамп времени к пути (Date.now()), чтобы браузер никогда не кэшировал игру
    const cacheBuster = `?t=${Date.now()}`;
    iframe.src = game.path + cacheBuster;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    gameViewport.appendChild(iframe);
  } else {
    gameViewport.innerHTML = `
      <div style="text-align: center; font-family: monospace;">
        <h3 style="color: #ff1e42; margin-bottom: 8px;">[ ${game.title} ]</h3>
        <p style="color: #00f3ff;">Прототип в разработке.</p>
      </div>
    `;
  }

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
