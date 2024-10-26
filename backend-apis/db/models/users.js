const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de que esta ruta sea correcta

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
        allowNull: true, // Esto se puede ajustar según tus necesidades
    },
}, {
    tableName: 'usuarios', // Asegúrate de que esto coincide con el nombre de la tabla en la DB
    timestamps: false, // Deshabilitar createdAt y updatedAt
});

module.exports = User; // Exportar el modelo correctamente
