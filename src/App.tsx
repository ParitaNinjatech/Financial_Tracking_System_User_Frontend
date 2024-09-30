
import './App.css'
import AppRoutes from './Components/routes/Routes'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
const projectId = '2fa6c12dde1b5cd1a88e4fd4cb690bca'

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygonMumbai = {
  chainId: 80002,
  name: 'MumbaiTesnet',
  currency: 'MATIC',
  explorerUrl: 'https://mumbai.polygonscan.com/',
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/'
}

const bscTestnet = {
  chainId: 97,
  name: 'BSC TestNet',
  currency: 'TBNB',
  explorerUrl: 'https://testnet.bscscan.com/',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

const sepolia = {
  chainId: 11155111,
  name: 'Sepoliatestnetwork',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://sepolia.infura.io/v3/2EydPKGqmXcXAKly2TBkdObNCHk'
}

const XDCTestnet = {
  chainId: 51,
  name: 'XDCApothemNetwork',
  currency: 'TXDC',
  explorerUrl: 'https://apothem.xinfinscan.com',
  rpcUrl: 'https://erpc.apothem.network'
}


const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1,
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bscTestnet, polygonMumbai, sepolia,XDCTestnet],
  projectId,
  enableAnalytics: true
})

function App() {
  

  return (
    <>
    <AppRoutes/>
    </>
  )
}

export default App
