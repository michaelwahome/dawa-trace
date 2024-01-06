"use client"

import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'

export default function Home() {
  const { walletProvider } = useWeb3ModalProvider()

  const testFunc = async () => {
    if (walletProvider){
      const provider = new BrowserProvider(walletProvider)
      const signer = await provider.getSigner()
      const signature = await signer?.signMessage('Hello Web3Modal Ethers')
      console.log(signer.address)
    }else{
      console.log("No wallet connected")
    }
  }


  return (
    <>
      <w3m-button />
      <button onClick={testFunc}>Test</button>
    </>
  )
}
