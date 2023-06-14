var begin = document .querySelector("#begin");
var timer = document.querySelector("#time");
var highscore = document.querySelector("#highscore-btn");
var quizEl = document.querySelector("#quiz");
var questionNumber = document.querySelector("question-number");

function shuffle(array){//function that shuffles a given array
    tempArr = array;
    tempArr.sort(() => Math.random() - 0.5);
    return tempArr;
}

var trivia = [
    { question: "Inside which HTML element do we put the JavaScript?", answers:["<script>","<js>","<javascript>","<src>"]},
    { question: "Where is the correct place to insert a JavaScript file in HTML?", answers:["inside <body>","inside <head>","both <head> and <body>","inside <header>"]},
    { question: "What attribute is used to refer to a JavaScript file in the respective element?", answers:["src=\"\"","alt=\"\"","ref=\"\"","link=\"\""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]},
    { question: "", answers:["","","",""]}
];

var shuffledTrivia = shuffle(trivia);