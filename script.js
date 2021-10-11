let questions = [
    {
      question: "これは何の写真?",
      answers: [],
      correct_answer: "抹茶かき氷",
      answer_type: "text",
      img: "quiz01.jpg"
    }, {
        question: "これは何の写真？",
        answers: [],
        correct_answer: "ビール",
        answer_type: "text",
        img: "quiz02.jpg"
    }, {
        question: "これはどこの都道府県？",
        answers: [
            "千葉県",
            "埼玉県",
            "岐阜県",
            "三重県" 
        ],
        correct_answer: "千葉県",
        answer_type: "radio",
        img: "quiz03.png"
    }, {
        question: "これは何の写真？",
        answers: [
            "ゲームボーイアドバンス",
            "ニンテンドーDS",
            "ニンテンドーDSi",
            "ニンテンドー3DS" 
        ],
        correct_answer: "ニンテンドーDS",
        answer_type: "radio",
        img: "quiz04.jpg"
    }, {
        question: "この花束に入っている花は？※複数回答",
        answers: [
            "バラ",
            "ガーベラ",
            "かすみ草",
            "ヒペリカム",
            "アンスリウム" 
        ],
        correct_answer: "バラかすみ草ヒペリカム",
        answer_type: "check",
        img: "quiz05.jpg"
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
 
let cnt = 0;
let questionOrder = [];

function StartQuiz(){
    if(cnt == 0){ 
        submitButton.style.display = submitDisplay;
        startButton.style.display = "none";
        let num = 0;
        while(questionOrder.length < 5){
            num = Math.floor(Math.random() * questions.length);
            if(questionOrder.indexOf(num) == -1){
                questionOrder.push(num);
            };
        };
    }else{
        submitButton.style.display = submitDisplay;
        nextButton.style.display = "none";
    };
    quizBox.innerHTML = `<div><img src="./img/${questions[questionOrder[cnt]].img}" alt=""><div>${questions[questionOrder[cnt]].question}</div></div>`; 

    let output = [];
    if(questions[questionOrder[cnt]].answer_type == "radio"){
        questions[questionOrder[cnt]].answers.forEach(element => {
            output.push(`<input type="radio" name="radio" value="${element}">${element}</br>`);
        });
    }else if(questions[questionOrder[cnt]].answer_type == "check"){
        questions[questionOrder[cnt]].answers.forEach(element => {
            output.push(`<input type="checkbox" name="checkbox" value="${element}">${element}</br>`);
        });
    }else{
        output.push(`<input type="textbox" name="textbox" value=""></br>`);
    };
    answerBox.innerHTML = output.join("");
    output.length = 0;
    cnt += 1; 
}

function CheckAnswer(cnt) {
    ansewerType = questions[questionOrder[cnt-1]].answer_type;
    correctAnswer = questions[questionOrder[cnt-1]].correct_answer; 
    if(ansewerType === "radio"){
         selectedAnswer = answerBox.radio.value;
    }else if(ansewerType === "check"){
        for(let i=0; i<answerBox.length; i++){
            if(answerBox.checkbox[i].checked === true){
               selectedAnswer = selectedAnswer + questions[questionOrder[cnt-1]].answers[i];
            };
        };
    }else if(ansewerType === "text"){
        selectedAnswer = answerBox.textbox.value;
    };
    if (selectedAnswer === correctAnswer){
        alert("正解");
    } else {
        alert(selectedAnswer);
    };
    submitButton.style.display = "none";
    nextButton.style.display = nextDisplay;
}


submitButton.addEventListener('click', () => {
    CheckAnswer(cnt);
});

nextButton.addEventListener('click', () => {
    StartQuiz();
});

startButton.addEventListener('click', () => {
    StartQuiz();
});

