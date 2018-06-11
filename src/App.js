import React, { Component } from 'react';
import './App.css';

const AddedProductsDisplay = ({ products }) => {
	return (
		<ul>
			{products.map((product) => { return <li key={product.id}>{product.name} ({product.price})</li> })}
		</ul>
	);
}

const AllProductsEntry = ({ product, selectCallback }) => {
	return (
		<li>
			{product.name} ({product.price})
			<button onClick={selectCallback(product.id)}>Lisää</button>
		</li> 
	);
}

const AllProductsDisplay = ({ products, selectCallback }) => {
	return (
		<ul>
			{
				products.map((product) => {
					return <AllProductsEntry key={product.id} product={product} selectCallback={selectCallback} />
				})
			}
		</ul>
	);
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 1
		}

		this.state = {
			addedProducts: [],

			products: [
				{ id: 1, name: "Olut", price: 11 },
				{ id: 2, name: "Siideri", price: 13 },
				{ id: 3, name: "Lonkero", price: 13 }
			],

			newProduct: {name: '', price: 0}
		}

		this.latestId = 4;
	}

	selectProduct = (productId) => {
		return () => {
			const product = this.state.products.find( p => p.id === productId );
			const alreadyAdded = this.state.addedProducts.find( p => p.id === productId );
			console.log(alreadyAdded);
			
			let toAdd = {...product, amount: 1};
			if(alreadyAdded) toAdd = {...alreadyAdded, amount: alreadyAdded.amount + 1 };

			this.setState( { addedProducts: this.state.addedProducts.concat(toAdd) } );
		}
	}

	addProduct = (event) => {
		event.preventDefault();

		let price = parseInt(this.state.newProduct.price);
		if(!price) price = 0;

		this.setState( { newProduct: { name: '', price: 0 }, products: this.state.products.concat({ id: this.latestId++, name: this.state.newProduct.name, price: price }) } );
	}

	newProductChange = (event) => {
		const target = event.target;
		const n = target.name;
		const value = target.value;
		const np = { ...this.state.newProduct, [n]: value };

		this.setState({ newProduct: np });
	}

	

	render() {
		return (
			<div>
				<AddedProductsDisplay products={this.state.addedProducts} />
				<AllProductsDisplay products={this.state.products} selectCallback={this.selectProduct} />
				
				<form onSubmit={this.addProduct}>
					<input name="name" type="text" value={this.state.newProduct.name} onChange={this.newProductChange} />
					<input name="price" type="number" value={this.state.newProduct.price} onChange={this.newProductChange} />
					<button type="submit">Lisää</button>
				</form>
			</div>
		);
	}
}

export default App;
