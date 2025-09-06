import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

export function SolanaWallet(params: {mnemonic : string[]}) {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [publicKeys, setPublicKeys] = useState<PublicKey[]>([])

      return (
            <>
            <button onClick={()=>{
                  const seed = mnemonicToSeed(params.mnemonic.join(' '))
                  const path = `m/44'/501'/${currentIndex}'/0'`;
                  const derivedSeed = derivePath(path, seed.toString()).key
                  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
                  const keyPair = Keypair.fromSecretKey(secret)
                  setCurrentIndex(currentIndex + 1);
                  setPublicKeys([...publicKeys, keyPair.publicKey ])
                  
            }} className="btn btn-active">
                  Add Wallet
            </button>
            {publicKeys.map((p,i) => <label key={i} className="w-auto">{p.toBase58()}</label>)}
            </>
      )
}