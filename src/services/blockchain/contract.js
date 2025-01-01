import { ethers } from 'ethers'

const nftABI = JSON.parse('[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ECDSAInvalidSignature", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "name": "ECDSAInvalidSignatureLength", "type": "error" }, { "inputs": [ { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "ECDSAInvalidSignatureS", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ERC1155InsufficientBalance", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "approver", "type": "address" } ], "name": "ERC1155InvalidApprover", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "idsLength", "type": "uint256" }, { "internalType": "uint256", "name": "valuesLength", "type": "uint256" } ], "name": "ERC1155InvalidArrayLength", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" } ], "name": "ERC1155InvalidOperator", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ERC1155InvalidReceiver", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" } ], "name": "ERC1155InvalidSender", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" } ], "name": "ERC1155MissingApprovalForAll", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" } ], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "URI", "type": "event" }, { "inputs": [], "name": "BASIC_NFT", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EVOLVED_NFT", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" } ], "name": "balanceOfBatch", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" } ], "name": "claimNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "evolveNFTs", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getMessageHash", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "getUserBalances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "signature", "type": "bytes" } ], "name": "isSignatureUsed", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "uri", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "usedSignatures", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]')
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

const getContractInstance = (signer) => {
  return new ethers.Contract(contractAddress, nftABI, signer)
}

export const claimNFT = async (signer, signature, index) => {
  try {
    const nftContract = getContractInstance(signer);
    const tx = await nftContract.claimNFT(index, signature);
    const rs = await tx.wait();

    return {
      success: true,
      transactionHash: rs.transactionHash,
    };
  } catch (e) {
    console.error('Error claiming NFT:', e);
    return {
      success: false,
      error: e,
    };
  }
}

export const getUserBalances = async (signer, address) => {
  try {
    const nftContract = getContractInstance(signer)
    const balances = await nftContract.getUserBalances(address)

    return {
      success: true,
      balances,
    }
  } catch (e) {
    console.error('Error getting user balances:', e)
    return {
      success: false,
      error: e,
    }
  }
}

export const evolveNFTs = async (signer) => {
  try {
    const nftContract = getContractInstance(signer)
    const tx = await nftContract.evolveNFTs()
    const rs = await tx.wait()

    return {
      success: true,
      transactionHash: rs.transactionHash,
    }
  } catch (e) {
    console.error('Error evolving NFTs:', e)
    return {
      success: false,
      error: e,
    }
  }
}

