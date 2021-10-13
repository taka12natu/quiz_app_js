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
let panelButton = document.getElementById("open_panel");
let submitButton = document.getElementById("submit");
let nextButton = document.getElementById("next");
let resultButton = document.getElementById("result");
let resultBox = document.getElementById("result_box");
let returnButton = document.getElementById("return");

let questionNumber = questions.length;

let panelDisplay = panelButton.style.display;
panelButton.style.display = 'none';

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
let randomPanel = [];
let each_score = 20;

function StartQuiz(){
    submitButton.style.display = submitDisplay;
    panelButton.style.display = panelDisplay;
    if(cnt == 0){ 
        startButton.style.display = "none";
        let num = 0;
        while(questionOrder.length < questionNumber){
            num = Math.floor(Math.random() * questionNumber);
            if(questionOrder.indexOf(num) == -1){
                questionOrder.push(num);
            };
        };
    }else{
        nextButton.style.display = "none";
    };

    while(randomPanel.length < 36){
        num = Math.floor(Math.random() * 36);
        if(randomPanel.indexOf(num) == -1){
            randomPanel.push(num);
        };
    };

    quizBox.innerHTML = `<div id="img_box"><img src="./img/${questions[questionOrder[cnt]].img}" alt=""></div><div class="question_text">${questions[questionOrder[cnt]].question}</div>`; 

    document.getElementById("img_box").insertAdjacentHTML('afterbegin', `<div id="panel_box"></div>`);

    for(i=0; i<36; i++){
        document.getElementById("panel_box").insertAdjacentHTML('beforeend', `<div class="panel"></div>`);
    }
    
    let output = [];
    if(questions[questionOrder[cnt]].answer_type == "radio"){
        questions[questionOrder[cnt]].answers.forEach(element => {
            output.push(`<input type="radio" name="radio" value="${element}"     id="radio">${element}</br>`);
        });
    }else if(questions[questionOrder[cnt]].answer_type == "check"){
        questions[questionOrder[cnt]].answers.forEach(element => {
            output.push(`<input type="checkbox" name="checkbox" value="${element}" id="checkbox">${element}</br>`);
        });
    }else{
        output.push(`<input type="textbox" name="textbox" value="" id="textbox"></br>`);
    };
    answerBox.innerHTML = output.join("");
    output.length = 0;
    cnt += 1; 
}

let p_num = 0;
function OpenPanel(){
    let epanel = document.getElementById("panel_box");
    epanel.children[randomPanel[p_num]].style.opacity = 0;
    epanel.children[randomPanel[p_num+1]].style.opacity = 0;
    epanel.children[randomPanel[p_num+2]].style.opacity = 0;
    p_num += 3;
    each_score -= 2;
}

let score = 0;
let correct_num = 0;
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
        score += each_score;
        each_answer.push("◯");
        correct_num += 1;
    } else {
        alert("不正解");
        each_answer.push("×");
    };
    each_score = 20;
    selectedAnswer = "";
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
    panelButton.style.display = "none";
    resultButton.style.display = "none";
    resultBox.style.display = resultBoxDisplay;

    let grade = "";
    if(score < 20){
        grade = "E";
    }else if(score < 40){
        grade = "D";
    }else if(score < 60){
        grade = "C";
    }else if(score < 80){
        grade = "B";
    }else{
        grade = "A";
    }

    resultText.innerHTML = correct_num + "問 / " + questionNumber + "問中　正解！";
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


panelButton.addEventListener('click', () => {
    if(p_num <36){
        OpenPanel();
    }
});

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


