function createTableHeader(itemHeader){
    var itemsTableHeaderContainer = document.createElement("THEAD").appendChild(document.createElement("TR"));
    for (var key of itemHeader){
        //console.log("key" + key)
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
    itemPrice.innerText = "$" + parseFloat(item.price).toFixed(2);

    var itemTotal = document.createElement("TD");
    itemTotal.setAttribute("scope", "col");
    itemTotal.innerText = "$" + (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2);
    
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
    var totalPrice = document.createElement("H6");

    blockCard.className = "card w-100 receipt-card";
    transactionID.className = "card-header";
    cardBody.className = "card-body";
    date.className = "card-text";
    paymentMethod.className = "card-text";
    storeId.className = "card-text";
    itemsLabel.className = "card-text";
    itemsTable.className = "w-100";
    totalPrice.className = "card-text";
    
    transactionID.innerHTML = "Transaction #" + block.receiptData.transactionId;
    date.innerHTML = "Date of sale: " + block.receiptData.date + " " + block.receiptData.time;
    paymentMethod.innerHTML = "Payment method: " + block.receiptData.paymentMethod;
    storeId.innerHTML = "Store ID: " + block.receiptData.storeId;
    itemsLabel.innerHTML = "Items:"
    totalPrice.innerHTML = "Total Price: $" + parseFloat(block.receiptData.total).toFixed(2);

    if (block.receiptData.items != null && block.receiptData.items != undefined){
        itemsTable.appendChild(createTableHeader(["Quantity", "Name", "Price", "Total"]));
        for(var key in block.receiptData.items){
            //console.log(key);
            var item = block.receiptData.items[key];
            itemsTable.appendChild(createTableRow(item)); 
        }
    }

    cardBody.appendChild(date);
    cardBody.appendChild(paymentMethod);
    cardBody.appendChild(storeId);
    cardBody.appendChild(itemsLabel);
    cardBody.appendChild(itemsTable);
    cardBody.appendChild(totalPrice);
    blockCard.appendChild(transactionID);
    blockCard.appendChild(cardBody);
    return blockCard;
}

function displayBlocks(blocks){
    var blockContainer = document.getElementById("mainContent");
    //console.log(blocks);
    for (var block of blocks) {
        blockContainer.appendChild(viewReceipt(block));
    }
}

var viewSearchedTransId = () => {
   var blockchain = new Blockchain();
   var blockContainer = document.getElementById("mainContent");
   blockContainer.innerHTML = "";
   console.log("got to here");
   
   var transID = document.getElementById("searchByTransaction");
	getBlocks(blockchain, () => {
		blockchain.blocks.shift();
		for (var block of blockchain.blocks)
		{
		   console.log(block);
		   console.log("Test");
		   if (block.receiptData.transactionId == transID.value)
		   {
				//blockContainer.appendChild(viewReceipt(block));
				blockchain.blocks = [block];
				console.log(blockchain.blocks);
				displayBlocks(blockchain.blocks);
		   }
		}
   
	});
   
};


var viewSearchedDates= () => {
	//console.log(blockchain.date);
   var blockchain = new Blockchain();
   var blockContainer = document.getElementById("mainContent");
   blockContainer.innerHTML = "";
   
   var start = document.getElementById("start");
   var startDate = new Date(start.value);
   console.log(start.value);
   console.log(startDate/1000);
   
   var end = document.getElementById("end");
   var endDate = new Date(end.value);
   console.log(end.value);
   console.log(endDate/1000);
   
   console.log("We are about to go into the for loop");
   getBlocks(blockchain, () => {
	blockchain.blocks.shift();
	   for (var block of blockchain.blocks)
	   {
		   console.log("we are here");
		   console.log(startDate/1000);
		   console.log(block.timestamp);
		   console.log(endDate/1000);
		   if (block.timestamp <= ((endDate/1000)+86400) && block.timestamp >= (startDate/1000))
		   {
				
				blockContainer.appendChild(viewReceipt(block));
		   }
	   }
   });
   
};

function setSearchParameters(value){
    if (value == "date"){
        document.getElementById("start").style.display = 'inline-block';
        document.getElementById("end").style.display = 'inline-block';
        document.getElementById("startLabel").style.display = 'inline-block';
        document.getElementById("endLabel").style.display = 'inline-block';
        document.getElementById("searchByTransaction").style.display = 'none';
    } else {
        document.getElementById("start").style.display = 'none';
        document.getElementById("end").style.display = 'none';
        document.getElementById("startLabel").style.display = 'none';
        document.getElementById("endLabel").style.display = 'none';
        document.getElementById("searchByTransaction").style.display = 'inline-block';
    }
}

var searchByOption = document.getElementById("searchByOption");
searchByOption.addEventListener("change", () => {
    setSearchParameters(searchByOption.value);
});
setSearchParameters(searchByOption.value);

var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    if (searchByOption.value == "date"){
        viewSearchedDates();
    } else {
        viewSearchedTransId();
    }
});

var blockchain = new Blockchain();
getBlocks(blockchain, () => {
    blockchain.blocks.shift();
    displayBlocks(blockchain.blocks)
});
