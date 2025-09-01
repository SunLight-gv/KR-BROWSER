const releasesData = [
    {
        ver: 'Публичный запуск',
        title: 'KR Browser теперь доступен для всех!',
        text: '1 сентября состоялся официальный запуск. Спасибо всем, кто поддерживал нас на этапе разработки. Приватность теперь доступна каждому.',
        date: '01.09.2025'
    },
    {
        ver: 'v3.0.0',
        title: 'Обновление интерфейса и новые возможности',
        text: 'Представляем новый, улучшенный дизайн сайта. Светлая тема сайта доступна. Подготовлена база для будущей светлой темы в браузере. Настройки темы сайта теперь сохраняются.',
        date: '31.08.2025'
    },
    {
        ver: 'v2.5.0',
        title: 'Динамические цепочки Tor и редизайн',
        text: 'Реализовано отображение реальной цепочки Tor. Полностью обновлен дизайн страницы. Улучшена стабильность подключения.',
        date: '23.08.2025'
    },
];

const newsData = [
    {
        title: 'KR Browser официально запущен!',
        excerpt: '1 сентября в 18:00 по МСК состоялся официальный публичный запуск нашего браузера. Добро пожаловать в мир...',
        fullText: '1 сентября в 18:00 по МСК состоялся официальный публичный запуск KR Browser! Мы прошли долгий путь от идеи до полнофункционального продукта, и мы невероятно рады поделиться им со всем миром. Наша миссия — сделать приватность в интернете простой и доступной для каждого. Спасибо за ваше доверие и поддержку!'
    },
    {
        title: 'Обновление v3.0.0: Новый дизайн и улучшения',
        excerpt: '31 августа вышло крупное обновление 3.0.0, которое принесло новый дизайн сайта и значительные улучшения производительности...',
        fullText: '31 августа в 14:34 мы выпустили крупное обновление 3.0.0. Оно включает в себя полностью переработанный дизайн нашего сайта со светлой темой, значительные оптимизации производительности "под капотом" браузера и подготовку к будущим большим нововведениям, включая светлую тему для самого приложения. Это важный шаг перед нашим публичным запуском!'
    },
    {
        title: 'Светлая или темная? Выбирать вам (на сайте).',
        excerpt: 'Узнайте, как переключаться между классической темной и новой светлой темой сайта одним щелчком мыши...',
        fullText: 'С версией 3.0.0 вы можете персонализировать свой опыт просмотра нашего сайта. Новый переключатель тем в заголовке позволяет мгновенно переключаться между классическим сфокусированным темным режимом и новым свежим светлым режимом. Ваш выбор сохраняется, поэтому сайт всегда загружается так, как вам нравится. Напоминаем, что эта функция пока относится только к внешнему виду сайта, а светлая тема для самого браузера находится в разработке.'
    },
    {
        title: 'Что дальше для KR Browser?',
        excerpt: 'Наша дорожная карта включает расширенные элементы управления конфиденциальностью, более обширную библиотеку расширений...',
        fullText: 'Мы уже работаем над следующим набором функций для KR Browser. Наши планы на будущее включают более гранулярные элементы управления конфиденциальностью, расширенную и проверенную библиотеку безопасных расширений и дальнейшие улучшения производительности. А также, конечно же, полноценную светлую тему для самого браузера! Следите за новостями!'
    }
];

const modal = document.getElementById('modal');
const themeSwitcher = document.getElementById('theme-switcher');

function openModal(contentHTML, onOpen) {
    modal.innerHTML = contentHTML;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
        if (onOpen) onOpen(modal);
    }, 10);
    lucide.createIcons();
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
}

function closeModal() {
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.innerHTML = '';
    }, 300);
}

function el(tag, cls, inner) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (inner) e.innerHTML = inner;
    return e;
}

