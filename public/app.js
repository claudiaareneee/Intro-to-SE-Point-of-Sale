'use strict';
console.log("test");

function addItemsByButton(){
    //TODO: implement this
}

function addItemsByText(receipt, itemId, name, price, quantity){
    if (receipt != null)
        receipt.addItem(new Item(itemId, name, price, quantity));
}

function createItemMenuView(item, receipt){
    var itemsContent = document.getElementById("items");
    var newItem = document.createElement("P");
    newItem.className = "itemFromMenu";
    newItem.innerHTML = item.name;

    newItem.addEventListener("click", function(){
        receipt.addItem(item);
        showShoppingCart(receipt);
    });

    itemsContent.appendChild(newItem);
}

function showShoppingCart(receipt) {
    var shoppingCart = document.getElementById("shoppingCart");
    console.log(receipt.items)
    shoppingCart.innerHTML = "";

    for (var item of receipt.items){
        var newItem = document.createElement("P");
        newItem.className = "itemFromReceipt";
        newItem.innerHTML = item.name;
        shoppingCart.appendChild(newItem);
    }
}

var items = [
    new Item(42, "Physics Book", 49.50, 1),
    new Item(4, "Pencil", 1.50, 1),
    new Item(54, "Sticky Notes", 3.50, 1),
    new Item(4, "Binder", 4.50, 1),
    new Item(4, "Calculator", 7.80, 1),
    new Item(4, "Eraser", 1.20, 1),
    new Item(23, "Notebook", 0.60, 1)
];

var receipt = new Receipt();
for(var item of items){
    createItemMenuView(item, receipt);
}



console.log(receipt);
console.log(receipt.calculateTotal())
console.log(receipt.calculateQuantity())


showShoppingCart(receipt);
