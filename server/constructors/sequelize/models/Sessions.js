/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Sessions', {
		sid: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		expires: {
			type: DataTypes.DATE,
			allowNull: true
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'Sessions'
	});
};
