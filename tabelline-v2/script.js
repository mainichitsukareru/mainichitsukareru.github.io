document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const startGameButton = document.getElementById('start-game');
    const backToMenuButton = document.getElementById('back-to-menu');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const feedbackMessage = document.getElementById('feedback-message');
    const scoreArea = document.getElementById('score');
    const totalAnswersArea = document.getElementById('total-answers');
    const finalScoreSpan = document.getElementById('final-score');
    const progressBar = document.getElementById('progress');
    const timerElement = document.getElementById('timer');

    const MAX_CORRECT_ANSWERS = 15;
    const MIN_HARD_QUESTIONS = 10;
    let score = 0;
    let totalAnswers = 0;
    let hardQuestionsAnswered = 0;
    let isAnswerSelected = false;
    let timeLeft = 15;
    let timerInterval;
    let questionHistory = [];

    startGameButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        startGame();
    });

    function startGame() {
        score = 0;
        totalAnswers = 0;
        hardQuestionsAnswered = 0;
        questionHistory = [];
        scoreArea.textContent = score;
        totalAnswersArea.textContent = totalAnswers;
        updateProgress();
        generateQuestion();
    }

    function updateProgress() {
        const percentage = (score / MAX_CORRECT_ANSWERS) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 15;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerElement.textContent = timeLeft;
    }

    function handleTimeOut() {
        if (!isAnswerSelected) {
            isAnswerSelected = true;
            feedbackMessage.textContent = "Tempo scaduto!";
            feedbackMessage.className = 'feedback-message feedback-wrong';
            setTimeout(generateQuestion, 1500);
        }
    }

    function generateNumbers() {
        const remainingRequired = MAX_CORRECT_ANSWERS - score;
        const remainingHardRequired = Math.max(0, MIN_HARD_QUESTIONS - hardQuestionsAnswered);
        const forceHard = remainingHardRequired >= remainingRequired;

        let num1, num2;
        
        if (forceHard || Math.random() < 0.7) {  // 70% di probabilità di domande difficili se non forzate
            // Genera numeri difficili (6-9)
            num1 = Math.floor(Math.random() * 4) + 6;  // 6-9
            num2 = Math.floor(Math.random() * 4) + 6;  // 6-9
        } else {
            // Genera numeri facili (2-5)
            num1 = Math.floor(Math.random() * 4) + 2;  // 2-5
            num2 = Math.floor(Math.random() * 4) + 2;  // 2-5
        }

        // Evita ripetizioni recenti
        const questionKey = `${num1}x${num2}`;
        if (questionHistory.includes(questionKey)) {
            return generateNumbers();
        }

        questionHistory.push(questionKey);
        if (questionHistory.length > 5) {  // Mantiene solo le ultime 5 domande nella cronologia
            questionHistory.shift();
        }

        return { num1, num2 };
    }

    function generateQuestion() {
        const { num1, num2 } = generateNumbers();
        const correctAnswer = num1 * num2;

        let wrongAnswers = new Set();
        while (wrongAnswers.size < 3) {
            let wrong = correctAnswer + (Math.floor(Math.random() * 11) - 5);
            if (wrong !== correctAnswer && wrong > 0) {
                wrongAnswers.add(wrong);
            }
        }

        const answers = [...wrongAnswers, correctAnswer];
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }

        questionText.textContent = `Quanto fa ${num1} × ${num2}?`;
        questionText.dataset.correctAnswer = correctAnswer;
        questionText.dataset.isHardQuestion = (num1 >= 6 && num2 >= 6);

        answerOptions.innerHTML = '';
        answers.forEach(answer => {
            const button = document.createElement('div');
            button.className = 'answer-option';
            button.textContent = answer;
            button.dataset.answer = answer;
            answerOptions.appendChild(button);
        });

        isAnswerSelected = false;
        feedbackMessage.textContent = "Tocca la risposta corretta!";
        feedbackMessage.className = 'feedback-message';
        startTimer();
    }

    function endGame() {
        clearInterval(timerInterval);
        gameScreen.classList.add('hidden');
        endScreen.classList.remove('hidden');
        const accuracy = ((score / totalAnswers) * 100).toFixed(1);
        finalScoreSpan.innerHTML = `
            Hai completato il gioco con ${score} risposte corrette in ${totalAnswers} tentativi!<br>
            Precisione: ${accuracy}%<br>
            Risposte corrette a moltiplicazioni difficili: ${hardQuestionsAnswered}
        `;
    }

    function handleAnswer(selectedElement) {
        if (isAnswerSelected) return;
        
        clearInterval(timerInterval);
        isAnswerSelected = true;
        const selectedAnswer = parseInt(selectedElement.dataset.answer);
        const correctAnswer = parseInt(questionText.dataset.correctAnswer);
        const isHardQuestion = questionText.dataset.isHardQuestion === 'true';

        document.querySelectorAll('.answer-option').forEach(option => {
            const answer = parseInt(option.dataset.answer);
            if (answer === correctAnswer) {
                gsap.to(option, {
                    backgroundColor: '#90EE90',
                    borderColor: '#32CD32',
                    duration: 0.3
                });
            } else {
                gsap.to(option, {
                    backgroundColor: '#FFB6C6',
                    borderColor: '#DC143C',
                    duration: 0.3
                });
            }
        });

        totalAnswers++;
        totalAnswersArea.textContent = totalAnswers;

        if (selectedAnswer === correctAnswer) {
            score++;
            if (isHardQuestion) {
                hardQuestionsAnswered++;
            }
            scoreArea.textContent = score;
            feedbackMessage.textContent = 'Corretto! 🎉';
            feedbackMessage.className = 'feedback-message feedback-correct';
            
            if (score >= MAX_CORRECT_ANSWERS) {
                setTimeout(endGame, 1500);
                return;
            }
        } else {
            feedbackMessage.textContent = `Sbagliato! La risposta corretta era ${correctAnswer}`;
            feedbackMessage.className = 'feedback-message feedback-wrong';
        }

        updateProgress();
        setTimeout(generateQuestion, 1500);
    }

    answerOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-option')) {
            handleAnswer(e.target);
        }
    });

    backToMenuButton.addEventListener('click', () => {
        endScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    });
});