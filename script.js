var begin = document .querySelector("#begin");
var timer = document.querySelector("#time");
var mainEl = document.querySelector("#main");
var quizEl = document.querySelector("#quiz");
var questionNumber = document.querySelector("question-number");

var highscoreBtn = document.querySelector("#highscore-btn");
var highscoreEl = document.querySelector("#highscore-display")
var exitHighscore = document.querySelector("#exit-highscore");
var highscoreContent = document.querySelector("#highscore-content");

var score = 0;
var secondsLeft = 60;

//TODO:IMPLEMENT LOCAL STORAGE FOR HIGHSCORES

function shuffle(array){//function that shuffles a given array
    tempArr = array;
    tempArr.sort(() => Math.random() - 0.5);
    return tempArr;
}

var referenceTrivia = [//the first answer in the answers array for each question is always the right answer. This will only be a reference array to compare answers.
    { question: "Inside which HTML element do we put the JavaScript?", answers:["<script>","<js>","<javascript>","<src>"]},
    { question: "Where is the correct place to insert a JavaScript file in HTML?", answers:["both <head> and <body>","inside <head>","inside <body>","inside <header>"]},
    { question: "What attribute is used to refer to a JavaScript file in the respective element?", answers:["src=\"\"","alt=\"\"","ref=\"\"","link=\"\""]},
    { question: "How can you retrive the element <p id=\"par\">...<> using the DOM ID?", answers:["document.getElementById(par);","document.querySelector(#par);","document.getElementById(#par);","document.getElementsByClassName(#par);"]},
    { question: "What datatype is: \"Hello World!\"?", answers:["String","Char","Text","Array"]},
    { question: "What is the symbol for NOT in JavaScript?", answers:["!","|","~","-"]},
    { question: "How can you add a comment in JavaScript?", answers:["//...","\<!--...-->","`...`","#..."]},
    { question: "Which operator is used to assign a value?", answers:["=","==","===","<<"]},
    { question: "Which operator is used for strict comparrison?", answers:["===","=","==","+="]},
    { question: "Which function is used to generate an alert box?", answers:["alert();","alertBox();","inquire();","alertWindow();"]}
];


referenceTrivia = shuffle(referenceTrivia);//calling shuffle function to shuffle trivia questions
var trivia = referenceTrivia;// declare new trivia array which will be implemented in the program. 
//referenceTrivia will only be used as reference from now on
console.log(referenceTrivia);

for(let i=0; i<trivia.length; i++){//shuffle the answers in each trivia question
    trivia[i].answers = shuffle(trivia[i].answers);
}

begin.addEventListener("click", function(){//begin quiz button event listener.
    quizEl.setAttribute("class", "show");
    mainEl.setAttribute("class", "hide");
    highscoreBtn.setAttribute("class", "hide");
    highscoreEl.setAttribute("class", "hide");

    var time = setInterval(function(){
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft == 0){
            clearInterval(time);
        }
    }, 1000);
});



highscoreBtn.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "show");
    quizEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "hide");
});
exitHighscore.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "show");
});