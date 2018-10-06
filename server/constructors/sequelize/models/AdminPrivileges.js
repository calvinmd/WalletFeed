/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('AdminPrivileges', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		adminId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("AdminPrivileges_adminId_seq"::regclass)',
			references: {
				model: 'Admins',
				key: 'id'
			}
		},
		privilegeId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 'nextval("AdminPrivileges_privilegeId_seq"::regclass)',
			references: {
				model: 'Privileges',
				key: 'id'
			}
		}
	}, {
		tableName: 'AdminPrivileges'
	});
};
