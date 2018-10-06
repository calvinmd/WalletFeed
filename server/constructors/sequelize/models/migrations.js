/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('migrations', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		executed_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'migrations'
	});
};
