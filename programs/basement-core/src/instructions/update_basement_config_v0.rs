use crate::state::BasementStateV0;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateBasementConfigV0<'info> {
    #[account(
        mut,
        seeds = [b"basement_state"],
        bump
    )]
    pub basement_state: Account<'info, BasementStateV0>,

    /// CHECK: This is the update authority that must sign
    #[account(constraint = update_authority.key() == basement_state.update_authority)]
    pub update_authority: Signer<'info>,
}

pub fn update_basement_config_handler_v0(
    ctx: Context<UpdateBasementConfigV0>,
    new_mint_authority: Option<Pubkey>,
    new_action_authority: Option<Pubkey>,
    new_update_authority: Option<Pubkey>,
) -> Result<()> {
    let basement_state = &mut ctx.accounts.basement_state;

    // Update authorities if provided
    if let Some(new_mint_auth) = new_mint_authority {
        msg!(
            "Updating mint authority from {} to {}",
            basement_state.mint_authority,
            new_mint_auth
        );
        basement_state.mint_authority = new_mint_auth;
    }

    if let Some(new_action_auth) = new_action_authority {
        msg!(
            "Updating action authority from {} to {}",
            basement_state.action_authority,
            new_action_auth
        );
        basement_state.action_authority = new_action_auth;
    }

    if let Some(new_update_auth) = new_update_authority {
        msg!(
            "Updating update authority from {} to {}",
            basement_state.update_authority,
            new_update_auth
        );
        basement_state.update_authority = new_update_auth;
    }

    msg!("Basement configuration updated successfully");

    Ok(())
}
