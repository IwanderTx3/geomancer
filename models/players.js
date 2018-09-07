'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('players', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

});






  return Player;
};