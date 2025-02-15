/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HttpApi } from "./api/HttpApi";
import { AxiosAdapter } from 'axios';
import { Address, Cell, Contract, ContractProvider, Message, Transaction, TupleItem, TupleReader, StateInit, OpenedContract } from '@ton/core';
export type TonClientParameters = {
    /**
     * API Endpoint
     */
    endpoint: string;
    /**
     * HTTP request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * API Key
     */
    apiKey?: string;
    /**
     * HTTP Adapter for axios
     */
    httpAdapter?: AxiosAdapter;
};
export declare class TonClient {
    readonly parameters: TonClientParameters;
    protected api: HttpApi;
    constructor(parameters: TonClientParameters);
    /**
     * Get Address Balance
     * @param address address for balance check
     * @returns balance
     */
    getBalance(address: Address): Promise<bigint>;
    /**
     * Invoke get method
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     */
    runMethod(address: Address, name: string | number, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Invoke get method
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     * @deprecated use runMethod instead
     */
    callGetMethod(address: Address, name: string | number, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Invoke get method that returns error code instead of throwing error
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
    */
    runMethodWithError(address: Address, name: string, params?: any[]): Promise<{
        gas_used: number;
        stack: TupleReader;
        exit_code: number;
    }>;
    /**
     * Invoke get method that returns error code instead of throwing error
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     * @deprecated use runMethodWithError instead
     */
    callGetMethodWithError(address: Address, name: string, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Get transactions
     * @param address address
     */
    getTransactions(address: Address, opts: {
        limit: number;
        lt?: string;
        hash?: string;
        to_lt?: string;
        inclusive?: boolean;
        archival?: boolean;
    }): Promise<Transaction[]>;
    /**
     * Get transaction by it's id
     * @param address address
     * @param lt logical time
     * @param hash transaction hash
     * @returns transaction or null if not exist
     */
    getTransaction(address: Address, lt: string, hash: string): Promise<Transaction | null>;
    /**
     * Locate outcoming transaction of destination address by incoming message
     * @param source message source address
     * @param destination message destination address
     * @param created_lt message's created lt
     * @returns transaction
     */
    tryLocateResultTx(source: Address, destination: Address, created_lt: string): Promise<Transaction>;
    /**
     * Locate incoming transaction of source address by outcoming message
     * @param source message source address
     * @param destination message destination address
     * @param created_lt message's created lt
     * @returns transaction
     */
    tryLocateSourceTx(source: Address, destination: Address, created_lt: string): Promise<Transaction>;
    /**
     * Fetch latest masterchain info
     * @returns masterchain info
     */
    getMasterchainInfo(): Promise<{
        workchain: number;
        shard: string;
        initSeqno: number;
        latestSeqno: number;
    }>;
    /**
     * Fetch latest workchain shards
     * @param seqno masterchain seqno
     */
    getWorkchainShards(seqno: number): Promise<{
        workchain: number;
        shard: string;
        seqno: number;
    }[]>;
    /**
     * Fetch transactions inf shards
     * @param workchain
     * @param seqno
     * @param shard
     */
    getShardTransactions(workchain: number, seqno: number, shard: string): Promise<{
        account: Address;
        lt: string;
        hash: string;
    }[]>;
    /**
     * Send message to a network
     * @param src source message
     */
    sendMessage(src: Message): Promise<string>;
    /**
     * Send file to a network
     * @param src source file
     */
    sendFile(src: Buffer): Promise<void>;
    /**
     * Estimate fees for external message
     * @param address target address
     * @returns
     */
    estimateExternalMessageFee(address: Address, args: {
        body: Cell;
        initCode: Cell | null;
        initData: Cell | null;
        ignoreSignature: boolean;
    }): Promise<{
        '@type': "query.fees";
        source_fees: {
            '@type': "fees";
            in_fwd_fee: number;
            storage_fee: number;
            gas_fee: number;
            fwd_fee: number;
        };
    }>;
    /**
     * Send external message to contract
     * @param contract contract to send message
     * @param src message body
     */
    sendExternalMessage(contract: Contract, src: Cell): Promise<string>;
    /**
     * Check if contract is deployed
     * @param address addres to check
     * @returns true if contract is in active state
     */
    isContractDeployed(address: Address): Promise<boolean>;
    /**
     * Resolves contract state
     * @param address contract address
     */
    getContractState(address: Address): Promise<{
        balance: bigint;
        state: "active" | "uninitialized" | "frozen";
        code: Buffer | null;
        data: Buffer | null;
        lastTransaction: {
            lt: string;
            hash: string;
        } | null;
        blockId: {
            workchain: number;
            shard: string;
            seqno: number;
        };
        timestampt: number;
    }>;
    /**
     * Open contract
     * @param src source contract
     * @returns contract
     */
    open<T extends Contract>(src: T): OpenedContract<T>;
    /**
     * Create a provider
     * @param address address
     * @param init optional init
     * @returns provider
     */
    provider(address: Address, init?: StateInit | null): ContractProvider;
}
