function createTableHeader(itemHeader){
    var itemsTableHeaderContainer = document.createElement("THEAD").appendChild(document.createElement("TR"));
    for (var key of itemHeader){
        console.log("key" + key)
        var itemsTableHeaderName = document.createElement("TH");
        itemsTableHeaderName.setAttribute("scope", "col");
        itemsTableHeaderName.className = "w-25";
        itemsTableHeaderName.innerText = key;
        itemsTableHeaderContainer.appendChild(itemsTableHeaderName);
    }
    return itemsTableHeaderContainer;
}

function createTableRow(item){
    var rowContainer = document.createElement("TBODY").appendChild(document.createElement("TR"));

    var itemQuantity = document.createElement("TD");
    itemQuantity.setAttribute("scope", "col");
    itemQuantity.innerText = item.quantity;

    var itemName = document.createElement("TD");
    itemName.setAttribute("scope", "col");
    itemName.innerText = item.name;

    var itemPrice = document.createElement("TD");
    itemPrice.setAttribute("scope", "col");
    itemPrice.innerText = "$" + item.price;

    var itemTotal = document.createElement("TD");
    itemTotal.setAttribute("scope", "col");
    itemTotal.innerText = parseFloat(item.price) * parseFloat(item.quantity);
    
    rowContainer.appendChild(itemQuantity);
    rowContainer.appendChild(itemName);
    rowContainer.appendChild(itemPrice);
    rowContainer.appendChild(itemTotal);
    return rowContainer;
}

function viewReceipt(block){
    var blockCard = document.createElement("DIV");
    var transactionID = document.createElement("H5");
    var cardBody = document.createElement("DIV");
    var date = document.createElement("P");
    var paymentMethod = document.createElement("P");
    var storeId = document.createElement("P");
    var itemsLabel = document.createElement("H5");
    var itemsTable = document.createElement("TABLE");

    blockCard.className = "card w-100";
    transactionID.className = "card-header";
    cardBody.className = "card-body";
    date.className = "card-text";
    paymentMethod.className = "card-text";
    storeId.className = "card-text";
    itemsLabel.className = "card-text";
    itemsTable.className = "w-100";
    
    transactionID.innerHTML = "Transaction #" + block.receiptData.transactionId;
    date.innerHTML = "Date of sale: " + block.receiptData.date + " " + block.receiptData.time;
    paymentMethod.innerHTML = "Payment method: " + block.receiptData.paymentMethod;
    storeId.innerHTML = "Store ID: " + block.receiptData.storeId;
    itemsLabel.innerHTML = "Items:"

    if (block.receiptData.items != null && block.receiptData.items != undefined){
        itemsTable.appendChild(createTableHeader(["Quantity", "Name", "Price", "Total"]));
        for(var key in block.receiptData.items){
            console.log(key);
            var item = block.receiptData.items[key];
            itemsTable.appendChild(createTableRow(item)); 
        }
    }

    cardBody.appendChild(date);
    cardBody.appendChild(paymentMethod);
    cardBody.appendChild(storeId);
    cardBody.appendChild(itemsLabel);
    cardBody.appendChild(itemsTable);
    blockCard.appendChild(transactionID);
    blockCard.appendChild(cardBody);
    return blockCard;
}

function displayBlocks(blocks){
    var blockContainer = document.getElementById("mainContent");
    console.log(blocks);
    for (var block of blocks) {
        blockContainer.appendChild(viewReceipt(block));
    }
}

var blockchain = new Blockchain();
getBlocks(blockchain, () => {
    blockchain.blocks.shift();
    displayBlocks(blockchain.blocks)
});

displayBlocks(blockchain.blocks);