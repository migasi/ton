import { Address, Contract, ContractProvider } from "@ton/core";
export declare class ElectorContract implements Contract {
    readonly address: Address;
    static create(): ElectorContract;
    constructor();
    getReturnedStake(provider: ContractProvider, address: Address): Promise<bigint>;
    getPastElectionsList(provider: ContractProvider): Promise<{
        id: number;
        unfreezeAt: number;
        stakeHeld: number;
    }[]>;
    getPastElections(provider: ContractProvider): Promise<{
        id: number;
        unfreezeAt: number;
        stakeHeld: number;
        totalStake: bigint;
        bonuses: bigint;
        frozen: Map<string, {
            address: Address;
            weight: bigint;
            stake: bigint;
        }>;
    }[]>;
    getElectionEntities(provider: ContractProvider): Promise<{
        minStake: bigint;
        allStakes: bigint;
        endElectionsTime: number;
        startWorkTime: number;
        entities: {
            pubkey: Buffer;
            stake: bigint;
            address: Address;
            adnl: Buffer;
        }[];
    } | null>;
    getActiveElectionId(provider: ContractProvider): Promise<number | null>;
    getComplaints(provider: ContractProvider, electionId: number): Promise<{
        id: bigint;
        publicKey: Buffer;
        createdAt: number;
        severity: number;
        paid: bigint;
        suggestedFine: bigint;
        suggestedFinePart: bigint;
        rewardAddress: Address;
        votes: number[];
        remainingWeight: bigint;
        vsetId: bigint;
    }[]>;
}
