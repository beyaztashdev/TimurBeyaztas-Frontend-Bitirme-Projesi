const shopping_cart = document.getElementById('shopping_cart')
const productCartQuantity = document.getElementById('countItem')
const totalAmount = document.getElementById('total_amount')
let shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []

let calculation = () => {
	productCartQuantity.innerHTML = shoppingCart.length
}

const loadData = async () => {
	const response = await fetch('js/data.json')
	const data = await response.json()
	generateCartItems(data)
	totalMoney(data)
	calculation()
}
loadData()

const generateCartItems = products => {
	if (shoppingCart.length !== 0) {
		return (shopping_cart.innerHTML = shoppingCart
			.sort((a, b) => a.id - b.id)
			.map(cart => {
				const { id, item } = cart
				const myCart = products.find(product => product.id === id)

				return `
          <div class="row bg-orange ps-3 pt-3 border border-black">
            <div class="col-lg-6 col-sm-5">
              <p>Item</p>
            </div>

            <div class="col-1">
              <p>Price</p>
            </div>

            <div class="col-lg-2 col-sm-4 text-center">
              <p>Quantity</p>
            </div>

            <div class="col-lg-3 col-sm-2">
              <p>Total</p>
            </div>

          </div>

          <!-- !PRODUCT LIST CART -->
          <div class="row flex-wrap my-2 ps-3 border border-light-subtle align-items-center justify-content-center">
            <div class="col-2">
              <img src="${myCart?.img}" alt="" class="w-50">
            </div>

            <div class="col-lg-4 col-sm-2">
              <p class="">${myCart?.name}</p>
            </div>

            <div class="col-lg-1 col-sm-2">
              <p class="text-secondary">$ ${myCart?.price}</p>
            </div>

            <div class="col-2 text-secondary d-flex align-items-center justify-content-center gap-2">
              <i onclick="decrement(${id})" class="fa-solid fa-minus btn btn-light border-black"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="fa-solid fa-plus btn btn-light border-black"></i>
            </div>

            <div class="col-2">
              <p>$ ${item * myCart?.price}</p>
            </div>

            <div class="col-1">
              <button class="btn btn-danger" onClick= "removeCart(${id})">Remove</button>
            </div>

          </div>
        `
			})
			.join(''))
	} else {
		shopping_cart.innerHTML = ``
		label.innerHTML = `
      <h2 class="text-secondary-emphasis">Cart is Empty</h2>
      <a href="./index.html">
        <button class="btn btn-light border-black">Back to home</button>
      </a>
    `
	}
}

const removeCart = id => {
	const agree = confirm('Are you to remove this cart')
	if (agree) {
		shoppingCart = shoppingCart.filter(x => x.id !== id)
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart))
		loadData()
	}
}

const increment = id => {
	let exitProduct = shoppingCart.find(cart => cart.id === id)

	if (exitProduct) {
		exitProduct.item = exitProduct.item + 1
	}

	const filteredCart = shoppingCart.filter(cart => cart.id !== id)
	const newCart = [...filteredCart, exitProduct]
	update(id)
	loadData()
	localStorage.setItem('shopping_cart', JSON.stringify(newCart))
}
const decrement = id => {
	let exitProduct = shoppingCart.find(cart => cart.id === id)

	if (exitProduct && exitProduct.item < 1) {
		return
	} else {
		exitProduct.item = exitProduct.item - 1
	}

	const filteredCart = shoppingCart.filter(cart => cart.id !== id)
	const newCart = [...filteredCart, exitProduct]
	update(id)
	loadData()
	localStorage.setItem('shopping_cart', JSON.stringify(newCart))
}

const update = id => {
	const search = shoppingCart.find(x => x.id === id)
	document.getElementById(id).innerHTML = search.item
}

const totalMoney = products => {
	if (shoppingCart.length !== 0) {
		let amount = shoppingCart
			.map(x => {
				let { item, id } = x
				let search = products.find(y => y.id === id) || []

				return item * search.price
			})
			.reduce((x, y) => x + y, 0)

		label.innerHTML = `
    <h2 class="text-secondary-emphasis">Total Bill: $ ${amount}</h2>
    <div class="mb-3">
      <button class="btn btn-light border-black">Checkout</button>
      <button onclick="clearCart()" class="btn btn-light border-black">Clear Cart</button>
    </div>
    `
	} else return
}

const clearCart = () => {
	const agree = confirm('Are you sure to clear all cart')
	if (agree) {
		shoppingCart = []
		loadData()

		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart))
	}
}
