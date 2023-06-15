var beginBtn = document .querySelector("#begin");
var timer = document.querySelector("#time");
var mainEl = document.querySelector("#main");
var quizEl = document.querySelector("#quiz");

var questionNumberEl = document.querySelector("#question-number");
var questionEl = document.querySelector("#question");
var allChoices = document.querySelector(".answers");

var choices = {};
choices['choice_1'] = document.querySelector("#choice-1");
choices['choice_1'].setAttribute("data-correct", "false");
choices['choice_2'] = document.querySelector("#choice-2");
choices['choice_3'] = document.querySelector("#choice-3");
choices['choice_4'] = document.querySelector("#choice-4");

var highscoreBtn = document.querySelector("#highscore-btn");
var highscoreEl = document.querySelector("#highscore-display")
var exitHighscore = document.querySelector("#exit-highscore");
var highscoreContent = document.querySelector("#highscore-content");

var correctAnswers = 0;
var secondsLeft = 60;
var currQuestion = 1;

//TODO:IMPLEMENT LOCAL STORAGE FOR HIGHSCORES

function shuffle(array){//function that shuffles a given array
    tempArr = array;
    tempArr.sort(() => Math.random() - 0.5);
    return tempArr;
}

var referenceTrivia = [//the first answer in the answers array for each question is always the right answer. This will only be a reference array to compare answers.
    { question: "Inside which HTML element do we put the JavaScript?", answers:["&#60;script&#62;","&#60;js&#62;","&#60;javascript&#62;","&#60;src&#62;"]},
    { question: "Where is the correct place to insert a JavaScript file in HTML?", answers:["both &#60;head&#62; and &#60;body&#62;","inside &#60;head&#62;","inside &#60;body&#62;","inside &#60;header&#62;"]},
    { question: "What attribute is used to refer to a JavaScript file in the respective element?", answers:["src=\"\"","alt=\"\"","ref=\"\"","link=\"\""]},
    { question: "How can you retrive the element &#60;p id=\"par\"&#62;...&#60;/p&#62; using the DOM ID?", answers:["document.getElementById(par);","document.querySelector(#par);","document.getElementById(#par);","document.getElementsByClassName(#par);"]},
    { question: "What datatype is: \"Hello World!\"?", answers:["String","Char","Text","Array"]},
    { question: "What is the symbol for NOT in JavaScript?", answers:["!","|","~","-"]},
    { question: "How can you add a comment in JavaScript?", answers:["//...","'&#60;!--...--&#62;'","`...`","#..."]},
    { question: "Which operator is used to assign a value?", answers:["=","==","===","<<"]},
    { question: "Which operator is used for strict comparrison?", answers:["===","=","==","+="]},
    { question: "Which function is used to generate an alert box?", answers:["alert();","alertBox();","inquire();","alertWindow();"]}
];


referenceTrivia = shuffle(referenceTrivia);//calling shuffle function to shuffle trivia questions
var trivia = JSON.parse(JSON.stringify(referenceTrivia));// declare new trivia array which is a clone of the referenceTrivia.
//referenceTrivia will only be used as reference from now on
console.log("reference: ", referenceTrivia); //TODO:REMOVE LOGS BEFORE SUBMISSION
console.log("trivia: ", trivia); //TODO:REMOVE LOGS BEFORE SUBMISSION

for(let i=0; i<trivia.length; i++){//shuffle the answers in each trivia question
    trivia[i].answers = shuffle(trivia[i].answers);
}

console.log(trivia == referenceTrivia);

beginBtn.addEventListener("click", function(){//begin quiz button event listener.
    quizEl.setAttribute("class", "show");
    mainEl.setAttribute("class", "hide");
    highscoreBtn.setAttribute("class", "hide");
    highscoreEl.setAttribute("class", "hide");

    quiz(1);

    var time = setInterval(function(){
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft == 0){
            clearInterval(time);
        }
    }, 1000);
});

function quiz(qNum){
    //question number
    console.log(qNum);
    questionNumberEl.innerHTML = `Question ${qNum}: `;

    //formatting the question
    let currentQuestion = qNum - 1;
    questionEl.innerHTML = trivia[currentQuestion].question;

    //formatting the answers
    choices["choice_1"].innerHTML = trivia[currentQuestion].answers[0];
    choices["choice_2"].innerHTML = trivia[currentQuestion].answers[1];
    choices["choice_3"].innerHTML = trivia[currentQuestion].answers[2];
    choices["choice_4"].innerHTML = trivia[currentQuestion].answers[3];

    for(let i=0; i<trivia[currentQuestion].answers.length; i++){
        let currChoice = `choice_${i+1}`;
        console.log(trivia[currentQuestion].answers[i], referenceTrivia[currentQuestion].answers[0]);
        if(trivia[currentQuestion].answers[i] === referenceTrivia[currentQuestion].answers[0]){
            choices[currChoice].setAttribute("data-correct", "true");
            console.log(choices[currChoice]);
        }else{
            choices[currChoice].setAttribute("data-correct", "false");
            console.log(choices[currChoice]);
        }
    }

    allChoices.addEventListener("click", function(){

    })

}


highscoreBtn.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "show");
    quizEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "hide");
});
exitHighscore.addEventListener("click", function(){
    highscoreEl.setAttribute("class", "hide");
    mainEl.setAttribute("class", "show");
});