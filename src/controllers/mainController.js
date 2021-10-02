const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const finalPrice = (precio, descuento)=> Math.round(precio - (precio*(descuento/100)));

const controller = {
	index: (req, res) => {
		let productosEnOferta = products.filter(producto=>producto.category === "in-sale")
		let productosVistos = products.filter(producto=>producto.category === "visited")
		
		res.render("index", {productosEnOferta, productosVistos, toThousand, finalPrice})
	},
	search: (req, res) => {
		const search = req.query.keywords.trim()
		if(search !== ""){
			const resultado = products.filter(product=>product.name.toLowerCase().includes(search.toLowerCase()));
			res.render("results", {resultado, toThousand, finalPrice, search})
		}else{
			res.redirect("/")
		}
		
	},
};

module.exports = controller;
