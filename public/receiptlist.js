function displayBlocks(blocks){
    for (const block of blocks) {
        //TODO: Display blocks
        console.log(block);
    }
}

var blockchain = new Blockchain();
getBlocks(blockchain, () => {displayBlocks(blockchain.blocks)});

displayBlocks(blockchain.blocks);