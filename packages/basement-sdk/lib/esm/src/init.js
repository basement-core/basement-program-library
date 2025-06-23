import { Program } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "./constants";
export const init = async (provider, programId = PROGRAM_ID, idl) => {
    if (!idl) {
        idl = await Program.fetchIdl(programId, provider);
    }
    const basement = new Program(idl, provider, undefined, () => undefined);
    return basement;
};
//# sourceMappingURL=init.js.map