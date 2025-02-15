import { Cell } from '@ton/core';
import { MultisigWallet } from './MultisigWallet';
export declare class MultisigOrder {
    readonly payload: Cell;
    signatures: {
        [key: number]: Buffer;
    };
    private constructor();
    static fromCell(cell: Cell): MultisigOrder;
    static fromPayload(payload: Cell): MultisigOrder;
    addSignature(ownerId: number, signature: Buffer, multisig: MultisigWallet): void;
    sign(ownerId: number, secretKey: Buffer): Buffer;
    unionSignatures(other: MultisigOrder): void;
    clearSignatures(): void;
    toCell(ownerId: number): Cell;
}
