import Web3 from "web3"

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const USER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

export default class HardhatVoteStore {
  constructor() {
    const web3 = new Web3("http://127.0.0.1:8545")
    this.contract = new web3.eth.Contract(this._contractAbi(), CONTRACT_ADDRESS)
  }

  async getVotes(pokemon) {
    let votes;

    try {
      votes = await this.contract.methods.getResults(pokemon.name).call()
    } catch (error) {
      return { likes: 0, dislikes: 0 }
    }

    return {
      likes: parseInt(votes[0]),
      dislikes: parseInt(votes[1])
    }
  }

  async storeLike(pokemon) {

  }

  async storeDislike(pokemon) {

  }

  getKey(pokemon) {

  }

  _contractAbi() {
    return [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "pokemonName",
            "type": "string"
          }
        ],
        "name": "dislike",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "pokemonName",
            "type": "string"
          }
        ],
        "name": "getResults",
        "outputs": [
          {
            "internalType": "uint256[2]",
            "name": "",
            "type": "uint256[2]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "pokemonName",
            "type": "string"
          }
        ],
        "name": "like",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }
}
