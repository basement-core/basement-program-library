import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";
/**
 *
 * @param listing
 * @param bidder
 * @param programId
 * @returns
 */
export const bidderRecieptKey = (listing, bidder, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("bid_reciept", "utf-8"),
    listing.toBuffer(),
    bidder.toBuffer(),
], programId);
/**
 *
 * @param listing
 * @param nft
 * @param programId
 * @returns
 */
export const referralRecipientKey = (listing, nftName, programId = PROGRAM_ID) => {
    return PublicKey.findProgramAddressSync([
        Buffer.from("referral_recipient", "utf-8"),
        Buffer.from(nftName, "utf-8"),
        listing.toBuffer(),
    ], programId);
};
/**
 *
 * @param collection
 * @param name
 * @param programId
 * @returns
 */
export const auctionManagerKey = (collection, name, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("auction_manager", "utf-8"),
    collection.toBuffer(),
    Buffer.from(name, "utf-8"),
], programId);
export const meowMetadataKey = (nft, auctionManager, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("meow_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
export const stakeRecieptKey = (nft, listing, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([Buffer.from("stake_reciept", "utf-8"), nft.toBuffer(), listing.toBuffer()], programId);
export const stakeMetadataKey = (nft, auctionManager, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("stake_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
export const foundersManagerKey = (tokenMint, name, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("founders_manager", "utf-8"),
    tokenMint.toBuffer(),
    Buffer.from(name, "utf-8"),
], programId);
export const foundersUserKey = (foundersManager, walletAddress, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("founders_user", "utf-8"),
    foundersManager.toBuffer(),
    walletAddress.toBuffer(),
], programId);
export const claimedMetadataKey = (nft, auctionManager, programId = PROGRAM_ID) => PublicKey.findProgramAddressSync([
    Buffer.from("claimed_metadata", "utf-8"),
    nft.toBuffer(),
    auctionManager.toBuffer(),
], programId);
//# sourceMappingURL=pdas.js.map