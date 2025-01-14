import getRandomQuestions from './questions.js';

let currentQuestionIndex = 0;
let questionsList = getRandomQuestions(15); // 例如，随机抽选5个问题
let userAnswers = new Array(questionsList.length).fill(null); // 保存用户的选择

function displayQuestion(index) {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    if (!questionElement || !answersElement) {
        console.error('Question or Answers element not found');
        return;
    }
    const { question, options } = questionsList[index];
    
    questionElement.innerHTML = `<p>${question}</p>`;
    answersElement.innerHTML = options.map((option, i) =>
        `<p><input type="radio" name="option" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}> ${option}</p>`
    ).join('');
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error('Timer element not found');
        return;
    }
    let timeLeft = 1800; // 30分钟，单位秒

    const interval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            timerElement.textContent = 'Time is up!';
            calculateScore();
        }
    }, 1000);
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questionsList.length; i++) {
        if (userAnswers[i] === questionsList[i].answer) {
            score++;
        }
    }
    alert(`Your score is: ${score}/${questionsList.length}`);
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < questionsList.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById('submit').addEventListener('click', () => {
    calculateScore();
});

document.getElementById('answers').addEventListener('change', (event) => {
    if (event.target.name === 'option') {
        userAnswers[currentQuestionIndex] = parseInt(event.target.value);
    }
});



displayQuestion(currentQuestionIndex);
updateTimer(); // 确保调用以开始计时
