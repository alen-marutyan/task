const {DataTypes} = require("sequelize");
const sequelize = require('../db.js')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING },
    email: {type: DataTypes.STRING, allowNull:false, unique: true, validate:{isEmail: true} },
    password: {type: DataTypes.STRING },
});

const Car = sequelize.define('car',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING},
    make: {type: DataTypes.STRING},
    license_place: {type: DataTypes.STRING, allowNull:false, unique: true},
    year: {type: DataTypes.INTEGER},
});

User.hasOne(Car);
Car.belongsTo(User)


module.exports = {
    User, Car
}


