const SHA256 = require ('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ""){
    this.index=index;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp=timestamp; 
    this.hash = this.calculateHash();
  }
  calculateHash(){
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class BlockChain {
    constructor(){
      this.chain=[this.createGenesisBlock];//genesis block

    }
    createGenesisBlock(){
      return new Block(0, "08/11/2014","Genesis Block","0")
    }
    getLatestBlock(){
      return this.chain[this.chain.length-1] //to get the last element
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;//get the latest block and its hash
        newBlock.hash = newBlock.calculateHash();//update the calculateHash function
        this.chain.push(newBlock);//add new block to the blockchain
    }
    isChainValid(){
      for(let i = 1;i < this.chain.length; i++){
        const currentBlock = this.chain(i);
        const previousBlock = this.chain(i-1);

        if (currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash){
            return false;
        }
      }
      return true;
    }
}
//testing by creating an instance of the blockchain
let NjokiCoin = new BlockChain()
NjokiCoin.addBlock(new Block(1, "31/1/2022",{amount:4}));
NjokiCoin.addBlock(new Block(2, "2/2/2022",{amount:10}));
NjokiCoin.addBlock(new Block(1, "4/2/2022",{amount:20}));


console.log(JSON.stringify(NjokiCoin, null,4 ));