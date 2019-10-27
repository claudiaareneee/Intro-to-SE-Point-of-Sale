'use strict';

class Item{
    constructor(itemId, name, price, quantity){
        this.itemId = itemId;
        this.name = name || 0.0;
        this.price = price || 0.0;
        this.quantity = quantity || 0;
    }
}

class Search{
    constructor(){
        this.transactionId = null
        this.time = ""
        this.date = ""
    }

    searchByDate(date){
        //TODO: implement this
    }

    searchByTransactionId(transactionId){
        //TODO: implement this
    }
}

class Receipt{
    generateTransactionId(){
        //TODO: Check against database
        return Math.floor(Math.random() * 1000000);
    }

    constructor(items, storeId, time, date, paymentMethod){
        this.transactionId =  this.generateTransactionId();
        this.items = items || [];
        this.storeId = storeId || 5;
        this.time = time || "time";
        this.date = date || "string";
        this.paymentMethod = paymentMethod || 'cash';
    }

    calculateTotal(){
        var total = 0.0;
        for (const item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                const element = this.items[item];
                
                if (element.hasOwnProperty('price') && element.hasOwnProperty('quantity')){
                    total += (element.price * element.quantity);
                }
            }
        }
        return total;
    }

    calculateQuantity(){
        var quantity = 0.0;
        for (const item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                const element = this.items[item];
                
                if (element.hasOwnProperty('quantity')){
                    quantity += element.quantity;
                }
            }
        }
        return quantity;
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(itemIndex){
        this.items.splice(itemIndex,1);
    }

    setPaymentMethod(paymentMethodString){
        this.paymentMethod = paymentMethodString;
    }

    getPaymentMethod(paymentMethodString){
        return this.paymentMethod;
    }

    confirmCheckout(){
        //TODO: send receipt to database
    }
}