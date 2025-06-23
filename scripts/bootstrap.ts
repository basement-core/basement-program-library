import * as anchor from "@coral-xyz/anchor";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { init as initBasement } from "../packages/basement-sdk/src/index";
import { createMint } from "@helium/spl-utils";
import dotenv from "dotenv";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

dotenv.config();

const BNT_MINT = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.BASEMENT_MINT || "[]"))
);

const ACTION_AUTHORITY = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.ACTION_AUTHORITY || "[]"))
);

const UPDATE_AUTHORITY = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.UPDATE_AUTHORITY || "[]"))
);

const MINT_AUTHORITY = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.MINT_AUTHORITY || "[]"))
);

async function bootstrap() {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider() as anchor.AnchorProvider;
  const me = provider.wallet.publicKey;

  console.log("Me:", me.toBase58());

  const mint = await createMint(
    provider,
    9,
    MINT_AUTHORITY.publicKey,
    MINT_AUTHORITY.publicKey,
    BNT_MINT
  );

  // Initialize Odyssey program
  const basementProgram = await initBasement(
    provider,
    anchor.workspace.BasementCore.programId,
    anchor.workspace.BasementCore.idl
  );

  // Find PDA for basement state
  const [basementState] = PublicKey.findProgramAddressSync(
    [Buffer.from("basement_state")],
    basementProgram.programId
  );

  // Find PDA for token vault
  const [tokenVault] = PublicKey.findProgramAddressSync(
    [Buffer.from("token_vault"), mint.toBuffer()],
    basementProgram.programId
  );

  // Initialize basement
  console.log("Initializing basement...");
  const tx = await basementProgram.methods
    .initializeBasement(
      mint,
      MINT_AUTHORITY.publicKey,
      ACTION_AUTHORITY.publicKey,
      UPDATE_AUTHORITY.publicKey
    )
    .accountsPartial({
      basementState,
      tokenVault,
      payer: me,
      mint,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .rpc();

  console.log("Basement initialized:", basementState.toBase58());
}

bootstrap().catch(console.error);
