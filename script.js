//TODO: Remove unnecessary logs bfor publication.

let beginBtn = document .querySelector("#begin");
let timerEl = document.querySelector("#time");
let scoreEl = document.querySelector("#score");
let timeContainer = document.querySelector("#time-container");
let scoreContainer = document.querySelector("#score-container");
let mainEl = document.querySelector("#main");
let quizEl = document.querySelector("#quiz");

let questionNumberEl = document.querySelector("#question-number");
let questionEl = document.querySelector("#question");
let choicesEl = document.querySelector("#choices");

let quizEndEl = document.querySelector("#quiz-end");
let finalScoreEl = document.querySelector("#final-score");
let initialsFormEl = document.querySelector("#initials-form");
let initialsInputEl = document.querySelector("#initials");

let highscoreBtn = document.querySelector("#highscore-btn");
let highscoreEl = document.querySelector("#highscore-display");
let exitHighscore = document.querySelector("#exit-highscore");
let exitHighscoreContainerEl = document.querySelector("#exit-highscore-container");
let highscoreContent = document.querySelector("#highscore-content");

let score = 0;
let timer = 60;
let timestamp = timer;
let questionNum = 0;
let storedUsers = [];

function shuffle(array){//function that shuffles a given array
    tempArr = array;
    tempArr.sort(() => Math.random() - 0.5);
    return tempArr;
}

let referenceTrivia = [//the first answer in the answers array for each question is always the right answer. This will only be a reference array to compare answers.
    { question: "Inside which HTML element do we put the JavaScript?", answers:["<script>","<js>","<javascript>","<src>"]},
    { question: "Where is the correct place to insert a JavaScript file in HTML?", answers:["both <head> and <body>","inside <head>","inside <body>","inside <header>"]},
    { question: "What attribute is used to refer to a JavaScript file in the respective element?", answers:["src=\"\"","alt=\"\"","ref=\"\"","link=\"\""]},
    { question: "How can you retrive the element <pre> &lt;p id=\"par\"&gt;...&lt;/p&gt; </pre> using the DOM ID?", answers:["document.getElementById(par);","document.querySelector(#par);","document.getElementById(#par);","document.getElementsByClassName(#par);"]},
    { question: "What datatype is: \"Hello World!\"?", answers:["String","Char","Text","Array"]},
    { question: "What is the symbol for NOT in JavaScript?", answers:["!","|","~","-"]},
    { question: "How can you add a comment in JavaScript?", answers:["//...","'<!--...-->;'","`...`","#..."]},
    { question: "Which operator is used to assign a value?", answers:["=","==","===","<<"]},
    { question: "Which operator is used for strict comparrison?", answers:["===","=","==","+="]},
    { question: "Which function is used to generate an alert box?", answers:["alert();","alertBox();","inquire();","alertWindow();"]}
];

referenceTrivia = shuffle(referenceTrivia);//calling shuffle function to shuffle trivia questions for each quiz attempt.
let trivia = JSON.parse(JSON.stringify(referenceTrivia));// declare new trivia array which is a clone of the referenceTrivia.
//referenceTrivia will only be used as reference from now on

console.log("reference: ", referenceTrivia); //TODO:REMOVE LOGS BEFORE SUBMISSION
console.log("trivia: ", trivia); //TODO:REMOVE LOGS BEFORE SUBMISSION

for(let i=0; i<trivia.length; i++){//shuffle the answers in each trivia question
    trivia[i].answers = shuffle(trivia[i].answers);
}

beginBtn.addEventListener("click", function(){//begin quiz button event listener.
    quizEl.setAttribute("class", "show");
    mainEl.setAttribute("class", "hide");
    highscoreBtn.setAttribute("class", "hide");
    highscoreEl.setAttribute("class", "hide");
    timeContainer.setAttribute("class", "show");
    scoreContainer.setAttribute("class", "show");

    startTimer();
    generateQuestion();//start generating question 1
});

function startTimer(){
    timerEl.textContent = timer;
    var time = setInterval(function(){//timer start
        timer--;
        timerEl.textContent = timer;

        if(timer <= 0){
            timer = 0;
            endQuiz();
        }
    }, 1000);
}

function generateQuestion(){
    console.log("current question: ", questionNum, " | answers length:", trivia[questionNum].answers.length);
    questionNumberEl.innerHTML = `Question ${questionNum+1}: `;

    //formatting the question
    questionEl.innerHTML = trivia[questionNum].question;

    //formatting the answers
    for (let i = 0; i < trivia[questionNum].answers.length; i++) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "answers")
        choiceBtn.textContent = trivia[questionNum].answers[i];
        choiceBtn.addEventListener("click", (e) => {
            checkAnswer(choiceBtn.textContent);
        })
        choicesEl.append(choiceBtn);
    }
}

function checkAnswer(selectedAnswer){
    if(selectedAnswer === referenceTrivia[questionNum].answers[0]){//if right answer, calculate score and add to score
        let timeDifference = timestamp - timer;
        let possibleScore = 10-timeDifference;
        if(possibleScore > 0){
            score+=possibleScore;
        }
        timestamp = timer;//reset timestamp
        scoreEl.textContent = score;
    }else{//if wrong answer, subtract time
        timer -= 5;
        timerEl.textContent = timer;
        timestamp = timer;//reset timestamp
    }

    questionNum++;
    if(questionNum < 10){
        choicesEl.innerHTML = "";//empty text content for the next set of answers
        return generateQuestion();
    }else{
        return endQuiz();
    }
}

function endQuiz(){
    clearInterval(time);
    quizEl.setAttribute("class", "hide");
    timeContainer.setAttribute("class", "hide");
    scoreContainer.setAttribute("class", "hide");
    quizEndEl.setAttribute("class", "show");

    finalScoreEl.textContent = score;
    initialsFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        let newScore = {
            user: initials.value,
            userScore: score
        }
        storedUsers.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(storedUsers))
        // console.log(window.localStorage.getItem("highscores"));
        displayHighscores()

        quizEndEl.setAttribute("class", "hide");
        highscoreEl.setAttribute("class", "show");
        exitHighscoreContainerEl.setAttribute("class", "show");
    })
}

//IMPLEMENT LOCAL STORAGE FOR HIGHSCORES
function loadHighscores(){
    let storedHighscores = JSON.parse(window.localStorage.getItem("highscores"));
    console.log(storedHighscores);

    if(!storedHighscores){
        storedUsers = [];
        updateHighscores(JSON.stringify(storedUsers));
    }else{
        storedUsers = JSON.parse(window.localStorage.getItem("highscores"));
    }

    displayHighscores()
}

function displayHighscores(){
    displayHtml = `<ul>`

    let storedHighscores = JSON.parse(window.localStorage.getItem("highscores"));
    
    if(storedHighscores){
        storedHighscores.forEach(highscore => {
            displayHtml += `<li>${highscore.user} : ${highscore.userScore}</li>`
        });
    }

    displayHtml += `</ul>`

    highscoreContent.innerHTML = displayHtml;
}

highscoreBtn.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "show");
    quizEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "hide");
    highscoreBtn.setAttribute("class", "hide");
    exitHighscoreContainerEl.setAttribute("class", "show")
});
exitHighscore.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "show");
    highscoreBtn.setAttribute("class", "show");
    exitHighscoreContainerEl.setAttribute("class", "hide")
    location.reload();
});

loadHighscores();
