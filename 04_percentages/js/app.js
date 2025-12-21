// ==============================================
// APP STATE MANAGEMENT
// ==============================================
const AppState = {
    currentMode: 'explore',
    currentTab: 'parts100',
    values: {
        parts100: 50,
        calc: 25,
        calcOf: 80,
        compA: 30,
        compB: 70,
        currentFraction: '1/2'
    }
};

// ==============================================
// INITIALIZATION
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    initializeApp();
});

function initializeApp() {
    // Check browser feature support first
    if (typeof checkFeatureSupport === 'function') {
        checkFeatureSupport();
    }

    // Setup navigation
    setupMainMenu();
    setupTabs();

    // Initialize Explore Mode (default)
    initExploreMode();

    // Initialize other modes
    initQuizMode();
    initGamesMode();
    initLearnMode();

    console.log('All modules initialized');
}

// ==============================================
// MAIN MENU NAVIGATION
// ==============================================
function setupMainMenu() {
    const menuButtons = document.querySelectorAll('.menu-btn');

    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchMode(mode);

            // Update active state
            menuButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchMode(mode) {
    AppState.currentMode = mode;

    // Hide all mode sections
    document.querySelectorAll('.mode-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected mode
    const modeMap = {
        explore: 'exploreMode',
        quiz: 'quizMode',
        games: 'gamesMode',
        learn: 'learnMode'
    };

    const sectionId = modeMap[mode];
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    console.log(`Switched to mode: ${mode}`);
}

// ==============================================
// TABS (EXPLORE MODE)
// ==============================================
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);

            // Update active state
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchTab(tab) {
    AppState.currentTab = tab;

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected tab
    const tabMap = {
        parts100: 'tabParts100',
        calculate: 'tabCalculate',
        compare: 'tabCompare',
        fractions: 'tabFractions'
    };

    const tabId = tabMap[tab];
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
        tabContent.classList.add('active');
    }

    console.log(`Switched to tab: ${tab}`);
}

// ==============================================
// EXPLORE MODE INITIALIZATION
// ==============================================
function initExploreMode() {
    // Tab 1: Parts of 100
    initParts100Tab();

    // Tab 2: Calculate
    initCalculateTab();

    // Tab 3: Compare
    initCompareTab();

    // Tab 4: Fractions
    initFractionsTab();
}

// Tab 1: Parts of 100
function initParts100Tab() {
    const slider = document.getElementById('sliderParts100');
    const valueDisplay = document.getElementById('valueParts100');
    const displayNumber = document.getElementById('displayParts100');

    if (!slider) return;

    slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        AppState.values.parts100 = value;

        valueDisplay.textContent = value;
        displayNumber.textContent = value;

        // Update visualization
        if (typeof updateGrid100 === 'function') {
            updateGrid100(value);
        }
    });

    // Initial render - use setTimeout to ensure DOM is ready
    setTimeout(() => {
        if (typeof createGrid100 === 'function') {
            createGrid100();
        } else {
            console.error('createGrid100 function not found');
        }
    }, 100);
}

// Tab 2: Calculate
function initCalculateTab() {
    const slider = document.getElementById('sliderCalc');
    const valueDisplay = document.getElementById('valueCalc');
    const inputNumber = document.getElementById('inputNumber');
    const calcPercent = document.getElementById('calcPercent');
    const calcOf = document.getElementById('calcOf');
    const calcResult = document.getElementById('calcResult');

    if (!slider || !inputNumber) return;

    const updateCalculation = () => {
        const percent = parseInt(slider.value);
        const number = parseInt(inputNumber.value) || 0;
        const result = Math.round((percent / 100) * number);

        AppState.values.calc = percent;
        AppState.values.calcOf = number;

        valueDisplay.textContent = percent;
        calcPercent.textContent = percent;
        calcOf.textContent = number;
        calcResult.textContent = result;

        // Update chart
        if (typeof updateCalcChart === 'function') {
            updateCalcChart(percent, number);
        }
    };

    slider.addEventListener('input', updateCalculation);
    inputNumber.addEventListener('input', updateCalculation);

    // Initial render - use setTimeout to ensure DOM is ready
    setTimeout(() => {
        if (typeof createCalcChart === 'function') {
            createCalcChart();
        }
        updateCalculation();
    }, 150);
}

// Tab 3: Compare
function initCompareTab() {
    const sliderA = document.getElementById('sliderCompA');
    const sliderB = document.getElementById('sliderCompB');
    const valueA = document.getElementById('valueCompA');
    const valueB = document.getElementById('valueCompB');
    const labelA = document.getElementById('labelCompA');
    const labelB = document.getElementById('labelCompB');
    const comparisonText = document.getElementById('comparisonText');

    if (!sliderA || !sliderB) return;

    const updateComparison = () => {
        const a = parseInt(sliderA.value);
        const b = parseInt(sliderB.value);

        AppState.values.compA = a;
        AppState.values.compB = b;

        valueA.textContent = a;
        valueB.textContent = b;
        labelA.textContent = a;
        labelB.textContent = b;

        // Update comparison text
        if (a > b) {
            comparisonText.textContent = 'A è maggiore di B';
            comparisonText.style.color = 'var(--primary)';
        } else if (b > a) {
            comparisonText.textContent = 'B è maggiore di A';
            comparisonText.style.color = 'var(--secondary)';
        } else {
            comparisonText.textContent = 'A e B sono uguali!';
            comparisonText.style.color = 'var(--accent)';
        }

        // Update charts
        if (typeof updateCompareCharts === 'function') {
            updateCompareCharts(a, b);
        }
    };

    sliderA.addEventListener('input', updateComparison);
    sliderB.addEventListener('input', updateComparison);

    // Initial render - use setTimeout to ensure DOM is ready
    setTimeout(() => {
        if (typeof createCompareCharts === 'function') {
            createCompareCharts();
        }
        updateComparison();
    }, 200);
}

