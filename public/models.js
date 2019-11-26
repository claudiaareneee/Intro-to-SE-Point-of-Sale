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
    
    searchByDate(date){
        let input = document.getElementById('searchBar').value 
		
		
        input=input.toLowerCase(); 
		
        let x = document.getElementsByClassName('item'); 

        for (i = 0; i < x.length; i++) {  
            if (!x[i].innerHTML.toLowerCase().includes(input)) { 
                x[i].style.display="none"; 
            } 
            else { 
                x[i].style.display="list-item";                  
            } 
        } 
    }

    searchByTransactionId(transactionId){
        let input = document.getElementById('searchBar').value 
        input=input.toLowerCase(); 
        let x = document.getElementsByClassName('item'); 

        for (i = 0; i < x.length; i++) {  
            if (!x[i].innerHTML.toLowerCase().includes(input)) { 
                x[i].style.display="none"; 
            } 
            else { 
                x[i].style.display="list-item";                  
            } 
        } 
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
        this.calculateTotal();
    }

    calculateTotal(){
        var total = 0.0;
        for (const item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                const element = this.items[item];
                
                if (element.hasOwnProperty('price') && element.hasOwnProperty('quantity')){
                    total += parseFloat((element.price * element.quantity).toFixed(2));
                }
            }
        }
        this.total = total;
        return total;
    }

    calculateQuantity(){
        var quantity = 0;
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
        this.items[item.name] = item;
    }

    removeItem(item){
        // this.items.splice(itemIndex,1);
        console.log(item.name);
        delete this.items[item.name];
    }

    setPaymentMethod(paymentMethodString){
        this.paymentMethod = paymentMethodString;
    }

    getPaymentMethod(paymentMethodString){
        return this.paymentMethod;
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
    constructor(blocks){
        this.blocks = blocks || [];
    }

    getLastBlock(){
        if(this.blocks.length < 1)
            return new Block(0, "0", 1465154705, new Receipt(), "816534932c2b7234987da6afc367695e4234db8a921823784c14378abed4f7d7");
        else
            return this.blocks[this.blocks.length - 1];
    }

    calculateHashValue(index, prevHash, timestamp, receiptData){
        return CryptoJS.SHA256(index + prevHash + timestamp + receiptData).toString();
    }

    getFirstBlock(){
        return new Block(0, "0", 1465154705, new Receipt(), "816534932c2b7234987da6afc367695e4234db8a921823784c14378abed4f7d7");
    }

    generateNextBlock(blockData){
        var prevBlock = this.getLastBlock();
        var nextIndex = prevBlock.index + 1;
        var date = new Date();
        blockData.date = (date.getMonth() + 1).toString() + "/" + date.getDate() + "/" + date.getFullYear();
        blockData.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var nextTimestamp = date / 1000;
        var nextHash = this.calculateHashValue(nextIndex, prevBlock.hash, nextTimestamp, blockData);
        return new Block(nextIndex, prevBlock.hash, nextTimestamp, blockData, nextHash);
    }
}

function writeBlock(block){
    firebase.database().ref('/blocks/' + block.index).set({
        index: block.index,
        previousHash: block.previousHash,
        timestamp: block.timestamp,
        receiptData: block.receiptData,
        hash: block.hash
    });
}

function getBlocks(blockchain, onPromiseFulfilled){
    return firebase.database().ref('/blocks/').once('value').then(function(snapshot) {
        blockchain.blocks = snapshot.val();
        onPromiseFulfilled();
    });
}
