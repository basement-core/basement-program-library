use crate::state::BasementStateV0;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_spl::memo::{build_memo, BuildMemo, Memo};
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use anchor_spl::token_interface::TokenInterface;

#[derive(Accounts)]
pub struct UseTokensForActionV0<'info> {
    #[account(
        seeds = [b"basement_state"],
        bump,
        constraint = basement_state.mint == user_token_account.mint.key()
    )]
    pub basement_state: Account<'info, BasementStateV0>,

    #[account(
        mut,
        constraint = user_token_account.owner == user.key()
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"token_vault", basement_state.mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,

    pub user: Signer<'info>,

    /// CHECK: This is the action authority that must sign
    #[account(constraint = action_authority.key() == basement_state.action_authority)]
    pub action_authority: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

pub fn use_tokens_for_action_handler_v0(
    ctx: Context<UseTokensForActionV0>,
    action_type: String,
    amount: u64,
) -> Result<()> {
    let user_token_account = &mut ctx.accounts.user_token_account;

    // Validate action type
    let valid_actions = ["comment", "thread", "boost", "graffiti"];
    require!(
        valid_actions.contains(&action_type.as_str()),
        ErrorCode::InvalidActionType
    );

    // Check if user has enough tokens
    require!(
        user_token_account.amount >= amount,
        ErrorCode::InsufficientTokens
    );

    // Transfer tokens from user to vault
    let transfer_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.token_vault.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        },
    );

    token::transfer(transfer_ctx, amount)?;
    // let memo_ctx = CpiContext::new(ctx.accounts.token_2022_program.to_account_info(), BuildMemo {});

    // let memo_ix = build_memo(memo_ctx, action_type.as_bytes());

    msg!("User spent {} tokens for action: {}", amount, action_type);

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid action type")]
    InvalidActionType,
    #[msg("Insufficient tokens")]
    InsufficientTokens,
}
