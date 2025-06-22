import { BasementCore } from "@basement-core/idls/lib/types/basement_core";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";
import { basementCoreResolvers } from "./resolvers";

export const init = async (
  provider: AnchorProvider,
  programId: PublicKey = PROGRAM_ID,
  idl?: Idl | null
): Promise<Program<BasementCore>> => {
  if (!idl) {
    idl = await Program.fetchIdl(programId, provider);
  }

  const basement = new Program<BasementCore>(
    idl as BasementCore,
    provider,
    undefined,
    () => basementCoreResolvers
  ) as Program<BasementCore>;

  return basement;
};
