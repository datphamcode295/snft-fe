import React, { useState, } from 'react'
import MetamaskLogin from '../components/MetamaskLogin'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'
import { claimNFT, evolveNFTs } from '../services/blockchain/contract'
import useNFTBalances from '../hooks/useNFTBalances'
import { nftAPI } from '../services/api'
import { toast, Bounce } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const NFTGame = () => {
  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingEnvolve, setLoadingEnvolve] = useState(false)

  const { walletProvider } = useWeb3ModalProvider()
  const { isConnected, address } = useWeb3ModalAccount()
  const { normal, supper, getNFTBalance } = useNFTBalances(walletProvider, address, isConnected)

  const mintNFT = async () => {
    setLoadingMint(true)
    try {
      const response = await nftAPI.generateSignature(address)
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const rs = await claimNFT(signer, response.signature, response.index)
      if (rs.success) {
        toast.success('NFT minted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      } else {
        console.error('Error minting NFT:', rs.error)
        toast.error('Error minting NFT!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }
    } catch (error) {
      console.log('Error minting NFT:', error)
      toast.error('Error minting NFT!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    } finally {
      setLoadingMint(false)
      getNFTBalance()
    }
  }

  const envolveNFT = async () => {
    setLoadingEnvolve(true)
    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const rs = await evolveNFTs(signer)
      if (rs.success) {
        toast.success('NFT evolved successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      } else {
        console.error('Error evolving NFT:', rs.error)
        toast.error('Error evolving NFT!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error evolving NFT:', error)
    } finally {
      setLoadingEnvolve(false)
      getNFTBalance()
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">NFT Game</h1>
          {!isConnected ? (
            <MetamaskLogin />
          ) : (
            <div>
              <p className="mb-4 text-gray-700">Connected: {address}</p>
              <button
                onClick={mintNFT}
                disabled={loadingMint}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 w-full mb-4"
              >
                {loadingMint ? 'Minting...' : 'Mint NFT'}
              </button>
              {normal >= 2 && (
                <button
                  onClick={envolveNFT}
                  disabled={loadingEnvolve}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 w-full mb-4"
                >
                  {loadingEnvolve ? 'Evolving...' : 'Evolve NFT'}
                </button>
              )}
              <div className="mt-4 text-gray-700">
                <p>Normal NFT: {normal}</p>
                <p>Supper NFT: {supper}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default NFTGame