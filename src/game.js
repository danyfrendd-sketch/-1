export function startGame() {
  const root = document.getElementById('app');
  if (!root) return;

  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.left = '50%';
  banner.style.bottom = '18px';
  banner.style.transform = 'translateX(-50%)';
  banner.style.background = 'rgba(0,0,0,0.58)';
  banner.style.color = '#fff';
  banner.style.padding = '10px 16px';
  banner.style.borderRadius = '999px';
  banner.style.fontSize = '12px';
  banner.style.zIndex = '10';
  banner.textContent = 'Game bootstrap ready — move game logic from monolith here';
  root.appendChild(banner);

  console.log('Брокевиль: каркас проекта готов. Дальше переносим игровую логику по модулям.');
}
