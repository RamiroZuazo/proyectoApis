const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
        defaultValue: 0, // 0 significa no pagado, 1 significa pagado
    },
}, {
    tableName: 'gastos_miembros',
    timestamps: false,
});

module.exports = GastoMiembro;
