import { Address, Slice, Cell, Dictionary } from "@ton/core";
export declare function configParseMasterAddress(slice: Slice | null | undefined): Address | null;
export declare function parseValidatorSet(slice: Slice): {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: null;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: bigint;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | undefined;
export declare function parseBridge(slice: Slice): {
    bridgeAddress: Address;
    oracleMultisigAddress: Address;
    oracles: Map<string, Buffer>;
    externalChainAddress: Buffer;
};
export declare function configParseMasterAddressRequired(slice: Slice | null | undefined): Address;
export declare function configParse5(slice: Slice | null | undefined): {
    blackholeAddr: Address | null;
    feeBurnNominator: number;
    feeBurnDenominator: number;
};
export declare function configParse13(slice: Slice | null | undefined): {
    deposit: bigint;
    bitPrice: bigint;
    cellPrice: bigint;
};
export declare function configParse15(slice: Slice | null | undefined): {
    validatorsElectedFor: number;
    electorsStartBefore: number;
    electorsEndBefore: number;
    stakeHeldFor: number;
};
export declare function configParse16(slice: Slice | null | undefined): {
    maxValidators: number;
    maxMainValidators: number;
    minValidators: number;
};
export declare function configParse17(slice: Slice | null | undefined): {
    minStake: bigint;
    maxStake: bigint;
    minTotalStake: bigint;
    maxStakeFactor: number;
};
export type StoragePrices = {
    utime_since: number;
    bit_price_ps: bigint;
    cell_price_ps: bigint;
    mc_bit_price_ps: bigint;
    mc_cell_price_ps: bigint;
};
export declare function configParse18(slice: Slice | null | undefined): StoragePrices[];
export declare function configParse8(slice: Slice | null | undefined): {
    version: number;
    capabilities: bigint;
};
export declare function configParse40(slice: Slice | null | undefined): {
    defaultFlatFine: bigint;
    defaultProportionaFine: bigint;
    severityFlatMult: number;
    severityProportionalMult: number;
    unfunishableInterval: number;
    longInterval: number;
    longFlatMult: number;
    longProportionalMult: number;
    mediumInterval: number;
    mediumFlatMult: number;
    mediumProportionalMult: number;
} | null;
export declare function configParseWorkchainDescriptor(slice: Slice): WorkchainDescriptor;
export type WorkchainDescriptor = {
    enabledSince: number;
    actialMinSplit: number;
    min_split: number;
    max_split: number;
    basic: boolean;
    active: boolean;
    accept_msgs: boolean;
    flags: number;
    zerostateRootHash: Buffer;
    zerostateFileHash: Buffer;
    version: number;
    format: {
        vmVersion: number;
        vmMode: bigint;
    };
};
export declare function configParse12(slice: Slice | null | undefined): Dictionary<number, WorkchainDescriptor>;
export declare function configParseValidatorSet(slice: Slice | null | undefined): {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: null;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: bigint;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | null | undefined;
export declare function configParseBridge(slice: Slice | null | undefined): {
    bridgeAddress: Address;
    oracleMultisigAddress: Address;
    oracles: Map<string, Buffer>;
    externalChainAddress: Buffer;
} | null;
export type GasLimitsPrices = ReturnType<typeof configParseGasLimitsPrices>;
export declare function configParseGasLimitsPrices(slice: Slice | null | undefined): {
    flatLimit: bigint;
    flatGasPrice: bigint;
    other: {
        gasPrice: bigint;
        gasLimit: bigint;
        specialGasLimit: bigint;
        gasCredit: bigint;
        blockGasLimit: bigint;
        freezeDueLimit: bigint;
        deleteDueLimit: bigint;
    } | {
        gasPrice: bigint;
        gasLimit: bigint;
        gasCredit: bigint;
        blockGasLimit: bigint;
        freezeDueLimit: bigint;
        deleteDueLimit: bigint;
        specialGasLimit?: undefined;
    };
};
export type MsgPrices = ReturnType<typeof configParseMsgPrices>;
export declare function configParseMsgPrices(slice: Slice | null | undefined): {
    lumpPrice: bigint;
    bitPrice: bigint;
    cellPrice: bigint;
    ihrPriceFactor: number;
    firstFrac: number;
    nextFrac: number;
};
export declare function configParse28(slice: Slice | null | undefined): {
    masterCatchainLifetime: number;
    shardCatchainLifetime: number;
    shardValidatorsLifetime: number;
    shardValidatorsCount: number;
    flags?: undefined;
    suffleMasterValidators?: undefined;
} | {
    flags: number;
    suffleMasterValidators: boolean;
    masterCatchainLifetime: number;
    shardCatchainLifetime: number;
    shardValidatorsLifetime: number;
    shardValidatorsCount: number;
};
export declare function configParse29(slice: Slice | null | undefined): {
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    flags?: undefined;
    newCatchainIds?: undefined;
    protoVersion?: undefined;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion?: undefined;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion: number;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion: number;
    catchainMaxBlocksCoeff: number;
};
export declare function parseProposalSetup(slice: Slice): {
    minTotalRounds: number;
    maxTotalRounds: number;
    minWins: number;
    maxLoses: number;
    minStoreSec: number;
    maxStoreSec: number;
    bitPrice: number;
    cellPrice: number;
};
export declare function parseVotingSetup(slice: Slice | null | undefined): {
    normalParams: {
        minTotalRounds: number;
        maxTotalRounds: number;
        minWins: number;
        maxLoses: number;
        minStoreSec: number;
        maxStoreSec: number;
        bitPrice: number;
        cellPrice: number;
    };
    criticalParams: {
        minTotalRounds: number;
        maxTotalRounds: number;
        minWins: number;
        maxLoses: number;
        minStoreSec: number;
        maxStoreSec: number;
        bitPrice: number;
        cellPrice: number;
    };
};
export declare function loadConfigParamById(configBase64: string, id: number): Cell;
export declare function loadConfigParamsAsSlice(configBase64: string): Map<number, Slice>;
export declare function parseFullConfig(configs: Map<number, Slice>): {
    configAddress: Address;
    electorAddress: Address;
    minterAddress: Address | null;
    feeCollectorAddress: Address | null;
    dnsRootAddress: Address | null;
    burningConfig: {
        blackholeAddr: Address | null;
        feeBurnNominator: number;
        feeBurnDenominator: number;
    };
    globalVersion: {
        version: number;
        capabilities: bigint;
    };
    workchains: Dictionary<number, WorkchainDescriptor>;
    voting: {
        normalParams: {
            minTotalRounds: number;
            maxTotalRounds: number;
            minWins: number;
            maxLoses: number;
            minStoreSec: number;
            maxStoreSec: number;
            bitPrice: number;
            cellPrice: number;
        };
        criticalParams: {
            minTotalRounds: number;
            maxTotalRounds: number;
            minWins: number;
            maxLoses: number;
            minStoreSec: number;
            maxStoreSec: number;
            bitPrice: number;
            cellPrice: number;
        };
    };
    validators: {
        minStake: bigint;
        maxStake: bigint;
        minTotalStake: bigint;
        maxStakeFactor: number;
        maxValidators: number;
        maxMainValidators: number;
        minValidators: number;
        validatorsElectedFor: number;
        electorsStartBefore: number;
        electorsEndBefore: number;
        stakeHeldFor: number;
    };
    storagePrices: StoragePrices[];
    gasPrices: {
        masterchain: {
            flatLimit: bigint;
            flatGasPrice: bigint;
            other: {
                gasPrice: bigint;
                gasLimit: bigint;
                specialGasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
            } | {
                gasPrice: bigint;
                gasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
                specialGasLimit?: undefined;
            };
        };
        workchain: {
            flatLimit: bigint;
            flatGasPrice: bigint;
            other: {
                gasPrice: bigint;
                gasLimit: bigint;
                specialGasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
            } | {
                gasPrice: bigint;
                gasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
                specialGasLimit?: undefined;
            };
        };
    };
    msgPrices: {
        masterchain: {
            lumpPrice: bigint;
            bitPrice: bigint;
            cellPrice: bigint;
            ihrPriceFactor: number;
            firstFrac: number;
            nextFrac: number;
        };
        workchain: {
            lumpPrice: bigint;
            bitPrice: bigint;
            cellPrice: bigint;
            ihrPriceFactor: number;
            firstFrac: number;
            nextFrac: number;
        };
    };
    validatorSets: {
        prevValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        prevTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        currentValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        currentTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        nextValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        nextTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
    };
    validatorsPunish: {
        defaultFlatFine: bigint;
        defaultProportionaFine: bigint;
        severityFlatMult: number;
        severityProportionalMult: number;
        unfunishableInterval: number;
        longInterval: number;
        longFlatMult: number;
        longProportionalMult: number;
        mediumInterval: number;
        mediumFlatMult: number;
        mediumProportionalMult: number;
    } | null;
    bridges: {
        ethereum: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
        binance: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
        polygon: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
    };
    catchain: {
        masterCatchainLifetime: number;
        shardCatchainLifetime: number;
        shardValidatorsLifetime: number;
        shardValidatorsCount: number;
        flags?: undefined;
        suffleMasterValidators?: undefined;
    } | {
        flags: number;
        suffleMasterValidators: boolean;
        masterCatchainLifetime: number;
        shardCatchainLifetime: number;
        shardValidatorsLifetime: number;
        shardValidatorsCount: number;
    };
    consensus: {
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        flags?: undefined;
        newCatchainIds?: undefined;
        protoVersion?: undefined;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion?: undefined;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion: number;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion: number;
        catchainMaxBlocksCoeff: number;
    };
};
