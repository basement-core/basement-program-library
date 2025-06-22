use crate::state::BasementStateV0;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};

#[derive(Accounts)]
pub struct MintTokensV0<'info> {
    #[account(seeds = [b"basement_state"], bump, constraint = basement_state.mint == mint.key())]
    pub basement_state: Account<'info, BasementStateV0>,

    #[account(
        mut,
        constraint = mint.key() == basement_state.mint
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = recipient_token_account.mint == mint.key()
    )]
    pub recipient_token_account: Account<'info, TokenAccount>,

    /// CHECK: This is the mint authority that must sign
    #[account(constraint = mint_authority.key() == basement_state.mint_authority)]
    pub mint_authority: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

pub fn mint_tokens_handler_v0(ctx: Context<MintTokensV0>, amount: u64) -> Result<()> {
    let recipient_token_account: &mut _ = &mut ctx.accounts.recipient_token_account;

    // Mint tokens to the recipient
    let mint_to_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: recipient_token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        },
        &[],
    );

    token::mint_to(mint_to_ctx, amount)?;

    msg!(
        "Minted {} tokens to {}",
        amount,
        recipient_token_account.owner
    );

    Ok(())
}
