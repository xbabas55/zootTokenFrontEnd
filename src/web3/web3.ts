import * as anchor from '@coral-xyz/anchor';
import { ComputeBudgetProgram, Connection, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, VersionedTransaction } from "@solana/web3.js";
import type { Zoot } from "./zoot";
import { Program } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import zootIDL from "./zoot.json";
import { createAssociatedTokenAccountIdempotentInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { TransactionMessage } from '@solana/web3.js';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import axios from 'axios';
import { CommonResponse } from '../wrapper/common';
import { json } from 'stream/consumers';

const rpcUrl = process.env.SOLANA_RPC_URL || clusterApiUrl("devnet");
const connection = new Connection(rpcUrl, "confirmed");

export const commitmentLevel = "confirmed";
const USER_SEED = "USER_SEED";
const PRESALE_SEED = "PRESALE_SEED";

export const BuyToken = async (wallet: WalletContextState, amount: anchor.BN) => {
  let sig: string | null = null;
  try {
    if (!wallet.signTransaction || !wallet.publicKey) {
      return;
    }
    // const code = await generateReferralCode(wallet.publicKey.toBase58())
    // console.log('Generated referral code:', code);
    // const a = await getReferrerFromCode(code)
    // console.log("needs to be pubkey", a)

    const anchorWallet = convertWallet(wallet);
    const provider = new anchor.AnchorProvider(connection, anchorWallet, { preflightCommitment: commitmentLevel });
    anchor.setProvider(provider);

    const program = new Program(
      zootIDL,
      provider
    ) as Program<Zoot>;

    // const userInfoAccount = PublicKey.findProgramAddressSync(
    //   [Buffer.from(USER_SEED), wallet.publicKey.toBuffer()],
    //   program.programId
    // )[0];
    // console.log("userInfoAccount: ", userInfoAccount.toBase58());
    // const userInfo = await program.account.userInfo.fetch(userInfoAccount);
    // console.log("user info: ", userInfo)

    // const tokenMintStr = await axios.get(process.env.REACT_APP_DEV_SEVER + "presale/getTokenMint");
    // console.log(JSON.stringify(tokenMintStr));
    // let mint = null;
    // let str=tokenMintStr.data.value;
    // try {;
    //    mint = new PublicKey(str);
    // } catch (err) {
    //   console.error("eagl data:", err);
    // }


    // console.log("token mint", tokenMintStr);



    const tx = await program.methods
      .buyTokenWithSol(amount)
      .accounts({
        buyer: wallet.publicKey,
      })
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({
          units: 200_000,
        }),
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 100_000,
        })
      ])
      .transaction();

    const vTx = new VersionedTransaction(
      new TransactionMessage({
        instructions: tx.instructions,
        payerKey: wallet.publicKey,
        recentBlockhash: (await connection.getLatestBlockhash("confirmed")).blockhash,
      }).compileToV0Message()
    );

    console.log("simulate transaction: ", await connection.simulateTransaction(vTx))

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(vTx);
      sig = bs58.encode(signedTx.signatures[0])
      console.log("sig", sig)
      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
        {
          preflightCommitment: 'confirmed',
          skipPreflight: false
        }
      );
      const blockhash = await connection.getLatestBlockhash("confirmed");
      const res = await connection.confirmTransaction(
        {
          signature,
          blockhash: blockhash.blockhash,
          lastValidBlockHeight: blockhash.lastValidBlockHeight,
        },
        "confirmed"
      );
      console.log("buy signature: ", signature)
      return signature;
    }
  } catch (error) {
    if (JSON.stringify(error).includes("This transaction has already been processed")) {
      console.log("Transaction successfully processed")
      if (sig)
        return sig
    }
    console.log("Error while buying token", error)
    return
  }
}

/**
 * 
 * Util functions
 * 
 */

type WalletCompatible = {
  publicKey: anchor.web3.PublicKey;
  signTransaction: <T extends Transaction | VersionedTransaction>(tx: T) => Promise<T>;
  signAllTransactions: <T extends Transaction | VersionedTransaction>(txs: T[]) => Promise<T[]>;
};

// Convert the wallet to be compatible with Anchor
function convertWallet(wallet: WalletContextState): WalletCompatible {
  if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
    throw new Error("Wallet is not fully connected");
  }

  return {
    publicKey: wallet.publicKey,
    signTransaction: <T extends Transaction | VersionedTransaction>(tx: T) =>
      wallet.signTransaction!(tx) as Promise<T>,
    signAllTransactions: <T extends Transaction | VersionedTransaction>(txs: T[]) =>
      wallet.signAllTransactions!(txs) as Promise<T[]>
  };
}

export const fetchTotalRaised = async (wallet: WalletContextState) => {
  try {
    const anchorWallet = convertWallet(wallet);
    const provider = new anchor.AnchorProvider(connection, anchorWallet, { preflightCommitment: commitmentLevel });
    anchor.setProvider(provider);

    const program = new Program(
      zootIDL,
      provider
    ) as Program<Zoot>;


    const presaleInfoPda = PublicKey.findProgramAddressSync(
      [Buffer.from(PRESALE_SEED)],
      program.programId
    )[0]

    const presaleState = await program.account.presaleInfo.fetch(presaleInfoPda)
    return (presaleState.totalSellAmount.toNumber() / 10 ** 9).toFixed(2)
  } catch (error) {
    return "0"
  }
}