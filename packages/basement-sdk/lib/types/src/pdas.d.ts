import { PublicKey } from "@solana/web3.js";
/**
 *
 * @param listing
 * @param bidder
 * @param programId
 * @returns
 */
export declare const bidderRecieptKey: (listing: PublicKey, bidder: PublicKey, programId?: PublicKey) => [PublicKey, number];
/**
 *
 * @param listing
 * @param nft
 * @param programId
 * @returns
 */
export declare const referralRecipientKey: (listing: PublicKey, nftName: string, programId?: PublicKey) => [PublicKey, number];
/**
 *
 * @param collection
 * @param name
 * @param programId
 * @returns
 */
export declare const auctionManagerKey: (collection: PublicKey, name: string, programId?: PublicKey) => [PublicKey, number];
export declare const meowMetadataKey: (nft: PublicKey, auctionManager: PublicKey, programId?: PublicKey) => [PublicKey, number];
export declare const stakeRecieptKey: (nft: PublicKey, listing: PublicKey, programId?: PublicKey) => [PublicKey, number];
export declare const stakeMetadataKey: (nft: PublicKey, auctionManager: PublicKey, programId?: PublicKey) => [PublicKey, number];
export declare const foundersManagerKey: (tokenMint: PublicKey, name: string, programId?: PublicKey) => [PublicKey, number];
export declare const foundersUserKey: (foundersManager: PublicKey, walletAddress: PublicKey, programId?: PublicKey) => [PublicKey, number];
export declare const claimedMetadataKey: (nft: PublicKey, auctionManager: PublicKey, programId?: PublicKey) => [PublicKey, number];
//# sourceMappingURL=pdas.d.ts.map