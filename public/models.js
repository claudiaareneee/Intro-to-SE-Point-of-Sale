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
        this.items = items || {};
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
        // this.items.push(item);
        this.items[item.name] = item
    }

    removeItem(item){
        // this.items.splice(itemIndex,1);
        console.log(item.name)
        delete this.items[item.name];
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

class Block{
    constructor(index, previousHash, timestamp, receiptData, hash){
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.receiptData = receiptData;
        this.hash = hash.toString();
    }
}

class Blockchain{
    calculateHash(index, previousHash, timestamp, receiptData){
        return CryptoJS.SHA256(index + previousHash + timestamp + receiptData).toString();
    }

    getGenesisBlock(){
        return new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
    }

    generateNextBlock(blockData){
        var previousBlock = getLatestBlock();
        var nextIndex = previousBlock.index + 1;
        var nextTimestamp = new Date().getTime() / 1000;
        var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
        return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
    }

    isValidNewBlock (newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previoushash');
            return false;
        } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
            console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return false;
        }
        return true;
    }
}