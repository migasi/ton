/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TonCache } from './TonCache';
import { AxiosAdapter } from 'axios';
import { Address, Cell, TupleItem } from '@ton/core';
import { z } from 'zod';
declare const message: z.ZodObject<{
    source: z.ZodString;
    destination: z.ZodString;
    value: z.ZodString;
    fwd_fee: z.ZodString;
    ihr_fee: z.ZodString;
    created_lt: z.ZodString;
    body_hash: z.ZodString;
    msg_data: z.ZodUnion<[z.ZodObject<{
        '@type': z.ZodLiteral<"msg.dataRaw">;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        '@type': "msg.dataRaw";
        body: string;
    }, {
        '@type': "msg.dataRaw";
        body: string;
    }>, z.ZodObject<{
        '@type': z.ZodLiteral<"msg.dataText">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        '@type': "msg.dataText";
        text: string;
    }, {
        '@type': "msg.dataText";
        text: string;
    }>, z.ZodObject<{
        '@type': z.ZodLiteral<"msg.dataDecryptedText">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        '@type': "msg.dataDecryptedText";
        text: string;
    }, {
        '@type': "msg.dataDecryptedText";
        text: string;
    }>, z.ZodObject<{
        '@type': z.ZodLiteral<"msg.dataEncryptedText">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        '@type': "msg.dataEncryptedText";
        text: string;
    }, {
        '@type': "msg.dataEncryptedText";
        text: string;
    }>]>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: string;
    fwd_fee: string;
    source: string;
    destination: string;
    ihr_fee: string;
    created_lt: string;
    body_hash: string;
    msg_data: {
        '@type': "msg.dataRaw";
        body: string;
    } | {
        '@type': "msg.dataText";
        text: string;
    } | {
        '@type': "msg.dataDecryptedText";
        text: string;
    } | {
        '@type': "msg.dataEncryptedText";
        text: string;
    };
    message?: string | undefined;
}, {
    value: string;
    fwd_fee: string;
    source: string;
    destination: string;
    ihr_fee: string;
    created_lt: string;
    body_hash: string;
    msg_data: {
        '@type': "msg.dataRaw";
        body: string;
    } | {
        '@type': "msg.dataText";
        text: string;
    } | {
        '@type': "msg.dataDecryptedText";
        text: string;
    } | {
        '@type': "msg.dataEncryptedText";
        text: string;
    };
    message?: string | undefined;
}>;
declare const getTransactions: z.ZodArray<z.ZodObject<{
    data: z.ZodString;
    utime: z.ZodNumber;
    transaction_id: z.ZodObject<{
        lt: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        lt: string;
        hash: string;
    }, {
        lt: string;
        hash: string;
    }>;
    fee: z.ZodString;
    storage_fee: z.ZodString;
    other_fee: z.ZodString;
    in_msg: z.ZodUnion<[z.ZodUndefined, z.ZodObject<{
        source: z.ZodString;
        destination: z.ZodString;
        value: z.ZodString;
        fwd_fee: z.ZodString;
        ihr_fee: z.ZodString;
        created_lt: z.ZodString;
        body_hash: z.ZodString;
        msg_data: z.ZodUnion<[z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataRaw">;
            body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataRaw";
            body: string;
        }, {
            '@type': "msg.dataRaw";
            body: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataText";
            text: string;
        }, {
            '@type': "msg.dataText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataDecryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataEncryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }, {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }>]>;
    out_msgs: z.ZodArray<z.ZodObject<{
        source: z.ZodString;
        destination: z.ZodString;
        value: z.ZodString;
        fwd_fee: z.ZodString;
        ihr_fee: z.ZodString;
        created_lt: z.ZodString;
        body_hash: z.ZodString;
        msg_data: z.ZodUnion<[z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataRaw">;
            body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataRaw";
            body: string;
        }, {
            '@type': "msg.dataRaw";
            body: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataText";
            text: string;
        }, {
            '@type': "msg.dataText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataDecryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataEncryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }, {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: string;
    storage_fee: string;
    utime: number;
    transaction_id: {
        lt: string;
        hash: string;
    };
    fee: string;
    other_fee: string;
    out_msgs: {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }[];
    in_msg?: {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    } | undefined;
}, {
    data: string;
    storage_fee: string;
    utime: number;
    transaction_id: {
        lt: string;
        hash: string;
    };
    fee: string;
    other_fee: string;
    out_msgs: {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    }[];
    in_msg?: {
        value: string;
        fwd_fee: string;
        source: string;
        destination: string;
        ihr_fee: string;
        created_lt: string;
        body_hash: string;
        msg_data: {
            '@type': "msg.dataRaw";
            body: string;
        } | {
            '@type': "msg.dataText";
            text: string;
        } | {
            '@type': "msg.dataDecryptedText";
            text: string;
        } | {
            '@type': "msg.dataEncryptedText";
            text: string;
        };
        message?: string | undefined;
    } | undefined;
}>, "many">;
export type HTTPTransaction = z.TypeOf<typeof getTransactions>[number];
export type HTTPMessage = z.TypeOf<typeof message>;
export interface HttpApiParameters {
    /**
     * HTTP request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * API Key
     */
    apiKey?: string;
    /**
     * Adapter for Axios
     */
    adapter?: AxiosAdapter;
}
export declare class HttpApi {
    readonly endpoint: string;
    readonly cache: TonCache;
    private readonly parameters;
    private shardCache;
    private shardLoader;
    private shardTransactionsCache;
    private shardTransactionsLoader;
    constructor(endpoint: string, parameters?: HttpApiParameters);
    getAddressInformation(address: Address): Promise<{
        data: string;
        code: string;
        balance: string | number;
        state: "active" | "uninitialized" | "frozen";
        last_transaction_id: {
            '@type': "internal.transactionId";
            lt: string;
            hash: string;
        };
        block_id: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        sync_utime: number;
    }>;
    getTransactions(address: Address, opts: {
        limit: number;
        lt?: string;
        hash?: string;
        to_lt?: string;
        inclusive?: boolean;
        archival?: boolean;
    }): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }[]>;
    getMasterchainInfo(): Promise<{
        state_root_hash: string;
        last: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        init: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
    }>;
    getShards(seqno: number): Promise<{
        '@type': "ton.blockIdExt";
        workchain: number;
        shard: string;
        seqno: number;
        root_hash: string;
        file_hash: string;
    }[]>;
    getBlockTransactions(workchain: number, seqno: number, shard: string): Promise<{
        id: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        req_count: number;
        incomplete: boolean;
        transactions: {
            '@type': "blocks.shortTxId";
            lt: string;
            hash: string;
            mode: number;
            account: string;
        }[];
    }>;
    getTransaction(address: Address, lt: string, hash: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    } | null>;
    callGetMethod(address: Address, method: string | number, stack: TupleItem[]): Promise<{
        gas_used: number;
        exit_code: number;
        stack: unknown[];
    }>;
    sendBoc(body: Buffer): Promise<void>;
    estimateFee(address: Address, args: {
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
    tryLocateResultTx(source: Address, destination: Address, created_lt: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }>;
    tryLocateSourceTx(source: Address, destination: Address, created_lt: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }>;
    private doCall;
}
export {};
