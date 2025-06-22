import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BasementCore } from "../target/types/basement_core";
import {
  PublicKey,
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  createMint,
  createAccount,
} from "@solana/spl-token";
import { expect } from "chai";

const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

describe("basement-core", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .BasementProgramLibrary as Program<BasementCore>;

  // Test accounts
  const payer = anchor.AnchorProvider.env().wallet;
  const mintAuthority = Keypair.generate();
  const actionAuthority = Keypair.generate();
  const updateAuthority = Keypair.generate();
  const user = Keypair.generate();

  let mint: PublicKey;
  let basementState: PublicKey;
  let tokenVault: PublicKey;
  let userTokenAccount: PublicKey;

  const anchorProvider = anchor.getProvider();

  it("Initialize basement", async () => {
    if (!payer.payer) {
      throw new Error("Payer not found");
    }

    // Create a new mint
    mint = await createMint(
      anchor.getProvider().connection,
      payer.payer,
      mintAuthority.publicKey,
      null,
      9
    );

    // Find PDA for basement state
    [basementState] = PublicKey.findProgramAddressSync(
      [Buffer.from("basement_state")],
      program.programId
    );

    // Find PDA for token vault
    [tokenVault] = PublicKey.findProgramAddressSync(
      [Buffer.from("token_vault"), mint.toBuffer()],
      program.programId
    );

    // Initialize basement
    const tx = await program.methods
      .initializeBasement(
        mint,
        mintAuthority.publicKey,
        actionAuthority.publicKey,
        updateAuthority.publicKey
      )
      .accountsPartial({
        basementState,
        tokenVault,
        payer: payer.publicKey,
        mint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    const basementStateAcc =
      await program.account.basementStateV0.fetchNullable(basementState);
    console.log("Basement state:", basementStateAcc);

    console.log("Basement initialized with signature:", tx);

    expect(basementStateAcc).to.not.be.null;
    expect(basementStateAcc?.mint?.toBase58()).to.equal(mint.toBase58());
    expect(basementStateAcc?.mintAuthority?.toBase58()).to.equal(
      mintAuthority.publicKey.toBase58()
    );
    expect(basementStateAcc?.actionAuthority?.toBase58()).to.equal(
      actionAuthority.publicKey.toBase58()
    );
    expect(basementStateAcc?.updateAuthority?.toBase58()).to.equal(
      updateAuthority.publicKey.toBase58()
    );
  });

  it("Mint tokens to user", async () => {
    if (!payer.payer) {
      throw new Error("Payer not found");
    }

    // Create token account for user
    userTokenAccount = await createAccount(
      anchor.getProvider().connection,
      payer.payer,
      mint,
      user.publicKey
    );

    // Mint tokens to user
    const tx = await program.methods
      .mintTokens(new anchor.BN(1000000000)) // 1 token with 9 decimals
      .accountsPartial({
        basementState,
        mint,
        recipientTokenAccount: userTokenAccount,
        mintAuthority: mintAuthority.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([mintAuthority])
      .rpc();

    const userTokenAccountAcc =
      await anchorProvider.connection.getTokenAccountBalance(userTokenAccount);

    expect(userTokenAccountAcc.value.amount).to.equal("1000000000");
  });

  it("Use tokens for action", async () => {
    const tx = await program.methods
      .useTokensForAction("comment", new anchor.BN(100000000)) // 0.1 token
      .accountsPartial({
        basementState,
        userTokenAccount,
        tokenVault,
        user: user.publicKey,
        actionAuthority: actionAuthority.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([user, actionAuthority])
      .rpc();

    const userTokenAccountAcc =
      await anchorProvider.connection.getTokenAccountBalance(userTokenAccount);
    expect(userTokenAccountAcc.value.amount).to.equal("900000000");

    console.log("Action performed with signature:", tx);
  });

  it("Update basement config", async () => {
    const newActionAuthority = Keypair.generate();

    const tx = await program.methods
      .updateBasementConfig(
        null, // keep mint authority
        newActionAuthority.publicKey, // update action authority
        null // keep update authority
      )
      .accountsPartial({
        basementState,
        updateAuthority: updateAuthority.publicKey,
      })
      .signers([updateAuthority])
      .rpc();

    console.log("Config updated with signature:", tx);
  });
});
