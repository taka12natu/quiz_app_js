let questions = [
    {
      question: "これは何の写真?",
      answers: {},
      correct_answer: "抹茶かき氷",
      answer_type: "text"
    },{
        question: "これは何の写真？",
        answers: {},
        correct_answer: "ビール",
        answer_type: "text"
    }, {
        question: "これはどこの都道府県？",
        answers: [
            "千葉県",
            "埼玉県",
            "岐阜県",
            "三重県" 
        ],
        correct_answer: "千葉県",
        answer_type: "radio"
    }, {
        question: "これは何の写真？",
        answers: [
            "ゲームボーイアドバンス",
            "ニンテンドーDS",
            "ニンテンドーDSi",
            "ニンテンドー3DS" 
        ],
        correct_answer: "ニンテンドーDS",
        answer_type: "radio"
    }, {
        question: "この花束に入っている花は？※複数回答",
        answers: [
            "バラ",
            "ガーベラ",
            "かすみ草",
            "ヒペリカム",
            "アンスリウム" 
        ],
        correct_answer: [1,3,4],
        answer_type: "check"
    }
]

let quizBox = document.getElementById("quiz");
let answerBox = document.getElementById("answer_box");
let startButton = document.getElementById("start");
let submitButton = document.getElementById("submit");
let nextButton = document.getElementById("next");

let submitDisplay = submitButton.style.display;
submitButton.style.display = 'none';

let nextDisplay = nextButton.style.display;
nextButton.style.display = 'none';

function StartQuiz(){
    submitButton.style.display = submitDisplay;
    startButton.style.display = "none";

    quizBox.innerHTML = `<div><img src="./img/quiz03.png" alt=""><div>${questions[2].question}</div></div>`; 

    let output = []
    questions[2].answers.forEach(element => {
        output.push(`<input type="radio" name="radio" value="${element}">${element}</br>`);
    });
    answerBox.innerHTML = output.join("");
}

startButton.onclick = StartQuiz;

function CheckAnswer() { 
    let selectedAnswer = answerBox.radio.value;
    if (selectedAnswer == "千葉県"){
        alert("正解");
    } else {
        alert(selectedAnswer)
    };
    submitButton.style.display = "none";
    nextButton.style.display = nextDisplay;
}

submitButton.onclick = CheckAnswer;

function NextQuiz(){
    submitButton.style.display = submitDisplay;

    quizBox.innerHTML = `<div><img src="./img/quiz04.jpg" alt=""><div>${questions[3].question}</div></div>`; 

    let output = []
    questions[3].answers.forEach(element => {
        output.push(`<input type="radio" name="radio" value="${element}">${element}</br>`);
    });
    answerBox.innerHTML = output.join("");
}

nextButton.onclick = NextQuiz;




function Result(){

}
