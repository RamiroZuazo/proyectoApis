// db/models/users.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    imagen_perfil: { // Nuevo campo
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = User;
