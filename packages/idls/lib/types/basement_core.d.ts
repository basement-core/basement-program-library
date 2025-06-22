/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basement_core.json`.
 */
export type BasementCore = {
    "address": "AUXi5iGNkJHoxxBoeYfz8C9JquJJddPPnjoSvDZCksYF";
    "metadata": {
        "name": "basementCore";
        "version": "0.1.0";
        "spec": "0.1.0";
        "description": "Created with Anchor";
    };
    "instructions": [
        {
            "name": "initializeBasement";
            "discriminator": [
                212,
                38,
                86,
                157,
                56,
                122,
                156,
                28
            ];
            "accounts": [
                {
                    "name": "basementState";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    98,
                                    97,
                                    115,
                                    101,
                                    109,
                                    101,
                                    110,
                                    116,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "tokenVault";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                "kind": "account";
                                "path": "mint";
                            }
                        ];
                    };
                },
                {
                    "name": "payer";
                    "writable": true;
                    "signer": true;
                },
                {
                    "name": "mint";
                },
                {
                    "name": "systemProgram";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "tokenProgram";
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                },
                {
                    "name": "rent";
                    "address": "SysvarRent111111111111111111111111111111111";
                }
            ];
            "args": [
                {
                    "name": "mint";
                    "type": "pubkey";
                },
                {
                    "name": "mintAuthority";
                    "type": "pubkey";
                },
                {
                    "name": "actionAuthority";
                    "type": "pubkey";
                },
                {
                    "name": "updateAuthority";
                    "type": "pubkey";
                }
            ];
        },
        {
            "name": "mintTokens";
            "discriminator": [
                59,
                132,
                24,
                246,
                122,
                39,
                8,
                243
            ];
            "accounts": [
                {
                    "name": "basementState";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    98,
                                    97,
                                    115,
                                    101,
                                    109,
                                    101,
                                    110,
                                    116,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "mint";
                    "writable": true;
                },
                {
                    "name": "recipientTokenAccount";
                    "writable": true;
                },
                {
                    "name": "mintAuthority";
                    "signer": true;
                },
                {
                    "name": "tokenProgram";
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "updateBasementConfig";
            "discriminator": [
                177,
                125,
                101,
                227,
                244,
                180,
                115,
                64
            ];
            "accounts": [
                {
                    "name": "basementState";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    98,
                                    97,
                                    115,
                                    101,
                                    109,
                                    101,
                                    110,
                                    116,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "updateAuthority";
                    "signer": true;
                }
            ];
            "args": [
                {
                    "name": "newMintAuthority";
                    "type": {
                        "option": "pubkey";
                    };
                },
                {
                    "name": "newActionAuthority";
                    "type": {
                        "option": "pubkey";
                    };
                },
                {
                    "name": "newUpdateAuthority";
                    "type": {
                        "option": "pubkey";
                    };
                }
            ];
        },
        {
            "name": "useTokensForAction";
            "discriminator": [
                138,
                7,
                5,
                160,
                90,
                46,
                4,
                172
            ];
            "accounts": [
                {
                    "name": "basementState";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    98,
                                    97,
                                    115,
                                    101,
                                    109,
                                    101,
                                    110,
                                    116,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "userTokenAccount";
                    "writable": true;
                },
                {
                    "name": "tokenVault";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                "kind": "account";
                                "path": "basement_state.mint";
                                "account": "basementStateV0";
                            }
                        ];
                    };
                },
                {
                    "name": "user";
                    "signer": true;
                },
                {
                    "name": "actionAuthority";
                    "signer": true;
                },
                {
                    "name": "tokenProgram";
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            "args": [
                {
                    "name": "actionType";
                    "type": "string";
                },
                {
                    "name": "amount";
                    "type": "u64";
                }
            ];
        }
    ];
    "accounts": [
        {
            "name": "basementStateV0";
            "discriminator": [
                25,
                220,
                97,
                161,
                83,
                33,
                189,
                212
            ];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "invalidActionType";
            "msg": "Invalid action type";
        },
        {
            "code": 6001;
            "name": "insufficientTokens";
            "msg": "Insufficient tokens";
        }
    ];
    "types": [
        {
            "name": "basementStateV0";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "mintAuthority";
                        "type": "pubkey";
                    },
                    {
                        "name": "actionAuthority";
                        "type": "pubkey";
                    },
                    {
                        "name": "updateAuthority";
                        "type": "pubkey";
                    }
                ];
            };
        }
    ];
};
//# sourceMappingURL=basement_core.d.ts.map