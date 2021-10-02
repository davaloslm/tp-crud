const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const finalPrice = (precio, descuento)=> Math.round(precio - (precio*(descuento/100)));

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		res.render("products", )
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params
		let product = products.find(product=> product.id === parseInt(id))
		res.render("detail", {product, toThousand, finalPrice})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.render("product-create-form")
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render("product-edit-form")
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;