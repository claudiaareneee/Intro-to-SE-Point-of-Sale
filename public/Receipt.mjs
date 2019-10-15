'use strict';

export class Receipt{
    constructor(transactionId, items){
        this.transactionId =  transactionId || 1;
        this.items = items || [{name:"name", price: 10.0, quantity: 3}];
    }
    
    // constructor(transactionId, paymentMethod, runningTotal, storeId,quantityTotal, time, date, items){
    //     this.transactionId =  transactionId || 1;
    //     this.paymentMethod = paymentMethod || 'credit';
    //     this.runningTotal = runningTotal || 3.00;
    //     this.storeId = storeId || 5;
    //     this.quantityTotal = quantityTotal || 5;
    //     this.time = time || "time";
    //     this.date = date || "string";
    //     this.items = items || [{name:"name", price: 10.0, quantity: 3}];
    // }

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
}