'use strict';

export class Receipt{
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