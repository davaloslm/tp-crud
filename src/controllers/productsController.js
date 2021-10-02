const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const finalPrice = (precio, descuento) => Math.round(precio - (precio * (descuento / 100)));

const controller = {
	// Root - Show all products
	index: (req, res) => {

		res.render("products",)
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const { id } = req.params
		let product = products.find(product => product.id === parseInt(id))
		res.render("detail", { product, toThousand, finalPrice })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},

	// Create -  Method to store
	store: (req, res) => {

		let productoNuevo = req.body;
		productoNuevo.id = products.length + 1;

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		res.redirect("/products/detail/" + productoNuevo.id)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let { id } = req.params;
		let product = products.find(product => product.id === parseInt(id));

		res.render("product-edit-form", { product })
	},
	// Update - Method to update
	update: (req, res) => {

		let productoEditado = products.find(product => product.id === parseInt(req.params.id));
		const {name, price, category, description, discount } = req.body
		
			productoEditado.name = name;
			productoEditado.price = price;
			productoEditado.category = category;
			productoEditado.description = description;
			productoEditado.discount = discount;
		


		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))


		res.redirect("/products/detail/" + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		products = products.filter(product=>product.id !== parseInt(req.params.id));

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		res.redirect("/products")
		 
	}
};

module.exports = controller;
