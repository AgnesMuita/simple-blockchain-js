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
        this.chain.push(newBlock);//add it to the block

    }
}