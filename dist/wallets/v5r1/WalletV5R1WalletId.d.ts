import { Builder, Slice } from '@ton/core';
/**
 * schema:
 * wallet_id -- int32
 * wallet_id = global_id ^ context_id
 * context_id_client$1 = wc:int8 wallet_version:uint8 counter:uint15
 * context_id_backoffice$0 = counter:uint31
 *
 *
 * calculated default values serialisation:
 *
 * global_id = -239, workchain = 0, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 2147483409
 *
 * global_id = -239, workchain = -1, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 8388369
 *
 * global_id = -3, workchain = 0, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 2147483645
 *
 * global_id = -3, workchain = -1, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 8388605
 */
export interface WalletIdV5R1<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext = WalletIdV5R1ClientContext | WalletIdV5R1CustomContext> {
    /**
     * -239 is mainnet, -3 is testnet
     */
    readonly networkGlobalId: number;
    readonly context: C;
}
export interface WalletIdV5R1ClientContext {
    readonly walletVersion: 'v5r1';
    readonly workchain: number;
    readonly subwalletNumber: number;
}
/**
 * 31-bit unsigned integer
 */
export type WalletIdV5R1CustomContext = number;
export declare function isWalletIdV5R1ClientContext(context: WalletIdV5R1ClientContext | WalletIdV5R1CustomContext): context is WalletIdV5R1ClientContext;
/**
 * @param value serialized wallet id
 * @param networkGlobalId -239 is mainnet, -3 is testnet
 */
export declare function loadWalletIdV5R1(value: bigint | Buffer | Slice, networkGlobalId: number): WalletIdV5R1;
export declare function storeWalletIdV5R1(walletId: WalletIdV5R1): (builder: Builder) => Builder;
