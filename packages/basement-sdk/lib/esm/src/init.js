import { Program } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "./constants";
import { basementCoreResolvers } from "./resolvers";
export const init = async (provider, programId = PROGRAM_ID, idl) => {
    if (!idl) {
        idl = await Program.fetchIdl(programId, provider);
    }
    const basement = new Program(idl, provider, undefined, () => basementCoreResolvers);
    return basement;
};
//# sourceMappingURL=init.js.map