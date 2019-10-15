'use strict';
console.log("test");

import {Receipt} from '/public/receipt.mjs';
import {Item} from '/public/item.mjs';

console.log("test2");

var itemBook = new Item(42, "Physics Book", 49.50, 1);
console.log(itemBook);

var itemPencil = new Item(3, "Pencil", 1.50, 3);
var itemStickyNotes = new Item(54, "Sticky Notes", 3.50, 5);

var receipt = new Receipt(2, [itemBook, itemPencil, itemStickyNotes]);
console.log(receipt);

console.log(receipt.calculateTotal())
