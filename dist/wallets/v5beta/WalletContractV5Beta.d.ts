/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ton/core";
import { Maybe } from "../../utils/maybe";
import { SendArgsSignable, SendArgsSigned } from "../signing/singer";
import { OutActionWalletV5 } from "./WalletV5OutActions";
import { WalletIdV5Beta } from "./WalletV5BetaWalletId";
export type WalletV5BetaBasicSendArgs = {
    seqno: number;
    timeout?: Maybe<number>;
};
export type WalletV5BetaSendArgsSigned = WalletV5BetaBasicSendArgs & SendArgsSigned & {
    authType?: 'external' | 'internal';
};
export type WalletV5BetaSendArgsSignable = WalletV5BetaBasicSendArgs & SendArgsSignable & {
    authType?: 'external' | 'internal';
};
export type WalletV5BetaSendArgsExtensionAuth = WalletV5BetaBasicSendArgs & {
    authType: 'extension';
};
export type WalletV5BetaSendArgs = WalletV5BetaSendArgsSigned | WalletV5BetaSendArgsSignable | WalletV5BetaSendArgsExtensionAuth;
export type WalletV5BetaPackedCell<T> = T extends WalletV5BetaSendArgsSignable ? Promise<Cell> : Cell;
/**
 * @deprecated
 * use WalletContractV5R1 instead
 */
export declare class WalletContractV5Beta implements Contract {
    readonly walletId: WalletIdV5Beta;
    readonly publicKey: Buffer;
    static OpCodes: {
        auth_extension: number;
        auth_signed_external: number;
        auth_signed_internal: number;
    };
    static create(args: {
        walletId?: Partial<WalletIdV5Beta>;
        publicKey: Buffer;
    }): WalletContractV5Beta;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Get Wallet Extensions
     */
    getExtensions(provider: ContractProvider): Promise<Cell | null>;
    /**
     * Get Wallet Extensions
     */
    getExtensionsArray(provider: ContractProvider): Promise<Address[]>;
    /**
     * Get is secret-key authentication enabled
     */
    getIsSecretKeyAuthEnabled(provider: ContractProvider): Promise<boolean>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): Promise<void>;
    /**
     * Sign and send add extension request
     */
    sendAddExtension(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send remove extension request
     */
    sendRemoveExtension(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send actions batch
     */
    sendActionsBatch(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        actions: OutActionWalletV5[];
    }): Promise<void>;
    private createActions;
    /**
     * Create signed transfer
     */
    createTransfer<T extends WalletV5BetaSendArgs>(args: T & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed add extension request
     */
    createAddExtension<T extends WalletV5BetaSendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed remove extension request
     */
    createRemoveExtension<T extends WalletV5BetaSendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed request or extension auth request
     */
    createRequest<T extends WalletV5BetaSendArgs>(args: T & {
        actions: OutActionWalletV5[];
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}
