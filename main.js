const SHA256 = require ('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ""){
    this.index=index;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp=timestamp; 
    this.hash = this.calculateHash();
    this.nonce = 0; //relevant to the mineBlock function by making changes to the hash
  }
  calculateHash(){
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce ).toString();
  }
  mineBlock(difficulty){
    //make the hash of our block begin with a certain number of zeros upto a certain set value of difficulty.The while loop runs
    //until the hash has enough zeros
    while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
        this.nonce++;
    //calculate the hash of this block
        this.hash = this.calculateHash()
    }
    console.log("Block mined:" + this.hash)
  }
}

class BlockChain {
    constructor(){
      this.chain=[this.createGenesisBlock];//genesis block
      this.difficulty =  2;

    }
    createGenesisBlock(){
      return new Block(0, "08/11/2014","Genesis Block","0")
    }
    getLatestBlock(){
      return this.chain[this.chain.length-1] //to get the last element
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;//get the latest block and its hash
        // newBlock.hash = newBlock.calculateHash();//update the calculateHash function
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);//add new block to the blockchain
    }
    isChainValid(){
      for(let i = 1;i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];

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

console.log("Mining Block 1...")
NjokiCoin.addBlock(new Block(1, "31/1/2022",{amount:4}));
console.log("Mining Block 2...")
NjokiCoin.addBlock(new Block(2, "2/2/2022",{amount:10}));
console.log("Mining Block 2...")
NjokiCoin.addBlock(new Block(1, "4/2/2022",{amount:20}));

console.log('Is Blockchain valid?' + NjokiCoin.isChainValid())
//break chain by changing amount
NjokiCoin.chain[1].data={amount:100};
//break the chain by recalculating hash
NjokiCoin.chain[1].hash= NjokiCoin.chain[1].calculateHash();

console.log('Is Blockchain valid?' + NjokiCoin.isChainValid())

console.log(JSON.stringify(NjokiCoin, null,4 ));

 