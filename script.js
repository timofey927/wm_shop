const BASE_URL = "https://my-json-server.typicode.com/timofey927/wm_shop"
let main = document.querySelector("main")
let products = []

function getProducts(){
    fetch(BASE_URL + "/products")
    .then(async (res)=>{
        let data = await res.json()
        console.log(data)
        products = data
        drawProducts()
        drawCart()
    })
}

getProducts()

let cartArray = []


function drawProducts(){
    main.innerHTML = ""
    products.forEach(p=>{
        main.innerHTML += `
        <div class="product">
        <h3>${p.name}</h3>
        <h4>$${p.price}</h4>
        <a href="/seller.html?user_id=${p.user_id}">Seller page</a>
        <button onclick="addProductToCart(${p.id})">Buy</button>
        </div>
        `
    })
}

let cartButton = document.getElementById("cart")
let cart = document.querySelector(".cart")

let cartIsOpen = false
cartButton.addEventListener("click", function(){
    cartIsOpen = !cartIsOpen
    cart.style.display =cartIsOpen? "flex" : "none"
})

function addProductToCart(product_id){
    console.log(product_id)
    cartArray.push(product_id)
    localStorage.setItem("cart", JSON.stringify(cartArray))
    drawCart()
}

function drawCart(){
    if (cartArray.length == 0) {
        cart.innerHTML = "nothing"
        return
    }
    let cartProducts = products.filter(p=>cartArray.indexOf(p.id) > -1)
    cartProducts = cartProducts.map(p => ({
        ...p,
        count: cartArray.filter(prod=>prod == p.id).length
    }))
    console.log(cartProducts)
    cart.innerHTML = cartProducts.map(p=>`<li>${p.name} | $${p.price} | X${p.count}</li>`).join("")
    let total = 0
    cartProducts.forEach(p=>total += p.count * p.price)
    cart.innerHTML += `<p>summ: ${total}</p>`
    cart.innerHTML += "<button onclick='clearCart()'>Delete👶🏿</button>"
}

function clearCart(){
    cartArray.length = 0
    localStorage.setItem("cart", "[]")
    drawCart();
}

cartArray = JSON.parse(localStorage.getItem("cart")) || []
drawCart()