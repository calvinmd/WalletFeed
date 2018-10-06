/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Products', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		categoryId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("Products_categoryId_seq"::regclass)',
			references: {
				model: 'ProductCategories',
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		imageUrl: {
			type: DataTypes.TEXT,
			allowNull: false
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
		tableName: 'Products'
	});
};
