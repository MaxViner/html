document.addEventListener('DOMContentLoaded', function() {
    const cartItems = []; 
    const cards = document.querySelectorAll('.FEATURES__list__card');
    let cartTitle = document.getElementById('cart-title')
    cards.forEach(card => {
        const button = card.querySelector('button');
        const cardImg = card.querySelector('.FEATURES_list__card__img');
        const cardName = card.querySelector('.FEATURES__list__card__text__name');
        const cardPrice = card.querySelector('.FEATURES__list__card__text__price');
        const cardId = card.id;
      
        button.addEventListener('click', function() {
            let item = cartItems.find(item => item.id === cardId);
            
            if (item) {
                item.quantity++;
            } else {
                cartItems.push({ id: cardId, name: cardName.textContent, price: cardPrice.textContent, quantity: 1 });
            }
            
            renderCartItems();
        });
    });
    
    function renderCartItems() {
        if (cartItems.length === 0 && cartTitle) {
            cartTitle.classList.add('hidden');
        } else if (cartTitle) {
            cartTitle.classList.remove('hidden');
        }
        const cartList = document.querySelector('.cart-list');
        cartList.innerHTML = ''; 
        
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-List-item');
            listItem.innerHTML = `
                <div class="List-item-img">
                    <img src="../assets/img/featyre/${item.id}.png" alt="">
                </div>
                <div class="List-item-data">
                    <h2>${item.name}</h2>
                    <h3>Price <span>${item.price}</span></h3>
                    <p>Color: Red</p>
                    <p>Size: Xl</p>
                    <p>Quantity: <span>${item.quantity}</span></p>
                    <img src="../assets/img/cart/close.svg" alt="item" class="List-item-close" data-id="${item.id}">
                </div>
            `;
            cartList.appendChild(listItem);
        });
        
        const closeButtons = document.querySelectorAll('.List-item-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = button.getAttribute('data-id');
                const itemIndex = cartItems.findIndex(item => item.id === itemId);
                
                if (itemIndex !== -1) {
                    cartItems[itemIndex].quantity--;
                    if (cartItems[itemIndex].quantity === 0) {
                        cartItems.splice(itemIndex, 1);
                    }
                    renderCartItems();
                }
            });
        });
    }
});