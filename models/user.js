'use strict';
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password)  
}

  return User;
};