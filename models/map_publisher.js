'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var GameMap = sequelize.define('map_publishers', {
    mapname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    },
    mapfile: {
        type: DataTypes.JSON,
        allowNull: false
    },
    mh:{
        type: DataTypes.INTEGER
    },
    mw:{
        type:DataTypes.INTEGER
    }

});





  return GameMap;
};