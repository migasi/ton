import { TonClient } from '../index';
import { Address, ContractProvider, Dictionary, Sender, StateInit } from '@ton/core';
import { MultisigOrder } from './MultisigOrder';
export declare class MultisigWallet {
    owners: Dictionary<number, Buffer>;
    workchain: number;
    walletId: number;
    k: number;
    address: Address;
    provider: ContractProvider | null;
    init: StateInit;
    constructor(publicKeys: Buffer[], workchain: number, walletId: number, k: number, opts?: {
        address?: Address;
        provider?: ContractProvider;
        client?: TonClient;
    });
    static fromAddress(address: Address, opts: {
        provider?: ContractProvider;
        client?: TonClient;
    }): Promise<MultisigWallet>;
    deployExternal(provider?: ContractProvider): Promise<void>;
    deployInternal(sender: Sender, value?: bigint): Promise<void>;
    sendOrder(order: MultisigOrder, secretKey: Buffer, provider?: ContractProvider): Promise<void>;
    sendOrderWithoutSecretKey(order: MultisigOrder, signature: Buffer, ownerId: number, provider?: ContractProvider): Promise<void>;
    getOwnerIdByPubkey(publicKey: Buffer): number;
}
