'use strict';
console.log("test");

function addItemsByButton(){
    //TODO: implement this
}

function addItemsByText(receipt, itemId, name, price, quantity){
    if (receipt != null)
        receipt.addItem(new Item(itemId, name, price, quantity));
}

console.log("test2");

var itemBook = new Item(42, "Physics Book", 49.50, 1);
console.log(itemBook);

var itemPencil = new Item(4, "Pencil", 1.50, 3);
var itemStickyNotes = new Item(54, "Sticky Notes", 3.50, 5);

var receipt = new Receipt([itemBook, itemPencil, itemStickyNotes]);
console.log(receipt);

console.log(receipt.calculateTotal())
console.log(receipt.calculateQuantity())

receipt.addItem(new Item(23, "Notebook", 0.60, 2));
console.log(receipt);
