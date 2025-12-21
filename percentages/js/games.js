// ==============================================
// GAMES MODE - 3 Mini-Games
// ==============================================

const GamesState = {
    glass: {
        target: 60,
        current: 0,
        attempts: 0
    },
    pie: {
        targetFraction: '3/8',
        targetSlices: 3,
        totalSlices: 8,
        colored: 0
    },
    race: {
        score: 0,
        currentQuestion: null,
        questionIndex: 0
    }
};

// ==============================================
// GAME 1: RIEMPI IL BICCHIERE
// ==============================================
function startGlassGame() {
    // Generate random target (20-90%)
    GamesState.glass.target = Math.floor(Math.random() * 71) + 20;
    GamesState.glass.current = 0;
    GamesState.glass.attempts = 0;

    // Update display
    document.getElementById('targetGlass').textContent = GamesState.glass.target;
    document.getElementById('glassLevel').textContent = 0;

    // Reset slider
    const slider = document.getElementById('sliderGlass');
    if (slider) {
        slider.value = 0;
    }

    // Create glass SVG
    createGlassSVG();
    updateGlassLiquid(0);

    // Setup slider listener
    if (slider) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            GamesState.glass.current = value;
            document.getElementById('glassLevel').textContent = value;
            updateGlassLiquid(value);
        });
    }

    console.log(`Glass game started. Target: ${GamesState.glass.target}%`);
}

function checkGlassLevel() {
    const target = GamesState.glass.target;
    const current = GamesState.glass.current;
    const diff = Math.abs(target - current);

    GamesState.glass.attempts++;

    let message = '';
    let emoji = '';

    if (diff === 0) {
        message = 'Perfetto! Hai riempito esattamente al livello giusto! 🎉';
        emoji = '🏆';
        playWinAnimation();
    } else if (diff <= 3) {
        message = 'Quasi perfetto! Sei vicinissimo! 🎯';
        emoji = '⭐';
    } else if (diff <= 10) {
        message = 'Bene! Ma puoi fare meglio. Riprova! 😊';
        emoji = '👍';
    } else {
        message = 'Ops! Sei un po\' lontano. Riprova! 💪';
        emoji = '🎯';
    }

    alert(`${emoji} ${message}\n\nTentativo #${GamesState.glass.attempts}\nDifferenza: ${diff}%`);

    if (diff === 0) {
        setTimeout(() => {
            const playAgain = confirm('Ottimo lavoro! Vuoi giocare ancora?');
            if (playAgain) {
                startGlassGame();
            } else {
                showGamesMenu();
            }
        }, 500);
    }
}

// ==============================================
// GAME 2: COLORA LA TORTA
// ==============================================
function startPieGame() {
    // Generate random fraction
    const fractions = [
        { fraction: '1/4', slices: 2, total: 8 },
        { fraction: '3/8', slices: 3, total: 8 },
        { fraction: '1/2', slices: 4, total: 8 },
        { fraction: '5/8', slices: 5, total: 8 },
        { fraction: '2/3', slices: 4, total: 6 },
        { fraction: '1/3', slices: 2, total: 6 }
    ];

    const selected = fractions[Math.floor(Math.random() * fractions.length)];

    GamesState.pie.targetFraction = selected.fraction;
    GamesState.pie.targetSlices = selected.slices;
    GamesState.pie.totalSlices = selected.total;
    GamesState.pie.colored = 0;

    // Update display
    document.getElementById('targetPieFraction').textContent = selected.fraction;
    document.getElementById('pieColored').textContent = 0;
    document.getElementById('pieTotal').textContent = selected.total;
    document.getElementById('piePercent').textContent = 0;

    // Create pie SVG
    createPieSVG(selected.total);

    console.log(`Pie game started. Target: ${selected.fraction}`);
}

// Note: togglePieSlice and updatePieCounter are in visualizations.js

// Override updatePieCounter to check win condition
const originalUpdatePieCounter = updatePieCounter;
window.updatePieCounter = function() {
    if (typeof originalUpdatePieCounter === 'function') {
        originalUpdatePieCounter();
    }

    // Check win condition
    const colored = document.querySelectorAll('.pie-slice[data-colored="true"]').length;
    GamesState.pie.colored = colored;

    if (colored === GamesState.pie.targetSlices) {
        playWinAnimation();
        setTimeout(() => {
            alert(`🎉 Perfetto! Hai colorato esattamente ${GamesState.pie.targetFraction} della torta!`);
            const playAgain = confirm('Vuoi giocare ancora?');
            if (playAgain) {
                startPieGame();
            } else {
                showGamesMenu();
            }
        }, 300);
    }
};

