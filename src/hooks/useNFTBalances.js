import { useState, useEffect, useCallback } from 'react'
import { BrowserProvider } from 'ethers'
import { getUserBalances } from '../services/blockchain/contract'

const useNFTBalances = (walletProvider, address, isConnected) => {
  const [normal, setNormal] = useState(0)
  const [supper, setSupper] = useState(0)

  const getNFTBalance = useCallback(async () => {
    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const rs = await getUserBalances(signer, address)
      setNormal(rs.balances[0])
      setSupper(rs.balances[1])
    } catch (error) {
      console.error('Error getting NFT balance:', error)
    }
  }, [walletProvider, address])

  useEffect(() => {
    if (isConnected) {
      getNFTBalance()
    }
  }, [isConnected, getNFTBalance])

  return { normal, supper, getNFTBalance }
}

export default useNFTBalances