const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Proyecto = require('./projects');
const Usuario = require('./users');

const ProyectoMiembro = sequelize.define('ProyectoMiembro', {
    proyecto_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Proyecto,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'proyectos_miembros',
    timestamps: false // Deshabilitar createdAt y updatedAt
});

Proyecto.belongsToMany(Usuario, { through: ProyectoMiembro, foreignKey: 'proyecto_id' });
Usuario.belongsToMany(Proyecto, { through: ProyectoMiembro, foreignKey: 'usuario_id' });

module.exports = ProyectoMiembro;
