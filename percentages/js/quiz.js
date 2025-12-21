// ==============================================
// QUIZ MODE - Questions & Logic
// ==============================================

const QuizState = {
    difficulty: 'easy',
    score: 0,
    totalQuestions: 0,
    currentQuestion: null,
    userAnswer: null
};

// ==============================================
// QUESTION BANK
// ==============================================
const QuestionBank = {
    easy: [
        {
            type: 'slider',
            question: 'Quanto è il 50% di 100?',
            correctAnswer: 50,
            tolerance: 0
        },
        {
            type: 'slider',
            question: 'Quanto è il 25% di 100?',
            correctAnswer: 25,
            tolerance: 0
        },
        {
            type: 'slider',
            question: 'Quanto è il 75% di 100?',
            correctAnswer: 75,
            tolerance: 0
        },
        {
            type: 'slider',
            question: 'Quanto è il 10% di 100?',
            correctAnswer: 10,
            tolerance: 0
        },
        {
            type: 'multiple',
            question: 'Quale frazione è uguale a 50%?',
            options: ['1/2', '1/4', '1/3', '2/3'],
            correctAnswer: '1/2'
        },
        {
            type: 'multiple',
            question: 'Quale frazione è uguale a 25%?',
            options: ['1/4', '1/2', '1/5', '1/3'],
            correctAnswer: '1/4'
        },
        {
            type: 'slider',
            question: 'Quanto è il 20% di 50?',
            correctAnswer: 10,
            tolerance: 1
        },
        {
            type: 'slider',
            question: 'Quanto è il 50% di 80?',
            correctAnswer: 40,
            tolerance: 1
        },
        {
            type: 'multiple',
            question: 'Quale è più grande: 30% o 1/4?',
            options: ['30%', '1/4', 'Sono uguali'],
            correctAnswer: '30%'
        },
        {
            type: 'slider',
            question: 'Quanto è il 100% di 60?',
            correctAnswer: 60,
            tolerance: 0
        }
    ],
    medium: [
        {
            type: 'slider',
            question: 'Quanto è il 15% di 80?',
            correctAnswer: 12,
            tolerance: 1
        },
        {
            type: 'slider',
            question: 'Quanto è il 35% di 60?',
            correctAnswer: 21,
            tolerance: 1
        },
        {
            type: 'slider',
            question: 'Quanto è il 60% di 90?',
            correctAnswer: 54,
            tolerance: 2
        },
        {
            type: 'multiple',
            question: 'Quale è più grande: 2/3 o 65%?',
            options: ['2/3', '65%', 'Sono uguali'],
            correctAnswer: '2/3'
        },
        {
            type: 'slider',
            question: 'Quanto è il 45% di 120?',
            correctAnswer: 54,
            tolerance: 2
        },
        {
            type: 'multiple',
            question: 'Quale frazione è circa 33%?',
            options: ['1/3', '1/4', '1/2', '2/5'],
            correctAnswer: '1/3'
        },
        {
            type: 'slider',
            question: 'Quanto è il 80% di 75?',
            correctAnswer: 60,
            tolerance: 2
        },
        {
            type: 'slider',
            question: 'Quanto è il 5% di 200?',
            correctAnswer: 10,
            tolerance: 1
        },
        {
            type: 'multiple',
            question: 'Quale è più piccolo: 1/5 o 15%?',
            options: ['1/5', '15%', 'Sono uguali'],
            correctAnswer: '15%'
        },
        {
            type: 'slider',
            question: 'Quanto è il 90% di 110?',
            correctAnswer: 99,
            tolerance: 2
        }
    ],
    hard: [
        {
            type: 'slider',
            question: 'Quanto è il 17% di 150?',
            correctAnswer: 25.5,
            tolerance: 2
        },
        {
            type: 'slider',
            question: 'Quanto è il 33% di 210?',
            correctAnswer: 69.3,
            tolerance: 3
        },
        {
            type: 'slider',
            question: 'Quanto è il 67% di 180?',
            correctAnswer: 120.6,
            tolerance: 3
        },
        {
            type: 'multiple',
            question: 'Ordina dal più piccolo: 40%, 3/8, 0.45',
            options: ['3/8 < 40% < 0.45', '40% < 3/8 < 0.45', '0.45 < 40% < 3/8', '3/8 < 0.45 < 40%'],
            correctAnswer: '3/8 < 40% < 0.45'
        },
        {
            type: 'slider',
            question: 'Quanto è il 12.5% di 160?',
            correctAnswer: 20,
            tolerance: 2
        },
        {
            type: 'slider',
            question: 'Quanto è il 85% di 240?',
            correctAnswer: 204,
            tolerance: 5
        },
        {
            type: 'multiple',
            question: 'Quale frazione è circa 66.67%?',
            options: ['2/3', '3/4', '5/8', '1/2'],
            correctAnswer: '2/3'
        },
        {
            type: 'slider',
            question: 'Quanto è il 42% di 95?',
            correctAnswer: 39.9,
            tolerance: 3
        },
        {
            type: 'slider',
            question: 'Quanto è il 3% di 500?',
            correctAnswer: 15,
            tolerance: 1
        },
        {
            type: 'multiple',
            question: 'Quale è più grande: 7/10 o 68%?',
            options: ['7/10', '68%', 'Sono uguali'],
            correctAnswer: '7/10'
        }
    ]
};

