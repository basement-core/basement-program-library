#![allow(deprecated)]

use anchor_lang::prelude::*;

declare_id!("basRcvkBuRNUJHxNTqdV5d23PVXHteqBheoRKUFtdbG");

pub mod instructions;
pub mod state;

use instructions::*;

#[program]
pub mod basement_core {
    use super::*;

    pub fn initialize_basement(
        ctx: Context<InitializeBasementV0>,
        mint: Pubkey,
        mint_authority: Pubkey,
        action_authority: Pubkey,
        update_authority: Pubkey,
    ) -> Result<()> {
        instructions::initialize_basement_v0::initialize_basement_handler_v0(
            ctx,
            mint,
            mint_authority,
            action_authority,
            update_authority,
        )
    }

    pub fn use_tokens_for_action(
        ctx: Context<UseTokensForActionV0>,
        action_type: String,
        amount: u64,
    ) -> Result<()> {
        instructions::use_tokens_for_action_v0::use_tokens_for_action_handler_v0(
            ctx,
            action_type,
            amount,
        )
    }

    pub fn mint_tokens(ctx: Context<MintTokensV0>, amount: u64) -> Result<()> {
        instructions::mint_tokens_v0::mint_tokens_handler_v0(ctx, amount)
    }

    pub fn update_basement_config(
        ctx: Context<UpdateBasementConfigV0>,
        new_mint_authority: Option<Pubkey>,
        new_action_authority: Option<Pubkey>,
        new_update_authority: Option<Pubkey>,
    ) -> Result<()> {
        instructions::update_basement_config_v0::update_basement_config_handler_v0(
            ctx,
            new_mint_authority,
            new_action_authority,
            new_update_authority,
        )
    }
}

#[derive(Accounts)]
pub struct Initialize {}
