function createTableRow(item){
    var rowContainer = document.createElement("TBODY").appendChild(document.createElement("TR"));

    var itemName = document.createElement("TD");
    itemName.setAttribute("scope", "col");
    itemName.innerText = item.name;

    var itemPrice = document.createElement("TD");
    itemPrice.setAttribute("scope", "col");
    itemPrice.innerText = "$" + item.price;

    var itemQuantity = document.createElement("TD");
    itemQuantity.setAttribute("scope", "col");
    itemQuantity.innerText = item.quantity;

    var itemTotal = document.createElement("TD");
    itemTotal.setAttribute("scope", "col");
    itemTotal.innerText = parseFloat(item.price) * parseFloat(item.quantity);
    
    rowContainer.appendChild(itemName);
    rowContainer.appendChild(itemPrice);
    rowContainer.appendChild(itemQuantity);
    rowContainer.appendChild(itemTotal);
    return rowContainer;
}

function viewReceipt(block){
    var blockCard = document.createElement("DIV");
    var transactionID = document.createElement("H5");
    var cardBody = document.createElement("DIV");
    var date = document.createElement("P");
    var time = document.createElement("P");
    var paymentMethod = document.createElement("P");
    var storeId = document.createElement("P");
    // var itemList = document.createElement("UL");
    var itemsTable = document.createElement("TABLE");

    blockCard.className = "card w-100";
    transactionID.className = "card-header";
    cardBody.className = "card-body";
    date.className = "card-text";
    time.className = "card-text";
    paymentMethod.className = "card-text";
    storeId.className = "card-text";
    itemsTable.className = "w-100";
    // itemList.className = "list-group list-group-flush";
    
    transactionID.innerHTML = block.receiptData.transactionId;
    date.innerHTML = block.receiptData.date;
    time.innerHTML = block.receiptData.time;
    paymentMethod.innerHTML = block.receiptData.paymentMethod;
    storeId.innerHTML = block.receiptData.storeId;

    if (block.receiptData.items != null && block.receiptData.items != undefined){
        var itemsTableHeaderContainer = document.createElement("THEAD").appendChild(document.createElement("TR"));

        var itemsTableHeaderName = document.createElement("TH");
        itemsTableHeaderName.setAttribute("scope", "col");
        itemsTableHeaderName.innerText = "Name";

        var itemsTableHeaderPrice = document.createElement("TH");
        itemsTableHeaderPrice.setAttribute("scope", "col");
        itemsTableHeaderPrice.innerText = "Price";

        var itemsTableHeaderQuantity = document.createElement("TH");
        itemsTableHeaderQuantity.setAttribute("scope", "col");
        itemsTableHeaderQuantity.innerText = "Quantity";

        var itemsTableHeaderTotal = document.createElement("TH");
        itemsTableHeaderTotal.setAttribute("scope", "col");
        itemsTableHeaderTotal.innerText = "Total";
        
        itemsTableHeaderContainer.appendChild(itemsTableHeaderName);
        itemsTableHeaderContainer.appendChild(itemsTableHeaderPrice);
        itemsTableHeaderContainer.appendChild(itemsTableHeaderQuantity);
        itemsTableHeaderContainer.appendChild(itemsTableHeaderTotal);
        itemsTable.appendChild(itemsTableHeaderContainer);


        for(var key in block.receiptData.items){
            console.log(key);
            var item = block.receiptData.items[key];
            itemsTable.appendChild(createTableRow(item)); 
        }
    }

    cardBody.appendChild(date);
    cardBody.appendChild(time);
    cardBody.appendChild(paymentMethod);
    cardBody.appendChild(storeId);
    cardBody.appendChild(itemsTable);
    // cardBody.appendChild(itemList);
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
getBlocks(blockchain, () => {displayBlocks(blockchain.blocks)});

displayBlocks(blockchain.blocks);