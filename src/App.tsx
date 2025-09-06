import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './components/SolanaWallet'

function App() {
  const [mnemonic, setMnemonic] = useState<string[]>([])
  return (
    <div className='flex w-full h-full flex flex-col justify-start items-center gap-3 p-5'>
      <div className='flex  flex-col gap-2'>
        <button className='btn btn-active bg-base-300' onClick={async () => {
          const mnem = await generateMnemonic().split(' ');
          console.log(mnem)
          await navigator.clipboard.writeText(mnem.join(' '))
          setMnemonic(mnem);
        }}>Generate Mnemonic</button>
        <div className='grid grid-cols-3 min-w-sm gap-2'>
          {mnemonic.map((phrase, i)=> <label className='border-1 text-center gap-2 h-auto w-auto' key={i}>{phrase}</label>)}
        </div>
        <SolanaWallet mnemonic={mnemonic}></SolanaWallet>
      </div>


    </div>
  )
}

export default App
