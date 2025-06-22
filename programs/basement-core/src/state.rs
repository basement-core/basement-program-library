use anchor_lang::prelude::*;

#[account]
pub struct BasementStateV0 {
    pub mint: Pubkey,
    pub mint_authority: Pubkey,
    pub action_authority: Pubkey,
    pub update_authority: Pubkey,
}

impl BasementStateV0 {
    pub const LEN: usize = 8 + // discriminator
        32 + // mint
        32 + // mint_authority
        32 + // action_authority
        32; // update_authority
}
