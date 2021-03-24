

const Sequelize = require('sequelize'); //시퀼라이즈 패키지이자 생성자, db생성자
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.config.js')[env]; //config에서 데이터베이스 설정 가져오기
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); //mysql 연결객체 생성

db.sequelize = sequelize; //연결객체 재사용

db.User = User;//db라는 객체에 User모델을 담아서 메소드호출
User.init(sequelize);
User.associate(db); //이름과 텍스트를 각각 테이블을 두개 생성해서 관계정의를 할수도 있으나 크게 효용성이 없다 생각되어 따로 모델을 정의하여
// 관계구현을 하지는 않았음.

module.exports = db;