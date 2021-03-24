const express = require('express'); //서버생성용 미들웨어
const path = require('path');//path.join 사용
const morgan = require('morgan'); //응답속도 확인용 미듪웨어
const nunjucks = require('nunjucks');//view engine 사용
const { sequelize } = require('./models/index');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express(); //express 모듈을 실행하여 app변수에 할당, 서버의 역할. 또한 nodemon 설정을 하여 자동 업뎃이 되게끔 설정도 완료.
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');//nunjucks를 사용하여 views 폴더에 있는 html에 DB내용을 자연스럽게 보여주기 위해 사용.
nunjucks.configure('views', { 
    express: app, // 사용할 주체
    watch: true, 
   // autoescape: false, // html 태그 불허
});
sequelize.sync({force: false}) //서버 실행시 mysql과 연동, force는 서버 실행때마다 테이블을 재생성할건지를 묻는 여부.
    .then(() => {
        console.log("데이터 베이스 연결 성공");       
    })
    .catch((err) =>{
        console.error(err);
    });

app.use(morgan('dev'));//응답속도 등 측정
app.use(express.static(path.join(__dirname, 'public')));//정적 파일 제공
app.use(express.json());//express를 이용한 웹서비스 제작시 json으로 이루어진 req를 받았을경우 요청값을 제대로 받아오지 못하는 문제 해결
app.use(express.urlencoded({extended:false})); //중첩된 객체표현 비허용(query-string 모듈 사용)

app.use('/', indexRouter); //라우터들 연결
app.use('/users', usersRouter);

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err:{};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});