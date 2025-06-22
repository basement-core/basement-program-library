use crate::state::BasementStateV0;
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct InitializeBasementV0<'info> {
    #[account(init, payer = payer, space = BasementStateV0::LEN, seeds = [b"basement_state"], bump)]
    pub basement_state: Account<'info, BasementStateV0>,

    #[account(
        init,
        payer = payer,
        token::mint = mint,
        token::authority = basement_state,
        seeds = [b"token_vault", mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub mint: Account<'info, Mint>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn initialize_basement_handler_v0(
    ctx: Context<InitializeBasementV0>,
    mint: Pubkey,
    mint_authority: Pubkey,
    action_authority: Pubkey,
    update_authority: Pubkey,
) -> Result<()> {
    let basement_state = &mut ctx.accounts.basement_state;

    basement_state.mint = mint;
    basement_state.mint_authority = mint_authority;
    basement_state.action_authority = action_authority;
    basement_state.update_authority = update_authority;

    msg!("Basement state initialized with mint: {}", mint);
    msg!("Mint authority: {}", mint_authority);
    msg!("Action authority: {}", action_authority);
    msg!("Update authority: {}", update_authority);
    msg!(
        "Token vault initialized: {}",
        ctx.accounts.token_vault.key()
    );

    Ok(())
}