// ==============================================
// GAME 3: GARA DI PERCENTUALI
// ==============================================
function startRaceGame() {
    GamesState.race.score = 0;
    GamesState.race.questionIndex = 0;

    // Update display
    document.getElementById('raceScore').textContent = '0';
    document.getElementById('raceProgressPlayer').style.width = '0%';

    // Hide start button, show question
    document.getElementById('btnStartRace').style.display = 'none';
    document.getElementById('raceQuestionText').style.display = 'block';
    document.getElementById('raceAnswers').style.display = 'grid';

    // Generate first question
    generateRaceQuestion();

    console.log('Race game started');
}

function generateRaceQuestion() {
    // Simple percentage questions
    const questions = [
        { question: '25% di 100?', answers: [25, 50, 75, 30], correct: 25 },
        { question: '50% di 80?', answers: [40, 45, 35, 50], correct: 40 },
        { question: '10% di 50?', answers: [5, 10, 15, 20], correct: 5 },
        { question: '75% di 100?', answers: [75, 70, 80, 65], correct: 75 },
        { question: '20% di 60?', answers: [12, 15, 10, 18], correct: 12 },
        { question: '30% di 90?', answers: [27, 30, 25, 35], correct: 27 },
        { question: '50% di 120?', answers: [60, 50, 70, 55], correct: 60 },
        { question: '15% di 100?', answers: [15, 20, 10, 25], correct: 15 },
        { question: '40% di 50?', answers: [20, 25, 15, 30], correct: 20 },
        { question: '60% di 100?', answers: [60, 65, 55, 70], correct: 60 }
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    const q = questions[randomIndex];

    GamesState.race.currentQuestion = q;

    // Display question
    document.getElementById('raceQuestionText').textContent = q.question;

    // Shuffle answers
    const shuffled = [...q.answers].sort(() => Math.random() - 0.5);

    // Display answers
    const answersContainer = document.getElementById('raceAnswers');
    answersContainer.innerHTML = '';

    shuffled.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'race-answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => {
            checkRaceAnswer(answer, button);
        });
        answersContainer.appendChild(button);
    });
}

function checkRaceAnswer(answer, button) {
    const correct = GamesState.race.currentQuestion.correct;
    const isCorrect = answer === correct;

    // Disable all buttons
    const allButtons = document.querySelectorAll('#raceAnswers .race-answer-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });

    if (isCorrect) {
        button.classList.add('correct');
        GamesState.race.score++;

        // Update score display
        document.getElementById('raceScore').textContent = GamesState.race.score;

        // Update progress bar
        const progress = (GamesState.race.score / 10) * 100;
        document.getElementById('raceProgressPlayer').style.width = `${progress}%`;

        // Check win condition
        if (GamesState.race.score >= 10) {
            setTimeout(() => {
                playWinAnimation();
                alert('🏆 Hai vinto la gara! Congratulazioni!');
                const playAgain = confirm('Vuoi giocare ancora?');
                if (playAgain) {
                    resetRaceGame();
                } else {
                    showGamesMenu();
                }
            }, 500);
        } else {
            // Next question
            setTimeout(() => {
                generateRaceQuestion();
            }, 800);
        }
    } else {
        button.classList.add('incorrect');
        setTimeout(() => {
            alert('Ops! Risposta sbagliata. Riprova dalla prossima domanda!');
            generateRaceQuestion();
        }, 500);
    }
}

function resetRaceGame() {
    GamesState.race.score = 0;
    GamesState.race.questionIndex = 0;

    document.getElementById('raceScore').textContent = '0';
    document.getElementById('raceProgressPlayer').style.width = '0%';
    document.getElementById('btnStartRace').style.display = 'block';
    document.getElementById('raceQuestionText').textContent = 'Premi Start per iniziare!';
    document.getElementById('raceAnswers').innerHTML = '';
}

// ==============================================
// ANIMATION UTILITIES
// ==============================================
function playWinAnimation() {
    if (!anime) return;

    // Create confetti effect (simple version)
    const body = document.body;
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7B3E9'];

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        body.appendChild(confetti);

        anime({
            targets: confetti,
            translateY: window.innerHeight,
            translateX: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 720,
            opacity: [1, 0],
            duration: 2000 + Math.random() * 1000,
            easing: 'easeInQuad',
            complete: () => {
                body.removeChild(confetti);
            }
        });
    }
}

console.log('games.js loaded successfully');
