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
    var newItemContainer = document.createElement("DIV");
    var newItem = document.createElement("DIV");
    var itemName = document.createElement("H5");
    var itemBody = document.createElement("DIV");
    var itemPrice = document.createElement("P");
    var addItemButton = document.createElement("BUTTON");
    var addItemIcon = document.createElement("I");
    
    // newItemContainer.className = "col col-md-4 col-sm-1 col-lg-3 itemCard";
    newItemContainer.className = "w-25 itemCard";
    newItem.className = "card";
    itemName.className = "card-title";
    itemBody.className = "card-body";
    itemPrice.className = "card-text";
    addItemButton.className = "btn btn-primary float-right";
    addItemIcon.className = "fa fa-cart-plus";

    itemName.innerHTML = item.name;
    itemPrice.innerHTML = "Price: $" + item.price;

    addItemButton.addEventListener("click", function(){
        item.quantity += 1;
        receipt.addItem(item);
        showShoppingCart(receipt);
    });

    addItemButton.appendChild(addItemIcon);
    itemBody.appendChild(itemName);
    itemBody.appendChild(itemPrice);
    itemBody.appendChild(addItemButton);
    newItem.appendChild(itemBody);
    newItemContainer.appendChild(newItem);
    itemsContent.appendChild(newItemContainer);
}

function showShoppingCart(receipt) {
    var shoppingCart = document.getElementById("shoppingCart");
    console.log(receipt.items)
    shoppingCart.innerHTML = "";

    for (let key of Object.keys(receipt.items)){
        var newContainer = document.createElement("DIV");
        var newItemName = document.createElement("P");
        var newDeleteButton = document.createElement("BUTTON");
        var newItemQuantity = document.createElement("P");
        var deleteIcon = document.createElement("I");

        newContainer.className = "itemFromReceipt noselect";
        newItemName.className = "itemFromReceiptText";
        newItemQuantity.className = "itemFromReceiptText lightText";
        deleteIcon.className = "fa fa-times";
        
        // newDeleteButton.className = "itemFromReceiptDeleteButton"
        newDeleteButton.className="btn btn-danger itemFromReceiptDeleteButton";
        newDeleteButton.appendChild(deleteIcon);


        //TODO: Fix this -- it's not deleting correctly
        newDeleteButton.addEventListener("click", function(){
            if (receipt.items[key].quantity > 1){
                receipt.items[key].quantity -= 1;
            } else {
                receipt.removeItem(receipt.items[key]);
            }
            showShoppingCart(receipt);
        })

    
        newItemName.innerHTML = receipt.items[key].name;
        newItemQuantity.innerHTML = "Quantity: " + receipt.items[key].quantity;

        newContainer.appendChild(newItemName);
        newContainer.appendChild(newDeleteButton);
        newContainer.appendChild(newItemQuantity);
        shoppingCart.appendChild(newContainer);
    }
}

var items = [
    new Item(42, "Physics Book", 49.50, 0),
    new Item(4, "Pencil", 1.50, 0),
    new Item(54, "Sticky Notes", 3.50, 0),
    new Item(4, "Binder", 4.50, 0),
    new Item(4, "Calculator", 7.80, 0),
    new Item(4, "Eraser", 1.20, 0),
    new Item(23, "Notebook", 0.60, 0)
];

var receipt = new Receipt();
for(var item of items){
    createItemMenuView(item, receipt);
}


console.log(receipt);
console.log(receipt.calculateTotal())
console.log(receipt.calculateQuantity())


showShoppingCart(receipt);