function renderReleases() {
    const wrap = document.getElementById('releases-list');
    wrap.innerHTML = '';
    releasesData.forEach(r => {
        const card = el('div', 'release', `<h4>${r.ver} — ${r.title}</h4><p>${r.text}</p><div class="kv">${r.date}</div>`);
        wrap.appendChild(card);
    });
}

function renderNews() {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';
    newsData.forEach(item => {
        const card = el('article', 'news-item');
        const newsModalHTML = `
        <div class="modal-content">
            <button class="modal-close-btn">&times;</button>
            <div class="modal-header">
                <i data-lucide="newspaper"></i>
                <h3 class="modal-title">${item.title}</h3>
            </div>
            <div class="modal-body">
                <p>${item.fullText}</p>
            </div>
        </div>`;
        card.innerHTML = `<h4>${item.title}</h4><p>${item.excerpt}</p><div style="margin-top:auto;padding-top:12px;display:flex;justify-content:space-between;align-items:center"><div class="kv">KR Labs</div><button class="btn btn-ghost read-more-btn">Читать</button></div>`;
        card.querySelector('.read-more-btn').addEventListener('click', () => openModal(newsModalHTML));
        grid.appendChild(card);
    });
}

const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add('visible');
            io.unobserve(en.target);
        }
    });
}, { threshold: 0.1 });

function detectOS() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('windows')) return { key: 'windows', name: 'Windows' };
    if (ua.includes('mac')) return { key: 'macos', name: 'macOS' };
    if (ua.includes('linux')) return { key: 'linux', name: 'Linux' };
    return { key: 'unknown', name: 'Неизвестно' };
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

