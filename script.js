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
        answers: {
            "1":"千葉県",
            "2":"埼玉県",
            "3":"岐阜県",
            "4":"三重県"
        },
        correct_answer: "1",
        answer_type: "radio",
        img: "quiz03.png"
    }, {
        question: "これは何の写真？",
        answers: {
            "1":"ゲームボーイアドバンス",
            "2":"ニンテンドーDS",
            "3":"ニンテンドーDSi",
            "4":"ニンテンドー3DS" 
        },
        correct_answer: "3",
        answer_type: "radio",
        img: "quiz04.jpg"
    }, {
        question: "この花束に入っている花は？※複数回答",
        answers: {
            "1":"バラ",
            "2":"ガーベラ",
            "3":"かすみ草",
            "4":"ヒペリカム",
            "5":"アンスリウム" ,
            "6":"ダリア"
        },
        correct_answer: ["1","3","4"],
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
let errorText = document.getElementById("error_text");
let judgePopup = document.getElementById("judge_popup");
let footerImg = document.getElementById("footer_img");


function startDisplay(){
    panelButton.style.display = 'none';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
    resultButton.style.display = 'none';
    resultBox.style.display = 'none';
    judgePopup.style.display = 'none';
    footerImg.style.display = 'none';
}
startDisplay();

let cnt = 0;
let questionOrder = [];　//問題番号をランダムに格納する配列
let randomPanel = [];
let output = [];
let questionNumber = questions.length; //問題数

function StartQuiz(){
    document.getElementById("top_img_box").style.display =  "none";
    submitButton.style.display = "block";
    panelButton.style.display = "block";
    p_num = 0;
    if(cnt == 0){ 
        quizBox.style.display = "block";
        answerBox.style.display = "block";
        startButton.style.display = "none";
        footerImg.style.display = "block";
        document.getElementById("main").style.height = "100%";
        let num = 0;
        // 問題番号をランダムに配列に格納
        while(questionOrder.length < questionNumber){
            num = Math.floor(Math.random() * questionNumber);
            if(questionOrder.indexOf(num) == -1){
                questionOrder.push(num);
            };
        };
    }else{
        nextButton.style.display = "none";
        judgePopup.style.display = "none"; 
        judgePopup.classList.remove(".fadein");     
    };
    // パネル36枚をランダムに配列に格納
    while(randomPanel.length < 36){
        num = Math.floor(Math.random() * 36);
        if(randomPanel.indexOf(num) == -1){
            randomPanel.push(num);
        };
    };
    //問題文と画像を表示
    quizBox.innerHTML = `<div class="question_text">Q${cnt+1} ${questions[questionOrder[cnt]].question}</div><div id="img_box"><img class="quiz_img" src="./img/${questions[questionOrder[cnt]].img}" alt=""></div>`; 

    document.getElementById("img_box").insertAdjacentHTML('afterbegin', `<div id="panel_box"></div>`);

    for(i=0; i<36; i++){
        document.getElementById("panel_box").insertAdjacentHTML('beforeend', `<div class="panel"></div>`);
    }
    //回答選択肢を形式によって表示
    AnswerType(cnt);

    answerBox.innerHTML = output.join("");
    output.length = 0;
    cnt += 1; 
}

function AnswerType(index){
    if(questions[questionOrder[index]].answer_type == "radio"){
        for(element in questions[questionOrder[index]].answers) {
            output.push(`<input type="radio" name="radio" value="${element}" id="radio_${element}" class="select_btn" onchange="checkForm()"><label for="radio_${element}">${questions[questionOrder[index]].answers[element]}</label>`);
        };
    }else if(questions[questionOrder[index]].answer_type == "check"){
        for(element in questions[questionOrder[index]].answers) {
            output.push(`<input type="checkbox" name="checkbox" value="${element}" id="checkbox_${element}" class="select_btn" onchange="checkForm()"><label for="checkbox_${element}">${questions[questionOrder[index]].answers[element]}</label>`)
        };
    }else{
        output.push(`<input type="textbox" name="textbox" value="" id="textbox">`);
    };
}

let p_num = 0;
// パネルをクリックするとランダムに3枚開き、スコアを2点減点
function OpenPanel(){
    let eachPanel = document.getElementById("panel_box");
    eachPanel.children[randomPanel[p_num]].style.opacity = 0;
    eachPanel.children[randomPanel[p_num+1]].style.opacity = 0;
    eachPanel.children[randomPanel[p_num+2]].style.opacity = 0;
    if(p_num != 0){ //1回目のみ減点しない
        score -= 2;
    };
    p_num += 3;
}

let score = 20;
let each_score = [];
let total_score = 0;
let correct_num = 0;
let each_answer = [];
let selectedAnswer = "";
let correctAnswer = "";
function CheckAnswer(cnt) {
    ansewerType = questions[questionOrder[cnt-1]].answer_type;
    if(ansewerType === "radio"){
        correctAnswer = questions[questionOrder[cnt-1]].correct_answer; 
         selectedAnswer = answerBox.radio.value;
         //　未選択時にエラー表示
         if(!selectedAnswer){
            errorText.innerHTML = "１つ選択してください"
            errorText.style.display = "block";
            errorText.style.color = "red";
            return;
         };
    }else if(ansewerType === "check"){
        questions[questionOrder[cnt-1]].correct_answer.forEach(element =>
            correctAnswer = correctAnswer + element
        );
        for(let i=0; i<answerBox.length; i++){
            if(answerBox.checkbox[i].checked === true){
               selectedAnswer = selectedAnswer + Object.keys(questions[questionOrder[cnt-1]].answers)[i];
            };
        };
        //　未選択時にエラー表示
        if(!selectedAnswer){
            errorText.innerHTML = "１つ以上選択してください"
            errorText.style.display = "block";
            errorText.style.color = "red";            
            return;
         };
    }else if(ansewerType === "text"){
        correctAnswer = questions[questionOrder[cnt-1]].correct_answer; 
        selectedAnswer = answerBox.textbox.value;
    };
    // 正誤判定後の処理
    if (selectedAnswer === correctAnswer){
        judgePopup.innerHTML = "正解! スコア："+score+"点";
        judgePopup.style.color = "rgb(18 179 18)";
        judgePopup.classList.add("add");
        total_score += score;
        each_score.push(score);
        each_answer.push("◯");
        correct_num += 1;
    } else {
        score = 0;
        judgePopup.innerHTML = "不正解 スコア："+score+"点";
        judgePopup.style.color = "red";
        each_answer.push("×");
        each_score.push(0);

    };
    // 正誤判定を表示
    judgePopup.style.display = "block";
    judgePopup.classList.add('fadein');
    
    score = 20;
    selectedAnswer = "";
    correctAnswer = "";
    submitButton.style.display = "none";
    if(cnt < questionNumber){
        nextButton.style.display = "block";
    }else{
        resultButton.style.display = "block";
    };
}

let checkRadio = document.getElementsByTagName("radio");
let checkCheckbox = document.getElementsByName("checkbox");

//onchangeで回答を選択するとエラーメッセージを消す
function checkForm(){
    if(errorText){
        errorText.style.display = "none";
    };
}

let resultText = document.getElementById("result_text");
let resultGrade = document.getElementById("result_grade");
let resultScore = document.getElementById("result_score");
let resultTable = document.getElementById("result_table");
let sliderBox = document.getElementsByClassName("slider")[0];
let checkIndex = "";


function Result(){
    quizBox.style.display = "none";
    answerBox.style.display = "none";
    panelButton.style.display = "none";
    resultButton.style.display = "none";
    resultBox.style.display = "block";
    judgePopup.style.display = "none";
    judgePopup.classList.remove(".fadein");

    calcGrade(total_score);

    resultText.innerHTML = "結果：　" + correct_num + "問 / " + questionNumber + "問中　正解！";
    resultGrade.innerHTML = "評価： " + grade; 
    resultScore.innerHTML = "スコア： " + total_score + " 点";

    // 各問題の正誤とスコアをテーブルで表示
    CreateTable();

    // 問題と回答を表示
    for(i=0; i<questionNumber; i++){
        sliderBox.insertAdjacentHTML("beforeend", `<li class="slide_box"><img src="./img/${questions[questionOrder[i]].img}" alt="" class="slide_img"><div class="slide_question">${questions[questionOrder[i]].question}</div><form id="slide_answer_${i}" class="form_style"></form></div></li>`);

        if(questions[questionOrder[i]].answer_type == "radio"){
            for(element in questions[questionOrder[i]].answers) {
                output.push(`<input type="radio" name="radio" value="${element}" id="radio_${element}" class="select_btn"><label for="radio_${element}">${questions[questionOrder[i]].answers[element]}</label>`);
                //　正解番号を格納
                if(element == questions[questionOrder[i]].correct_answer){
                    // elementは１から始まるため-1しておく
                    checkIndex = Number(element-1);
                };
            };

        }else if(questions[questionOrder[i]].answer_type == "check"){
            for(element in questions[questionOrder[i]].answers) {
                output.push(`<input type="checkbox" name="checkbox" value="${element}" id="checkbox_${element}" class="select_btn"><label for="checkbox_${element}">${questions[questionOrder[i]].answers[element]}</label>`)
            };
            checkIndex = questions[questionOrder[i]].correct_answer;
        }else{
            output.push(`<label class="asnswer_text">${questions[questionOrder[i]].correct_answer}</label>`);
        };

        let slideAnswer = document.getElementById(`slide_answer_${i}`);
        slideAnswer.innerHTML = output.join("");

        //　正解の選択肢を強調して表示
        if(questions[questionOrder[i]].answer_type == "radio"){
            slideAnswer.radio[checkIndex].checked = true;
            slideAnswer.getElementsByTagName("label")[checkIndex].style.color = "green";
            slideAnswer.getElementsByTagName("label")[checkIndex].style.border = "solid green";

         }else if(questions[questionOrder[i]].answer_type == "check"){
            for(c in checkIndex){
            slideAnswer.checkbox[checkIndex[c]-1].checked = true;
            slideAnswer.getElementsByTagName("label")[checkIndex[c]-1].style.color = "green";
            slideAnswer.getElementsByTagName("label")[checkIndex[c]-1].style.border = "solid green";
            };
        }else{
            slideAnswer.getElementsByTagName("label")[0].style.border = "solid green";
            slideAnswer.getElementsByTagName("label")[0].style.color = "green";
        };
        output.length = 0;
        checkIndex = "";
    };
    //スライドショーを表示
    $('.slider').slick({
        autoplay:false,
        autoplaySpeed:2000,
        dots:false,
        arrow:true,
        prevArrow: '<div class="slick-prev"><div class=slider-arrow><i class="fas fa-chevron-left"></i> Previous</div></div>', 
        nextArrow: '<div class="slick-next"><div class=slider-arrow>Next <i class="fas fa-chevron-right"></i></div></div>'
  });
}

let grade = "";
function calcGrade(total_score){
    if(total_score < 20){
        grade = "E";
    }else if(total_score < 40){
        grade = "D";
    }else if(total_score < 60){
        grade = "C";
    }else if(total_score < 80){
        grade = "B";
    }else{
        grade = "A";
    }

}

/* 参考元
https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
// 各問題の正誤とスコアをテーブルで表示
function CreateTable(){
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // 各セルの作成
  for (var i = 0; i < 3; i++) {
    // 行<tr>タグの作成
    var row = document.createElement("tr");

    for (var j = 0; j < questionNumber+1; j++) {
      //　列<td>タグを作成して各タグに問題番号と正誤を表示
      debugger
      var cell = document.createElement("td");
      if(i == 0 && j == 0){
        var cellText = document.createTextNode("問題");
      }else if(i == 1 && j == 0){
        var cellText = document.createTextNode("正誤");
      }else if(i == 2 && j == 0){
            var cellText = document.createTextNode("スコア");
      }else if(i == 0){
        var cellText = document.createTextNode(j + "問");
      }else if(i == 1){
        var cellText = document.createTextNode(each_answer[j-1]);
      }else{
        var cellText = document.createTextNode(each_score[j-1]);
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


startButton.addEventListener('click', () => {
    StartQuiz();
});
nextButton.addEventListener('click', () => {
    StartQuiz();
});
panelButton.addEventListener('click', () => {
    if(p_num <36){
        OpenPanel();
    }else{
        alert("パネルは全て開いています");
    }
});
submitButton.addEventListener('click', () => {
    CheckAnswer(cnt);
});
resultButton.addEventListener('click', () => {
    Result();
});
returnButton.addEventListener('click', () => {
    document.location.reload();
});


