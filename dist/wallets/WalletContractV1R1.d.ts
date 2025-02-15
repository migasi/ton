/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ton/core";
import { Maybe } from "../utils/maybe";
export declare class WalletContractV1R1 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV1R1;
    readonly workchain: number;
    readonly publicKey: Buffer;
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
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe<MessageRelaxed>;
        sendMode?: Maybe<SendMode>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe<MessageRelaxed>;
        sendMode?: Maybe<SendMode>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}
