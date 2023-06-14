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

var referenceTrivia = [//the first answer in the answers array for each question is always the right answer. This will only be a reference array to compare answers.
    { question: "Inside which HTML element do we put the JavaScript?", answers:["<script>","<js>","<javascript>","<src>"]},
    { question: "Where is the correct place to insert a JavaScript file in HTML?", answers:["inside <body>","inside <head>","both <head> and <body>","inside <header>"]},
    { question: "What attribute is used to refer to a JavaScript file in the respective element?", answers:["src=\"\"","alt=\"\"","ref=\"\"","link=\"\""]},
    { question: "How can you retrive the element <p id=\"par\">...<> using the DOM ID?", answers:["document.getElementById(par);","document.querySelector(#par);","document.getElementById(#par);","document.getElementsByClassName(#par);"]},
    { question: "What datatype is: \"Hello World!\"?", answers:["String","Char","Text","Array"]},
    { question: "What is the symbol for NOT in JavaScript?", answers:["!","|","~","-"]},
    { question: "How can you add a comment in JavaScript?", answers:["//...","<!--...-->","`...`","#..."]},
    { question: "Which operator is used to assign a value?", answers:["=","==","===","<<"]},
    { question: "Which operator is used for strict comparrison?", answers:["===","=","==","+="]},
    { question: "Which function is used to generate an alert box?", answers:["alert();","alertBox();","inquire();","alertWindow();"]}
];

referenceTrivia = shuffle(referenceTrivia);//calling shuffle function to shuffle trivia questions
var trivia = referenceTrivia;// declare new trivia array which will be implemented in the program. 
//referenceTrivia will only be used as reference from now on

for(let i=0; i<trivia.length; i++){//shuffle the answers in each trivia question
    trivia[i].answers = shuffle(trivia[i].answers);
}

begin.addEventListener("click", function(){
    
})