// ==============================================
// QUIZ FUNCTIONS
// ==============================================
function setQuizDifficulty(difficulty) {
    QuizState.difficulty = difficulty;
    console.log(`Difficulty set to: ${difficulty}`);
}

function generateNewQuestion() {
    const questions = QuestionBank[QuizState.difficulty];
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    QuizState.currentQuestion = question;
    QuizState.userAnswer = null;

    // Clear feedback
    const feedbackArea = document.getElementById('feedbackArea');
    feedbackArea.textContent = '';
    feedbackArea.className = 'feedback-area';

    // Display question
    displayQuestion(question);

    console.log('New question generated:', question);
}

function displayQuestion(question) {
    const questionText = document.getElementById('questionText');
    const answerArea = document.getElementById('answerArea');

    questionText.textContent = question.question;

    // Clear answer area
    answerArea.innerHTML = '';

    if (question.type === 'slider') {
        displaySliderQuestion(answerArea);
    } else if (question.type === 'multiple') {
        displayMultipleChoiceQuestion(answerArea, question.options);
    }
}

function displaySliderQuestion(container) {
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';

    const label = document.createElement('label');
    label.innerHTML = 'La tua risposta: <span id="quizAnswer">0</span>';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'quizSlider';
    slider.className = 'custom-slider';
    slider.min = '0';
    slider.max = '250';
    slider.value = '0';

    slider.addEventListener('input', (e) => {
        document.getElementById('quizAnswer').textContent = e.target.value;
        QuizState.userAnswer = parseInt(e.target.value);
    });

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);
    container.appendChild(sliderContainer);
}

function displayMultipleChoiceQuestion(container, options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'race-answers'; // Reuse race-answers style

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'race-answer-btn';
        button.textContent = option;
        button.addEventListener('click', () => {
            // Remove active from all
            optionsContainer.querySelectorAll('.race-answer-btn').forEach(btn => {
                btn.style.background = 'white';
                btn.style.borderColor = '#DFE6E9';
            });
            // Mark selected
            button.style.background = '#FFE66D';
            button.style.borderColor = '#FFA07A';
            QuizState.userAnswer = option;
        });
        optionsContainer.appendChild(button);
    });

    container.appendChild(optionsContainer);
}

function checkAnswer() {
    const question = QuizState.currentQuestion;
    const userAnswer = QuizState.userAnswer;

    if (!question || userAnswer === null) {
        alert('Seleziona una risposta prima!');
        return;
    }

    const feedbackArea = document.getElementById('feedbackArea');
    let isCorrect = false;

    if (question.type === 'slider') {
        const diff = Math.abs(userAnswer - question.correctAnswer);
        isCorrect = diff <= question.tolerance;
    } else if (question.type === 'multiple') {
        isCorrect = userAnswer === question.correctAnswer;
    }

    // Update score
    QuizState.totalQuestions++;
    if (isCorrect) {
        QuizState.score++;
    }

    // Update display
    updateScoreDisplay();

    // Show feedback
    if (isCorrect) {
        feedbackArea.className = 'feedback-area correct';
        feedbackArea.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Corretto! La risposta è ${question.correctAnswer}
        `;
        playSuccessAnimation();
    } else {
        feedbackArea.className = 'feedback-area incorrect';
        feedbackArea.innerHTML = `
            <i class="fas fa-times-circle"></i>
            Ops! La risposta corretta è ${question.correctAnswer}. Tu hai risposto ${userAnswer}.
        `;
    }

    console.log(`Answer checked. Correct: ${isCorrect}`);
}

function updateScoreDisplay() {
    document.getElementById('quizScore').textContent = QuizState.score;
    document.getElementById('quizTotal').textContent = QuizState.totalQuestions;

    // Update stars
    const percentage = (QuizState.score / QuizState.totalQuestions) * 100;
    const stars = document.getElementById('quizStars');
    let starsHTML = '';

    if (percentage >= 90) {
        starsHTML = '⭐⭐⭐';
    } else if (percentage >= 70) {
        starsHTML = '⭐⭐';
    } else if (percentage >= 50) {
        starsHTML = '⭐';
    }

    stars.textContent = starsHTML;
}

function playSuccessAnimation() {
    if (!anime) return;

    const feedbackArea = document.getElementById('feedbackArea');

    anime({
        targets: feedbackArea,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, 0.6)'
    });
}

console.log('quiz.js loaded successfully');
