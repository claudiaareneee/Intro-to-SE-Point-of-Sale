"use strict";

export class Item{
    constructor(itemId, name, price, quantity){
        this.itemId = itemId;
        this.name = name || 0.0;
        this.price = price || 0.0;
        this.quantity = quantity || 0;
    }
}