async function downloadFileWithProgress(url, filename, onProgress) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.statusText}`);
    }

    const totalSize = Number(response.headers.get('content-length'));
    let loadedSize = 0;
    const chunks = [];

    const reader = response.body.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loadedSize += value.length;
        const percentage = totalSize ? Math.round((loadedSize / totalSize) * 100) : 0;
        onProgress(percentage, loadedSize, totalSize);
    }

    const blob = new Blob(chunks);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// --- Управление темами ---
function applyTheme(theme) {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    themeSwitcher.innerHTML = theme === 'light' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    localStorage.setItem('kr-browser-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}
// --- Конец управления темами ---

document.addEventListener('DOMContentLoaded', () => {
    const latestRelease = releasesData.find(r => r.ver.startsWith('v')) || releasesData[0];
    const publicLaunchInfo = releasesData.find(r => !r.ver.startsWith('v')) || latestRelease;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    renderReleases();
    renderNews();
    document.querySelectorAll('.reveal').forEach(n => io.observe(n));

    const savedTheme = localStorage.getItem('kr-browser-theme') || 'dark';
    applyTheme(savedTheme);
    themeSwitcher.addEventListener('click', toggleTheme);

    document.getElementById('release-badge').textContent = `Последний релиз ${latestRelease.ver}`;
    document.getElementById('release-date').textContent = `Обновлено ${latestRelease.date}`;

    document.getElementById('open-extensions').addEventListener('click', () => {
        const managerModalHTML = `
        <div class="modal-content wide">
            <button class="modal-close-btn">&times;</button>
            <div class="modal-header"><i data-lucide="puzzle"></i><h3 class="modal-title">Менеджер расширений</h3></div>
            <div class="modal-body">
                <p>Управляйте дополнениями для расширения функциональности и обеспечения безопасности вашего браузера.</p>
                 <ul class="feature-list" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:12px; margin-top:16px;">
                  <li style="display:flex; align-items:flex-start; gap:12px;"><i data-lucide="shield-check"></i><div><strong>Безопасная установка:</strong> Каждое расширение работает в изолированной среде, минимизируя риски.</div></li>
                  <li style="display:flex; align-items:flex-start; gap:12px;"><i data-lucide="toggle-right"></i><div><strong>Управление правами:</strong> Вы полностью контролируете, к каким данным имеет доступ каждое дополнение.</div></li>
                  <li style="display:flex; align-items:flex-start; gap:12px;"><i data-lucide="refresh-cw"></i><div><strong>Автоматические обновления:</strong> Поддерживайте расширения в актуальном состоянии для максимальной защиты.</div></li>
                </ul>
            </div>
        </div>`;
        openModal(managerModalHTML);
    });

    const dlBtn = document.getElementById('main-download');
    const os = detectOS();
    if (os.key !== 'windows') {
        dlBtn.disabled = true;
        dlBtn.textContent = 'Скачать (только для Windows)';
        dlBtn.classList.replace('btn-primary', 'btn-ghost');
    } else {
        dlBtn.addEventListener('click', () => {
            const fileNameForUser = `kr-browser-setup-${latestRelease.ver}.exe`;
            const fileNameOnServer = `kr-browser-setup-${latestRelease.ver}.exe`;
            const filePath = `browser/${fileNameOnServer}`;

            const downloadModalHTML = `
            <div class="modal-content download-modal-content">
                <button class="modal-close-btn">&times;</button>
                <div class="modal-header">
                    <i data-lucide="download-cloud"></i>
                    <h3 class="modal-title">Загрузка KR Browser</h3>
                </div>
                <div class="modal-body">
                  <div class="download-info">
                      <div class="info-item"><h4>Версия</h4><p>${latestRelease.ver}</p></div>
                      <div class="info-item"><h4>Размер</h4><p id="file-size">~150 MB</p></div>
                      <div class="info-item"><h4>Платформа</h4><p>Windows</p></div>
                  </div>
                  <div class="progress-bar-container"><div class="progress-bar" id="progress-bar"></div></div>
                  <div class="progress-status" id="progress-status">Готово к загрузке</div>
                  <button class="btn btn-primary" id="start-download-btn"><i data-lucide="download"></i>Скачать</button>
                  <p class="kv">Нажимая "Скачать", вы соглашаетесь с Условиями использования.</p>
                </div>
            </div>`;

            openModal(downloadModalHTML, (modal) => {
                const startBtn = modal.querySelector('#start-download-btn');
                const progressBar = modal.querySelector('#progress-bar');
                const progressStatus = modal.querySelector('#progress-status');
                const fileSizeEl = modal.querySelector('#file-size');

                fetch(filePath, { method: 'HEAD' })
                    .then(res => {
                        if (res.ok) {
                            const size = res.headers.get('content-length');
                            if (size) fileSizeEl.textContent = formatBytes(parseInt(size, 10));
                        } else {
                            fileSizeEl.textContent = "Файл не найден";
                            startBtn.disabled = true;
                        }
                    })
                    .catch(() => {
                        fileSizeEl.textContent = "Ошибка сети";
                        startBtn.disabled = true;
                    });

                startBtn.addEventListener('click', async () => {
                    startBtn.disabled = true;
                    startBtn.innerHTML = '<i data-lucide="loader"></i> Загрузка...';
                    lucide.createIcons();

                    try {
                        await downloadFileWithProgress(filePath, fileNameForUser, (percentage, loaded, total) => {
                            progressBar.style.width = `${percentage}%`;
                            progressStatus.textContent = `${formatBytes(loaded, 1)} / ${formatBytes(total)}`;
                        });
                        progressStatus.textContent = 'Загрузка завершена!';
                        setTimeout(closeModal, 1500);
                    } catch (error) {
                        progressStatus.textContent = `Ошибка: ${error.message}`;
                        startBtn.disabled = false;
                        startBtn.innerHTML = '<i data-lucide="alert-triangle"></i> Попробовать снова';
                        lucide.createIcons();
                    }
                });
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
    });

    document.querySelectorAll('.nav a').forEach(a => {
        a.addEventListener('click', (ev) => {
            ev.preventDefault();
            const href = a.getAttribute('href');
            if (href?.startsWith('#')) {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});