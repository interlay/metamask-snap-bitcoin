import {Wallet} from "./wallet";
import * as bitcoin from 'bitcoinjs-lib';

async function deriveKeyPair(wallet: Wallet) {
  const appKey = await wallet.getAppKey();
  return bitcoin.bip32.fromSeed(Buffer.from(appKey));
}

export async function getAddress(wallet: Wallet): Promise<string> {
  const keyPair = await deriveKeyPair(wallet);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return address;
}

export async function signMessage(wallet: Wallet, payload: string): Promise<string> {
  const keyPair = await deriveKeyPair(wallet);
  const bytes = bitcoin.crypto.sha256(Buffer.from(payload));
  const signedBytes = keyPair.sign(bytes);
  return signedBytes.toString('hex');
}

export async function exportKeyPair(wallet: Wallet): Promise<string> {
  const keyPair = await deriveKeyPair(wallet);
  return keyPair.toBase58();
}