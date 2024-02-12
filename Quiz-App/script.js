const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


//Make an array of objects that stores question,choices of question and answer
const quiz = [
    {
        question: "What does HTML stand for?",
        choices: [
        "Hyper Type Multi Language",
        "Hyper Text Multiple Language",
        "Hyper Text Markup Language",
        "Home Text Multi Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question:"What does CSS stand for?",
        choices:[
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets",
            "Computer Style Sheets",
        ],
        answer:"Cascading Style Sheets"
    },
    {
        question:"Inside which HTML element do we put the JavaScript?",
        choices:[
            "<scripting>",
            "<script>",
            "<javascript>",
            "<js>",
        ],
        answer:"<script>"
    },
    {
        question:"What does SQL stand for?",
        choices:[
            "Strength Query Language",
            "Stylesheet Query Language",
            "Science Question Language",
            "Structured Query Language",
        ],
        answer:"Structured Query Language"
    },
    {
        question:"What does PHP stand for?",
        choices:[
            "Hypertext Preprocessor",
            "Hometext Programming",
            "Hypertext Programming",
            "Programming Hypertext Preprocessor",
        ],
        answer:"Hypertext Preprocessor"
    }
];

//making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//arrow function to show question
const showQuestion = () =>{
   const questionDetails = quiz[currentQuestionIndex];
   questionBox.textContent = questionDetails.question;

   choicesBox.textContent = "";
   for(let i=0; i<questionDetails.choices.length; i++){
       const currentChoice = questionDetails.choices[i];
       const choiceDiv = document.createElement('div');
       choiceDiv.textContent = currentChoice;
       choiceDiv.classList.add('choice');
       choicesBox.appendChild(choiceDiv);

       choiceDiv.addEventListener('click',()=>{
        if(choiceDiv.classList.contains('selected')){
            choiceDiv.classList.remove('selected');
        }
        else{
            choiceDiv.classList.add('selected');
        }
       });
   }
   if(currentQuestionIndex < quiz.length){
    startTimer();
   }
}

//function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer");
        displayAlert("Correct Answer");
        score++;
    }
    else{
        //alert("Wrong Answer");
        displayAlert(`Wrong Answer ! ${quiz[currentQuestionIndex].answer} is the corrent answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestion();
     }
     else{
         showScore();
         stopTimer();
     }
}

//function to show score
const showScore = () =>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`;
    displayAlert("You have completed this quiz");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

//function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}
//function to start timer
const startTimer = ()=>{
    clearInterval(timerID); //check if any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

//function to stop timer
const stopTimer = () =>{
    clearInterval(timerID);
}


//function to shuffle question
const shuffleQuestion = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i] , quiz[j]] = [quiz[j] , quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestion();
}

//function to start quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestion();
}

//adding Event listeners to start button
startBtn.addEventListener('click',()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click' , ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select your Answer");
        displayAlert("Select your Answer");
        return;
    }
    if(quizOver){
       nextBtn.textContent = "Next";
       scoreCard.textContent = "";
       currentQuestionIndex = 0;
       quizOver = false;
       score = 0;
       startQuiz();
    }
    else{
        checkAnswer();
    }
        
});