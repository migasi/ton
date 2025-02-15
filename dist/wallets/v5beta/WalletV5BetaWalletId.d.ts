import { Builder, Slice } from '@ton/core';
export interface WalletIdV5Beta {
    readonly walletVersion: 'v5';
    /**
     * -239 is mainnet, -3 is testnet
     */
    readonly networkGlobalId: number;
    readonly workchain: number;
    readonly subwalletNumber: number;
}
export declare function loadWalletIdV5Beta(value: bigint | Buffer | Slice): WalletIdV5Beta;
export declare function storeWalletIdV5Beta(walletId: WalletIdV5Beta): (builder: Builder) => void;
