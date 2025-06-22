"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimedMetadataKey = exports.foundersUserKey = exports.foundersManagerKey = exports.stakeMetadataKey = exports.stakeRecieptKey = exports.meowMetadataKey = exports.auctionManagerKey = exports.referralRecipientKey = exports.bidderRecieptKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./constants");
/**
 *
 * @param listing
 * @param bidder
 * @param programId
 * @returns
 */
const bidderRecieptKey = (listing, bidder, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("bid_reciept", "utf-8"),
    listing.toBuffer(),
    bidder.toBuffer(),
], programId);
exports.bidderRecieptKey = bidderRecieptKey;
/**
 *
 * @param listing
 * @param nft
 * @param programId
 * @returns
 */
const referralRecipientKey = (listing, nftName, programId = constants_1.PROGRAM_ID) => {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("referral_recipient", "utf-8"),
        Buffer.from(nftName, "utf-8"),
        listing.toBuffer(),
    ], programId);
};
exports.referralRecipientKey = referralRecipientKey;
/**
 *
 * @param collection
 * @param name
 * @param programId
 * @returns
 */
const auctionManagerKey = (collection, name, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("auction_manager", "utf-8"),
    collection.toBuffer(),
    Buffer.from(name, "utf-8"),
], programId);
exports.auctionManagerKey = auctionManagerKey;
const meowMetadataKey = (nft, auctionManager, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("meow_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
exports.meowMetadataKey = meowMetadataKey;
const stakeRecieptKey = (nft, listing, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("stake_reciept", "utf-8"), nft.toBuffer(), listing.toBuffer()], programId);
exports.stakeRecieptKey = stakeRecieptKey;
const stakeMetadataKey = (nft, auctionManager, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("stake_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
exports.stakeMetadataKey = stakeMetadataKey;
const foundersManagerKey = (tokenMint, name, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("founders_manager", "utf-8"),
    tokenMint.toBuffer(),
    Buffer.from(name, "utf-8"),
], programId);
exports.foundersManagerKey = foundersManagerKey;
const foundersUserKey = (foundersManager, walletAddress, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("founders_user", "utf-8"),
    foundersManager.toBuffer(),
    walletAddress.toBuffer(),
], programId);
exports.foundersUserKey = foundersUserKey;
const claimedMetadataKey = (nft, auctionManager, programId = constants_1.PROGRAM_ID) => web3_js_1.PublicKey.findProgramAddressSync([
    Buffer.from("claimed_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
exports.claimedMetadataKey = claimedMetadataKey;
//# sourceMappingURL=pdas.js.map