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
        validate: {
            notEmpty: { msg: 'El nombre no puede estar vacío' },
        },
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Debe ser un correo válido' },
        },
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: { args: [8, 100], msg: 'La contraseña debe tener al menos 8 caracteres' },
        },
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    imagen_perfil: { 
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = User;
