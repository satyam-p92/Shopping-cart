let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket.map((x) => {

            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
        <div class="border-2 border-red-500 border-solid rounded-md flex">
            <img width="100" src=${search.img} /> &nbsp; &nbsp;
            <div class="details">
            <div class="flex items-center justify-between mt-2 w-48">
                <h4 class="flex gap-2">
                    <p class="font-bold">${search.name}</p>
                    <p class="bg-black text-white rounded px-0.5 py-0.5">$ ${search.price}</p>
                </h4>
                <i onClick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <div class="flex gap-3 text-12">
                 <i onClick="increment(${id})" class="bi bi-plus-lg"></i>
                 <div id =${id} class="quantity">${item}</div>
                 <i onClick="decrement(${id})" class="bi bi-dash-lg"></i>
            </div>

            <h3 class="font-bold">$ ${item * search.price}</h3>  
            </div>
        </div>
        `;
        }).join(""));

    } else {
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2 class="font-bold">Cart is Empty</h2>
        <a href="index.html">
            <button class="bg-black text-white border-none p-2 rounded-md cursor-pointer mt-5">Back To Home</button>
        </a>
        `;
    }
};
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    
    //console.log(basket);
    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0)
        return;
    else {
        search.item -= 1;
    }
    
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !==0);
    generateCartItems();
   
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id)=>{
    let selectedItem = id;
    basket = basket.filter((x) =>x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let ClearCart = ()=> {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y)=>x + y, 0);
        label.innerHTML = `
        <h2 class="font-bold">Total Bill : $ ${amount}</h2>
        <button class="bg-green-500 text-white border-none p-2 rounded-md cursor-pointer mt-5">Checkout</button>
        <button onClick="ClearCart()" class="bg-red-500 text-white border-none p-2 rounded-md cursor-pointer mt-5">Clear Cart</button>
        `;
    } else return
};

TotalAmount();