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
import { OutActionWalletV5 } from "../v5beta/WalletV5OutActions";
import { WalletIdV5R1, WalletIdV5R1ClientContext, WalletIdV5R1CustomContext } from "./WalletV5R1WalletId";
export type WalletV5R1BasicSendArgs = {
    seqno: number;
    timeout?: Maybe<number>;
};
export type WalletV5R1SendArgsSinged = WalletV5R1BasicSendArgs & SendArgsSigned & {
    authType?: 'external' | 'internal';
};
export type WalletV5R1SendArgsSignable = WalletV5R1BasicSendArgs & SendArgsSignable & {
    authType?: 'external' | 'internal';
};
export type Wallet5VR1SendArgsExtensionAuth = WalletV5R1BasicSendArgs & {
    authType: 'extension';
    queryId?: bigint;
};
export type WalletV5R1SendArgs = WalletV5R1SendArgsSinged | WalletV5R1SendArgsSignable | Wallet5VR1SendArgsExtensionAuth;
export type WalletV5R1PackedCell<T> = T extends WalletV5R1SendArgsSignable ? Promise<Cell> : Cell;
export declare class WalletContractV5R1 implements Contract {
    readonly publicKey: Buffer;
    readonly walletId: WalletIdV5R1<WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>;
    static OpCodes: {
        auth_extension: number;
        auth_signed_external: number;
        auth_signed_internal: number;
    };
    static create<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>(args: C extends WalletIdV5R1ClientContext ? {
        walletId?: Maybe<WalletIdV5R1<C>>;
        publicKey: Buffer;
    } : {
        workchain?: number;
        publicKey: Buffer;
        walletId?: Maybe<Partial<WalletIdV5R1<C>>>;
    }): WalletContractV5R1;
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
    sendTransfer(provider: ContractProvider, args: WalletV5R1SendArgs & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): Promise<void>;
    /**
     * Sign and send add extension request
     */
    sendAddExtension(provider: ContractProvider, args: WalletV5R1SendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send remove extension request
     */
    sendRemoveExtension(provider: ContractProvider, args: WalletV5R1SendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    private createActions;
    /**
     * Create signed transfer
     */
    createTransfer<T extends WalletV5R1SendArgs>(args: T & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed add extension request
     */
    createAddExtension<T extends WalletV5R1SendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed remove extension request
     */
    createRemoveExtension<T extends WalletV5R1SendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed request or extension auth request
     */
    createRequest<T extends WalletV5R1SendArgs>(args: T & {
        actions: OutActionWalletV5[];
    }): WalletV5R1PackedCell<T>;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}
