/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Orders', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("Orders_userId_seq"::regclass)',
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		}
	}, {
		tableName: 'Orders'
	});
};
