let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=producte-id-${id} class=" border-2 border-black rounded">
            <img width="100%" src=${img} alt="Clothes">
            <div class="flex flex-col p-2 gap-1">
                <h3 class="font-bold">${name}</h3>
                <p>${desc}</p>
                <div class="flex justify-between place-item-center">
                    <h2 class="font-bold">$ ${price}</h2>
                    <div class="flex gap-3 text-12">
                        <i onClick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id =${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onClick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>
                </div>
            </div>
        </div>
`
    }).join(""));
};


generateShop();

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
    //console.log(basket);
   

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation()