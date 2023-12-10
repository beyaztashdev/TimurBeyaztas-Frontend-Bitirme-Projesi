const shopping_cart = document.getElementById('shopping_cart')
const productCartQuantity = document.getElementById('countItem')
const totalAmount = document.getElementById('total_amount')
let shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []

let calculation = () => {
	productCartQuantity.innerHTML = shoppingCart.length
}
calculation()

const loadData = async () => {
	const response = await fetch('./js/data.json')
	const data = await response.json()
	generateShoppingCart(data)
}
loadData()

const generateShoppingCart = products => {
	shopping_cart.innerHTML = products
		.map(product => {
			const { img, desc, name, id, price } = product
			return `<div class="card" style="width: 18rem;">
              <img src="${img}" class="card-img-top" alt="${name}">
              <div class="card-body">
                <div class="text-center">
                  <h5 class="card-title text-warning">${price}</h5>
                  <p class="card-text text-secondary">${name}</p>
                  <button onClick="addToCart(${id})" class="btn btn-light border-black text-secondary-emphasis">Add to Card</button>
                </div>
              </div>
            </div>`
		})
		.join("")
}

const addToCart = id => {
	const exitProduct = shoppingCart.find(product => product.id === id)
	if (exitProduct) {
		alert('Already you added this product')
		return
	}

	const cart = {
		id: id,
		item: 1,
	}

	shoppingCart = [...shoppingCart, cart]
	localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart))
	calculation()
	alert('Added succesfully')
}

