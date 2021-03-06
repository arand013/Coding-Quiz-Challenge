var timeDisplay = document.getElementById("counter")
var timer = document.getElementById("second")
var startBtn = document.getElementById("startBtn")
var questionDiv = document.getElementById("question")
var answerBtn1 = document.getElementById("answer1")
var answerBtn2 = document.getElementById("answer2")
var answerBtn3 = document.getElementById("answer3")
var answerBtn4 = document.getElementById("answer4")
var feedback = document.getElementById("response")
var title = document.getElementById("pageTitle")
var questionNum = 0
var timeLeft = 0
var quizTime = 0
var score = 0
// All Questions

var theQuestions = [
    {
        title: "Where is the correct place to insert a JavaScript",
        choices: ["the head section", "the body section", "Both the head and the body section are corect", " In a CSS file only"],
        answer: "Both the head and the body section are corect"
    },
    {
        title: "What is often used for debugging issues in the console?",
        choices: ["strings", "for loops", "terminal/bash", "console.log"],
        answer: "console.log"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["prompts", "booleans", "strings", "numbers"],
        answer: "prompts"
    },
    {
        title: "How do you declare a JavaScript variable",
        choices: ["var carName", " variable carName", "v carName", "function()"],
        answer: "var carName"
    },
    {
        title: "How to write an IF statement in JavaScript?",
        choices: ["if (i == 5)", "if i == 5 then", "if i = 5", "if i = 5 then"],
        answer: "if (i == 5)"
    },
];

// this if statment checks current page is on highscore page
if (title.innerHTML === "Highscores") {
    theTable();
}

// this function sets timer value and triggers two functions
function quizBegin() {
    timeLeft = 80
    beginTimer();
    initQ();
}
//  this function changes timer display every (second)
function beginTimer() {
    timer.innerHTML = (timeLeft);
    quizTime = setInterval(secCounter, 1000);
}
//  this function equates to a second, then identifies when timer is at 0
function secCounter() {
    if (timeLeft !== 0) {
        timeLeft--
        timer.innerHTML = (timeLeft)
    }
    else {
        clearInterval(quizTime)
        quizOver();
    }
    return;
}
//  this function hides initial elements, Moves on to display quiz.
function initQ() {
    document.querySelectorAll(".main").forEach(main => { main.style.display = "none" })
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "initial" })
    quiz(questionNum);
}
//  this function checks if there are anymore questions or else will end quiz
function quiz() {
    if (questionNum >= theQuestions.length) {
        quizOver();
    }
    else {
        questionDiv.innerHTML = (theQuestions[questionNum].title)
        answerBtn1.innerHTML = (theQuestions[questionNum].choices[0])
        answerBtn2.innerHTML = (theQuestions[questionNum].choices[1])
        answerBtn3.innerHTML = (theQuestions[questionNum].choices[2])
        answerBtn4.innerHTML = (theQuestions[questionNum].choices[3])
    }
}
//  this function checks for correct or wrong answers
function answerCheck(btnId) {
    if ((document.getElementById(btnId).innerHTML) === (theQuestions[questionNum].answer)) {
        rightAnswer();
        questionNum++
    }
    else {
        wrongAnswer();
        questionNum++
    }
    quiz(questionNum);
}
//  function runs when answer is right
function rightAnswer() {
    score = timeLeft
    feedback.innerHTML = ("Correct");
    setTimeout(function () { feedback.innerHTML = (""); }, 800)
}
//  function runs when answer is wrong
function wrongAnswer() {
    timeLeft = (timeLeft - 15)
    feedback.innerHTML = ("Wrong");
    setTimeout(function () { feedback.innerHTML = (""); }, 800)
}

//  this function moves user to the end screen, allows user to submit initials with their score
function quizOver() {
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "none" })
    var content = document.getElementById('theBody')
    var done = document.getElementById("done")
    var submit = document.getElementById("submit")

    timer.innerHTML = (0)

    content.insertAdjacentHTML('afterbegin', '<h1 id="done">All Done!</h1> <button id="submit" class="btn btn-danger">Submit</button> <input id="userScore"> - Enter Initials</input>');

    var done = document.getElementById("done")
    done.insertAdjacentHTML('afterend', '<p id="finalScore">Your final score is ' + score + '</p>');

    var submit = document.getElementById("submit")
    submit.addEventListener("click", function () {
        var value = document.getElementById('userScore').value;
        localStorage.setItem(value, score)
        window.location.href = "highscore.html"
    });
    clearInterval(quizTime)
}

// function displays the table on the highscore table along with scores from local storage
function theTable() {
    var tbody = document.getElementById("tableBody")
    for (let i = 0; i < localStorage.length; i++) {
        var userName = localStorage.key(i)
        var userScore = localStorage.getItem(userName)
        tbody.insertAdjacentHTML('afterbegin', '<tr class="scores"><td>' + userName + ' - ' + userScore + '</td></tr>')
    }
}
// function shows clear highscores button work by clearing local storage and reload game button
function clearStorage() {
    localStorage.clear();
    window.location.reload();
}