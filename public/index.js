'use strict';
console.log("test");

// Add items by test allows a user to add an item that is not in the menu
function addItemsByText(receipt, itemId, name, price, quantity){
    if (receipt != null)
        receipt.addItem(new Item(itemId, name, price, quantity));
}

// This creates the html for an individual item in the menu: ex: creating a Pencil item
function createItemMenuView(item, receipt){

    // Creating elements
    var itemsContent = document.getElementById("items");
    var newItemContainer = document.createElement("DIV");
    var newItem = document.createElement("DIV");
    var itemName = document.createElement("H5");
    var itemBody = document.createElement("DIV");
    var itemPrice = document.createElement("P");
    var addItemButton = document.createElement("BUTTON");
    var addItemIcon = document.createElement("I");
    
    // Styling elements
    newItemContainer.className = "w-25 itemCard";
    newItem.className = "card";
    itemName.className = "card-title";
    itemBody.className = "card-body";
    itemPrice.className = "card-text";
    addItemButton.className = "btn btn-primary float-right";
    addItemIcon.className = "fa fa-cart-plus";

    // Giving values to elements
    itemName.innerHTML = item.name;
    itemPrice.innerHTML = "Price: $" + item.price;

    // Adding an onClick listener
    addItemButton.addEventListener("click", function(){
        item.quantity += 1;
        receipt.addItem(item);
        showShoppingCart(receipt);
    });

    // Adding each element to the html
    addItemButton.appendChild(addItemIcon);
    itemBody.appendChild(itemName);
    itemBody.appendChild(itemPrice);
    itemBody.appendChild(addItemButton);
    newItem.appendChild(itemBody);
    newItemContainer.appendChild(newItem);
    itemsContent.appendChild(newItemContainer);
}

// This creates the html to show each item in the shopping cart. It takes in a receipt which contains items
function showShoppingCart(receipt) {
    var shoppingCart = document.getElementById("shoppingCart");
    console.log(receipt.items)
    shoppingCart.innerHTML = "";

    for (let key of Object.keys(receipt.items)){
        // Creating elements
        var newContainer = document.createElement("DIV");
        var newItemName = document.createElement("P");
        var newDeleteButton = document.createElement("BUTTON");
        var newItemQuantity = document.createElement("P");
        var deleteIcon = document.createElement("I");

        // Styling elements
        newContainer.className = "itemFromReceipt noselect";
        newItemName.className = "itemFromReceiptText";
        newItemQuantity.className = "itemFromReceiptText lightText";
        deleteIcon.className = "fa fa-times";
        newDeleteButton.className="btn btn-danger itemFromReceiptDeleteButton";

        newDeleteButton.addEventListener("click", function(){
            if (receipt.items[key].quantity > 1){
                receipt.items[key].quantity -= 1;
            } else {
                receipt.removeItem(receipt.items[key]);
            }
            showShoppingCart(receipt);
        })

        // Giving values to elements
        newItemName.innerHTML = receipt.items[key].name;
        newItemQuantity.innerHTML = "Quantity: " + receipt.items[key].quantity;
        //someone style this
        //TODO: Fix this -- can't get number of items in shopping cart
        console.log(receipt.items.quantity);
        if (receipt.items.quantity != 0){
            var total = document.getElementById("total").innerHTML = "$" + receipt.calculateTotal();
        }
        else{
            var total = document.getElementById("total").innerHTML = "";
        }


        // Adding each element to the html
        newDeleteButton.appendChild(deleteIcon);
        newContainer.appendChild(newItemName);
        newContainer.appendChild(newDeleteButton);
        newContainer.appendChild(newItemQuantity);
        shoppingCart.appendChild(newContainer);
    }
}

// Getting blockchain from database
var blockchain = new Blockchain();
getBlocks(blockchain, () => {console.log(blockchain.blocks)});

// Creating menu items
var items = [
    new Item(0, "Physics Book", 49.50, 0),
    new Item(1, "Pencil", 1.50, 0),
    new Item(2, "Sticky Notes", 3.50, 0),
    new Item(3, "Binder", 4.50, 0),
    new Item(4, "Calculator", 7.80, 0),
    new Item(5, "Eraser", 1.20, 0),
    new Item(6, "Notebook", 0.60, 0)
];

// Creating a receipt to store user data
var receipt = new Receipt();

// Adding items to the menu
for(var item of items){
    createItemMenuView(item, receipt);
}

// New item by text and on click listener
var newItemButton = document.getElementById("addItemByTextButton");
newItemButton.addEventListener("click", function(){
    // Getting the values from the form
    var quantity = document.getElementById("itemByTextQuantity").value;
    var name = document.getElementById("itemByTextName").value;
    var price = document.getElementById("itemByTextPrice").value;

    // Creating an item for the 
    var item = new Item(items.length + 1, name, parseFloat(price), 0.0);
    // var itemForList = new Item(items.length + 1, name, parseFloat(price), 0.0);

    // createItemMenuView(itemForList, receipt);
    
    // items.push(itemForList);
    item.quantity = parseFloat(quantity);
    receipt.addItem(item);
    showShoppingCart(receipt);
});

// Complete transaction and on click listener
var completeTransactionButton = document.getElementById("completeTransactionButton");
completeTransactionButton.addEventListener("click", () => {
    console.log("writing block");
    writeBlock(blockchain.generateNextBlock(receipt));
    getBlocks(blockchain, () => {console.log(blockchain.blocks)})
});

console.log(receipt);
console.log(receipt.calculateTotal());
console.log(receipt.calculateQuantity());

showShoppingCart(receipt);