/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ProductOrders', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		orderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("ProductOrders_orderId_seq"::regclass)',
			references: {
				model: 'Orders',
				key: 'id'
			}
		},
		productId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("ProductOrders_productId_seq"::regclass)',
			references: {
				model: 'Products',
				key: 'id'
			}
		}
	}, {
		tableName: 'ProductOrders'
	});
};
