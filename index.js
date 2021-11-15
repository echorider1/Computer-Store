const balance = 1000;
const cart = [];
const products = [
	{ id: 'item1', title: 'Really great computer    $350', price: 350 },
    { id: 'item2', title: 'Super computer   $550', price: 550 },
    { id: 'item3', title: 'Awesome computer (with LED´s)    $290', price: 290 }
];

const removeButtons = [...document.querySelectorAll('.product-rem')];
const addButtons = [...document.querySelectorAll('.product-add')];

const productsEl = document.querySelector('#products');
const balanceEl = document.querySelector('#balance');
const cartEl = document.querySelector('#cart');

const getBalance = () => {
	return cart.reduce((acc, item) => {
  	return acc - item.price;
  }, balance);
};

const removeFromCart = (productId) => {
	const productIndex = cart.findIndex(item => item.id === productId);
  
  if (productIndex !== -1) {
	  cart.splice(productIndex, 1);
  	updateDOM();
  }
};

const addToCart = (productId) => {
	const product = products.find(product => product.id === productId);
  const balance = getBalance();
  const remainingBalance = product ? balance - product.price : balance;
  
  if (product && remainingBalance > 0) {
  	cart.push(product);
  	updateDOM();
  }
};

const initDOM = () => {
	const fragment = new DocumentFragment();

	// Make and append products
	products.map(product => {
  	const item = document.createElement('li');
    const title = document.createElement('h3');
    const removeButton = document.createElement('button');
    const addButton = document.createElement('button');

    title.innerText = product.title;
		removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(product.id));
    addButton.innerText = 'Add';
    addButton.addEventListener('click', () => addToCart(product.id));
    item.appendChild(title);
    item.appendChild(removeButton);
    item.appendChild(addButton);
    fragment.appendChild(item);
  });

	// Append products to DOM
  productsEl.appendChild(fragment);
};

const updateDOM = () => {
	// Reset cart content
  cartEl.innerText = cart.length ? '' : 'No items';

	// Add elements to cart
  cart.map(item => {
  	const el = document.createElement('li');
    el.innerHTML = item.title;
    cartEl.appendChild(el);
  });

	// Update balance text
	balanceEl.innerText = getBalance();
};

initDOM();
updateDOM();