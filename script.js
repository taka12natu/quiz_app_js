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
let resultButton = document.getElementById("result");
let resultBox = document.getElementById("result_box");
let returnButton = document.getElementById("return");

let questionNumber = questions.length;

let submitDisplay = submitButton.style.display;
submitButton.style.display = 'none';

let nextDisplay = nextButton.style.display;
nextButton.style.display = 'none';

let resultDisplay = resultButton.style.display;
resultButton.style.display = 'none';

let resultBoxDisplay = resultBox.style.display;
resultBox.style.display = 'none';

let cnt = 0;
let questionOrder = [];

function StartQuiz(){
    if(cnt == 0){ 
        submitButton.style.display = submitDisplay;
        startButton.style.display = "none";
        let num = 0;
        while(questionOrder.length < questionNumber){
            num = Math.floor(Math.random() * questionNumber);
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
let score = 0;
let each_answer = [];
let selectedAnswer = "";
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
        score += 1;
        each_answer.push("◯");
    } else {
        alert("不正解");
        each_answer.push("×");
    };
    submitButton.style.display = "none";
    if(cnt < questionNumber){
        nextButton.style.display = nextDisplay;
    }else{
        resultButton.style.display = resultDisplay;
    };
}

let resultText = document.getElementById("result_text");
let resultGrade = document.getElementById("result_grade");
let resultScore = document.getElementById("result_score");
let resultTable = document.getElementById("result_table");

function Result(score){
    quizBox.style.display = "none";
    answerBox.style.display = "none";
    resultButton.style.display = "none";
    resultBox.style.display = resultBoxDisplay;

    let grade = "";
    if(score < 2){
        grade = "E";
    }else if(score < 3){
        grade = "D";
    }else if(score < 4){
        grade = "C";
    }else if(score < 5){
        grade = "B";
    }else{
        grade = "A";
    }

    resultText.innerHTML = score + "問 / " + questionNumber + "問中　正解！";
    resultGrade.innerHTML = "評価" + grade; 
    resultScore.innerHTML = "スコア" + score;
    
    CreateTable();


/*  alert('結果：' + score + '/' + questionNumber + ' 正解' ); */ 
}

/* 参考元
https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
function CreateTable(){
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // 各セルの作成
  for (var i = 0; i < 2; i++) {
    // 行<tr>タグの作成
    var row = document.createElement("tr");

    for (var j = 0; j < 5; j++) {
      //　列<td>タグを作成して各タグに問題番号と正誤を表示
      var cell = document.createElement("td");
      if(i == 0){
        var cellText = document.createTextNode(j+1 + "問");
      }else{
        var cellText = document.createTextNode(each_answer[j]);
      };
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // <tbody>タグの子要素に<row>タグを追加
    tblBody.appendChild(row);
  }

  // <tbody>タグを<table>タグの中に追加
  tbl.appendChild(tblBody);
  // <table>タグを<result_table>の中に追加
  resultTable.appendChild(tbl);
  // 枠線を表示
  tbl.setAttribute("border", "1");
}

/* CreateTable();
 */

submitButton.addEventListener('click', () => {
    CheckAnswer(cnt);
});

nextButton.addEventListener('click', () => {
    StartQuiz();
});

startButton.addEventListener('click', () => {
    StartQuiz();
});

resultButton.addEventListener('click', () => {
    Result(score);
});

returnButton.addEventListener('click', () => {
    alert("未実装");
});