// Tab 4: Fractions
function initFractionsTab() {
    const fractionButtons = document.querySelectorAll('.fraction-btn');
    const currentFraction = document.getElementById('currentFraction');
    const currentPercent = document.getElementById('currentPercent');

    const fractionToPercent = {
        '1/2': 50,
        '1/4': 25,
        '3/4': 75,
        '1/3': 33.33,
        '2/3': 66.67,
        '1/5': 20,
        '1/10': 10
    };

    fractionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const fraction = btn.dataset.fraction;
            const percent = fractionToPercent[fraction];

            AppState.values.currentFraction = fraction;

            // Update active state
            fractionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update display
            currentFraction.textContent = fraction;
            currentPercent.textContent = `${percent}%`;

            // Update chart
            if (typeof updateFractionChart === 'function') {
                updateFractionChart(percent);
            }
        });
    });

    // Initial render - use setTimeout to ensure DOM is ready
    setTimeout(() => {
        if (typeof createFractionChart === 'function') {
            createFractionChart();
        }
    }, 250);
}

// ==============================================
// QUIZ MODE INITIALIZATION
// ==============================================
function initQuizMode() {
    const diffButtons = document.querySelectorAll('.diff-btn');
    const btnNewQuestion = document.getElementById('btnNewQuestion');
    const btnSubmitAnswer = document.getElementById('btnSubmitAnswer');

    // Difficulty selection
    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            diffButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (typeof setQuizDifficulty === 'function') {
                setQuizDifficulty(btn.dataset.difficulty);
            }
        });
    });

    // New question button
    if (btnNewQuestion) {
        btnNewQuestion.addEventListener('click', () => {
            if (typeof generateNewQuestion === 'function') {
                generateNewQuestion();
            }
        });
    }

    // Submit answer button
    if (btnSubmitAnswer) {
        btnSubmitAnswer.addEventListener('click', () => {
            if (typeof checkAnswer === 'function') {
                checkAnswer();
            }
        });
    }
}

// ==============================================
// GAMES MODE INITIALIZATION
// ==============================================
function initGamesMode() {
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            showGame(game);
        });
    });

    // Game-specific initializations
    initGlassGame();
    initPieGame();
    initRaceGame();
}

function showGame(game) {
    // Hide games menu
    document.querySelector('.games-menu').style.display = 'none';

    // Show selected game
    const gameMap = {
        glass: 'gameGlass',
        pie: 'gamePie',
        race: 'gameRace'
    };

    const gameId = gameMap[game];
    const gameContainer = document.getElementById(gameId);
    if (gameContainer) {
        gameContainer.style.display = 'block';

        // Initialize game
        if (game === 'glass' && typeof startGlassGame === 'function') {
            startGlassGame();
        } else if (game === 'pie' && typeof startPieGame === 'function') {
            startPieGame();
        } else if (game === 'race' && typeof startRaceGame === 'function') {
            startRaceGame();
        }
    }
}

function showGamesMenu() {
    // Hide all games
    document.querySelectorAll('.game-container').forEach(game => {
        game.style.display = 'none';
    });

    // Show games menu
    document.querySelector('.games-menu').style.display = 'block';
}

// Make showGamesMenu global for onclick in HTML
window.showGamesMenu = showGamesMenu;

function initGlassGame() {
    const btnCheck = document.getElementById('btnCheckGlass');
    if (btnCheck) {
        btnCheck.addEventListener('click', () => {
            if (typeof checkGlassLevel === 'function') {
                checkGlassLevel();
            }
        });
    }
}

function initPieGame() {
    // Pie game initialization handled in games.js
}

function initRaceGame() {
    const btnStart = document.getElementById('btnStartRace');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (typeof startRaceGame === 'function') {
                startRaceGame();
            }
        });
    }
}

// ==============================================
// LEARN MODE INITIALIZATION
// ==============================================
function initLearnMode() {
    // Create example grid for the "What is a percentage?" card
    createLearnExampleGrid();
}

function createLearnExampleGrid() {
    const exampleGrid = document.querySelector('.example-grid');
    if (!exampleGrid) return;

    const cellSize = 40;
    const gap = 2;

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const index = row * 10 + col;
            const x = col * (cellSize + gap);
            const y = row * (cellSize + gap);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', cellSize);
            rect.setAttribute('height', cellSize);
            rect.setAttribute('rx', 4);

            // Color first 25 cells (25%)
            if (index < 25) {
                rect.setAttribute('fill', '#FF6B6B');
            } else {
                rect.setAttribute('fill', '#F7F9FC');
                rect.setAttribute('stroke', '#DFE6E9');
                rect.setAttribute('stroke-width', '2');
            }

            exampleGrid.appendChild(rect);
        }
    }
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function throttle(func, delay) {
    let timeoutId;
    return function(...args) {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                timeoutId = null;
            }, delay);
        }
    };
}

function animateNumber(element, start, end, duration = 600) {
    if (!element || !anime) return;

    const obj = { value: start };
    anime({
        targets: obj,
        value: end,
        duration: duration,
        easing: 'easeOutQuad',
        update: () => {
            element.textContent = Math.round(obj.value);
        }
    });
}

// Export AppState for use in other modules
window.AppState = AppState;

console.log('app.js loaded successfully');
