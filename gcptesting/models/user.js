const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{ //User모델을 만들고 모듈로 exports함.
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20), //실 datatable은 VARCHAR이지만 시퀄라이즈형 데이터변수 선언
                allowNull: false,//Not null
                unique: true,
            },
            text: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            // created_at: {
            //     type: Sequelize.DATE,
            //     allowNull: false,
            //     defaultValue: Sequelize.NOW,
            // },
        },{
            sequelize, //init 메소드의 매개변수와 연결되는 옵션
            timestamps: false, //자동날짜컬럼 추가기능 해제
            underscored: false,//테이블명이름을 바꾸는 옵션
            modelName: 'User',
            tableName: 'users',
            paranoid: false,//로우 복원이 필요하면 true
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){} //다른 모델과의 관계를 적을 때 사용.
};