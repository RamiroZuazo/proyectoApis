// tickets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./projects');
const User = require('./users');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    proyecto_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Project,
            key: 'id',
        },
    },
    usuario_responsable_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    imagen_ticket: {
        type: DataTypes.STRING(255),  
        allowNull: true,             
    }
}, {
    tableName: 'tickets',
    timestamps: false,  // Si no necesitas campos como createdAt y updatedAt
});

// Relaciones
Ticket.belongsTo(Project, { foreignKey: 'proyecto_id', as: 'proyecto' });
Ticket.belongsTo(User, { foreignKey: 'usuario_responsable_id', as: 'usuario_responsable' });

Project.hasMany(Ticket, { foreignKey: 'proyecto_id', as: 'tickets' });
User.hasMany(Ticket, { foreignKey: 'usuario_responsable_id', as: 'tickets' });

module.exports = Ticket;
