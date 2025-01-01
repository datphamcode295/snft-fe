import './App.css';
import NFTGame from './pages/Homepage';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

let projectId = process.env.REACT_APP_PROJECT_ID

let mainnet = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: 'https://eth-sepolia.public.blastapi.io'
}

let metadata = {
  name: 'NFT Game',
  description: 'NFT Game',
  url: 'example.com',
  icons: ['https://example.com/favicon.ico']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})


function App() {
  return (
    <>
      <NFTGame />
    </>
  );
}

export default App
