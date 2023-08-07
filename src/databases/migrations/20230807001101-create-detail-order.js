"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("detail_orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			orderId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			productName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			productPrice: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			qty: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("NOW()"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("detail_orders");
	},
};
