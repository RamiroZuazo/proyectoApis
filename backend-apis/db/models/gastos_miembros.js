const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Ticket = require('./tickets');

const GastoMiembro = sequelize.define('GastoMiembro', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    ticket_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'tickets',
            key: 'id',
        },
    },
    usuario_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id',
        },
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pagado: {
        type: DataTypes.TINYINT,
        defaultValue: 0, 
    },
}, {
    tableName: 'gastos_miembros',
    timestamps: false,
});

// En GastoMiembro.js
GastoMiembro.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });


module.exports = GastoMiembro;
