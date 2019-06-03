// 설치한 express 를 등록한다.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.set('view engine', 'pug');
// app.set('index', './views')

//mysql 접속
var mysql = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다.
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '!gcgp1920',
  database : 'yoorim'
});

connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log( 'mysql connect completed' );
});

// static 파일 모음
app.use('/lib', express.static(__dirname+"/web/lib/"));

// localhost:3000 으로 접속하면 아래에서 받는다.
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// (GET 방식만 유용)
// 구글 인증 테스트 페이지
app.get("/auth/google", function(req, res){
	res.sendFile(__dirname + "/web/auth/google.html");
})

// 구글 인증 콜백 //갔다가 정상이면 받을 데이터들을 가져오는 곳 근데 처음에 콜하는 페이지랑 똑같이썼잖아
//그럼 콘솔에 찍히지 googlehtml보면 api가 원래 그런가봐 같은 페이지로 콜백했을 때만 콘솔에찍히는거같애
 app.get("/auth/callbackGoogle", function(req, res){
 	res.sendFile(__dirname + "/web/auth/google.html");
  console.log("called #")
 })

 app.post("/theend", function(req, res){
   var json2 = req.body.json;
   console.log(json2); //post방식으로 받는 곳.
   console.log(json2.email); //email정보출력

  
//조회테스트
var email = json2.email
var sql = 'SELECT * FROM report_card WHERE email =' + mysql.escape(email); //로그인 된 이메일정보만 출력
connection.query(sql, function (err, rows, fields) {
  if (err) console.log(err);
  console.log('rows', rows); //내가 조회한 정보 출력

  // res.redirect("/other")
  // console.log('fields', fields); //fields는 컬럼을 의미한다.모든 컬럼의 정보를 가져옴

//   app.post("/render",function(req, res){
  console.log("db result : ",rows);
res.send(rows)
//   })
});
// connection.end(); //근데 이메일이 중복될리도 없고, 구글에 가입이 되어있어야 애초에 접속해서 정보를 가져올텐데 비교가 왜필요하지?
//res.render('index', { title: 'Hey', message: 'Hello there!'});
// res.sendFile(__dirname + "/web/auth/google.html");
  // res.sendfile(__dirname + "/web/auth/render.html")
 });

 // });//왜 다운로드가 될까?
//데이터 insert테스트
//    connection.connect();
//
//   // var checkQuery =
//    var insertQuery = `INSERT INTO reprot_card (email,NAME,STID,DOB,NODEJS,JAVA,DB,PYTHON) VALUES ('check1@gmail.com','제발','190102','951006','78','88','45','88')`
//    connection.query(insertQuery, //이건 확인 할려고 insert 해본거고 var selectquery로 where해서 조건을 email 로 비교하든 해봐야함. jquery 동적쿼리가 뭐야???
// //값 json으로 들고오잖아 req.body.name 으로 그런거 넣어주는 거야 ${}
//     function (error, results, fields) {
//        if (error) {
//            console.log(error);
//        }
//        console.log("나와아아1" + results); //object출력
//        console.log("나와아아2" + fields); //undefined 출력된다.
//    });
//
//    connection.end(); //여기까지 insert테스트 ok

// 사용할 포트번호.
var port=3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
