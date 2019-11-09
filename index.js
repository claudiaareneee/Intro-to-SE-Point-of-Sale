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
    newItem.className = "itemFromMenu noselect";
    newItem.innerHTML = item.name;

    newItem.addEventListener("click", function(){
        item.quantity += 1;
        receipt.addItem(item);
        showShoppingCart(receipt);
    });

    itemsContent.appendChild(newItem);
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

        newContainer.className = "itemFromReceipt noselect";
        newItemName.className = "itemFromReceiptText";
        newItemQuantity.className = "itemFromReceiptText lightText";
        
        // newDeleteButton.className = "itemFromReceiptDeleteButton"
        newDeleteButton.className="w3-red w3-btn w3-padding-small w3-round-xxlarge itemFromReceiptDeleteButton";
        newDeleteButton.innerHTML = "×";


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
