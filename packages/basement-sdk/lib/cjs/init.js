"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const constants_1 = require("./constants");
const init = (provider_1, ...args_1) => __awaiter(void 0, [provider_1, ...args_1], void 0, function* (provider, programId = constants_1.PROGRAM_ID, idl) {
    if (!idl) {
        idl = yield anchor_1.Program.fetchIdl(programId, provider);
    }
    const basement = new anchor_1.Program(idl, provider, undefined, () => undefined);
    return basement;
});
exports.init = init;
//# sourceMappingURL=init.js.map