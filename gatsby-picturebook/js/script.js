// ===== State =====
let currentPage = 0;
let totalPages = 0;
let pages = [];
let spoilerRevealed = localStorage.getItem('gatsby_spoiler_revealed') === 'true';

// ===== DOM Elements =====
const bookContainer = document.querySelector('.book-container');
const pagesContainer = document.querySelector('.pages-container');
const pageIndicator = document.querySelector('.page-indicator');
const currentSpan = pageIndicator.querySelector('.current');
const totalSpan = pageIndicator.querySelector('.total');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');
const spoilerModal = document.querySelector('.spoiler-modal');

// ===== Initialize =====
async function init() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();

        // Populate splash page
        const splash = document.querySelector('.splash');
        splash.querySelector('.title').textContent = data.splash.title;
        splash.querySelector('.subtitle').textContent = data.splash.subtitle;
        splash.querySelector('.intro').textContent = data.splash.intro;
        splash.querySelector('.hint').textContent = data.splash.hint;

        // Build content pages
        pages = data.pages;
        totalPages = pages.length + 1; // +1 for splash
        totalSpan.textContent = totalPages;

        pages.forEach(page => {
            const pageEl = createPage(page);
            pagesContainer.appendChild(pageEl);
        });

        // Setup navigation
        setupNavigation();
        updatePageIndicator();

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// ===== Create Page =====
function createPage(page) {
    const pageEl = document.createElement('div');
    pageEl.className = `page ${page.type}-page`;
    pageEl.dataset.page = page.id;
    pageEl.dataset.spoiler = page.spoiler;

    if (page.type === 'image') {
        pageEl.innerHTML = `
            <div class="image-container" style="background-image: url('${page.image}')"></div>
            <div class="text-container">
                <h2 class="page-title">${page.title}</h2>
                <p class="page-text">${page.text}</p>
            </div>
            ${page.spoiler && !spoilerRevealed ? createSpoilerOverlay() : ''}
        `;
    } else if (page.type === 'quote') {
        pageEl.innerHTML = `
            <div class="quote-decoration">* * *</div>
            <blockquote class="quote-en">"${page.quote_en}"</blockquote>
            <p class="quote-it">"${page.quote_it}"</p>
            <cite class="attribution">- ${page.attribution}</cite>
            <div class="quote-decoration">* * *</div>
            ${page.spoiler && !spoilerRevealed ? createSpoilerOverlay() : ''}
        `;
    }

    return pageEl;
}

function createSpoilerOverlay() {
    return `
        <div class="spoiler-overlay">
            <span class="warning-icon">&#9888;</span>
            <p class="warning-text">Questa pagina contiene spoiler sul finale del romanzo</p>
            <button class="reveal-btn">Rivela contenuto</button>
        </div>
    `;
}

// ===== Navigation =====
function setupNavigation() {
    // Arrow buttons
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
        if (e.key === 'ArrowRight') goToPage(currentPage + 1);
        if (e.key === 'ArrowUp') goToPage(currentPage - 1);
        if (e.key === 'ArrowDown') goToPage(currentPage + 1);
    });

    // Touch swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    bookContainer.addEventListener('touchstart', (e) => {
        // Don't track swipe on text container (allow scrolling)
        if (e.target.closest('.text-container')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    bookContainer.addEventListener('touchend', (e) => {
        if (e.target.closest('.text-container')) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Spoiler reveal buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('reveal-btn')) {
            spoilerModal.classList.remove('hidden');
        }
        if (e.target.classList.contains('confirm-reveal')) {
            revealSpoilers();
            spoilerModal.classList.add('hidden');
        }
        if (e.target.classList.contains('cancel-reveal')) {
            spoilerModal.classList.add('hidden');
        }
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            goToPage(currentPage + 1); // Swipe left = next
        } else {
            goToPage(currentPage - 1); // Swipe right = prev
        }
    }
}

function goToPage(pageNum) {
    if (pageNum < 0 || pageNum >= totalPages) return;

    // Remove active from current
    const currentEl = document.querySelector('.page.active');
    if (currentEl) currentEl.classList.remove('active');

    // Add active to new page
    let newPageEl;
    if (pageNum === 0) {
        newPageEl = document.querySelector('.splash');
    } else {
        newPageEl = document.querySelector(`.page[data-page="${pageNum}"]`);
    }

    if (newPageEl) {
        newPageEl.classList.add('active');
        currentPage = pageNum;
        updatePageIndicator();
    }
}

function updatePageIndicator() {
    currentSpan.textContent = currentPage;
}

// ===== Spoiler Functions =====
function revealSpoilers() {
    spoilerRevealed = true;
    localStorage.setItem('gatsby_spoiler_revealed', 'true');

    document.querySelectorAll('.spoiler-overlay').forEach(overlay => {
        overlay.classList.add('revealed');
        setTimeout(() => overlay.remove(), 500);
    });
}

// ===== Scroll Detection =====
document.addEventListener('scroll', (e) => {
    if (e.target.classList && e.target.classList.contains('text-container')) {
        const isAtBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
        e.target.classList.toggle('scrolled-bottom', isAtBottom);
    }
}, true);

// ===== Start =====
init();
