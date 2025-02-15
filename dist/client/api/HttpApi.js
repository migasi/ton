"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpApi = void 0;
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const TonCache_1 = require("./TonCache");
const dataloader_1 = __importDefault(require("dataloader"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const version = require('../../../package.json').version;
const blockIdExt = zod_1.z.object({
    '@type': zod_1.z.literal('ton.blockIdExt'),
    workchain: zod_1.z.number(),
    shard: zod_1.z.string(),
    seqno: zod_1.z.number(),
    root_hash: zod_1.z.string(),
    file_hash: zod_1.z.string()
});
const addressInformation = zod_1.z.object({
    balance: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]),
    state: zod_1.z.union([zod_1.z.literal('active'), zod_1.z.literal('uninitialized'), zod_1.z.literal('frozen')]),
    data: zod_1.z.string(),
    code: zod_1.z.string(),
    last_transaction_id: zod_1.z.object({
        '@type': zod_1.z.literal('internal.transactionId'),
        lt: zod_1.z.string(),
        hash: zod_1.z.string()
    }),
    block_id: blockIdExt,
    sync_utime: zod_1.z.number()
});
const bocResponse = zod_1.z.object({
    '@type': zod_1.z.literal('ok')
});
const feeResponse = zod_1.z.object({
    '@type': zod_1.z.literal('query.fees'),
    source_fees: zod_1.z.object({
        '@type': zod_1.z.literal('fees'),
        in_fwd_fee: zod_1.z.number(),
        storage_fee: zod_1.z.number(),
        gas_fee: zod_1.z.number(),
        fwd_fee: zod_1.z.number()
    })
});
const callGetMethod = zod_1.z.object({
    gas_used: zod_1.z.number(),
    exit_code: zod_1.z.number(),
    stack: zod_1.z.array(zod_1.z.unknown())
});
const messageData = zod_1.z.union([
    zod_1.z.object({
        '@type': zod_1.z.literal('msg.dataRaw'),
        'body': zod_1.z.string()
    }),
    zod_1.z.object({
        '@type': zod_1.z.literal('msg.dataText'),
        'text': zod_1.z.string()
    }),
    zod_1.z.object({
        '@type': zod_1.z.literal('msg.dataDecryptedText'),
        'text': zod_1.z.string()
    }),
    zod_1.z.object({
        '@type': zod_1.z.literal('msg.dataEncryptedText'),
        'text': zod_1.z.string()
    })
]);
const message = zod_1.z.object({
    source: zod_1.z.string(),
    destination: zod_1.z.string(),
    value: zod_1.z.string(),
    fwd_fee: zod_1.z.string(),
    ihr_fee: zod_1.z.string(),
    created_lt: zod_1.z.string(),
    body_hash: zod_1.z.string(),
    msg_data: messageData,
    message: zod_1.z.string().optional()
});
const transaction = zod_1.z.object({
    data: zod_1.z.string(),
    utime: zod_1.z.number(),
    transaction_id: zod_1.z.object({
        lt: zod_1.z.string(),
        hash: zod_1.z.string()
    }),
    fee: zod_1.z.string(),
    storage_fee: zod_1.z.string(),
    other_fee: zod_1.z.string(),
    in_msg: zod_1.z.union([zod_1.z.undefined(), message]),
    out_msgs: zod_1.z.array(message)
});
const getTransactions = zod_1.z.array(transaction);
const getMasterchain = zod_1.z.object({
    state_root_hash: zod_1.z.string(),
    last: blockIdExt,
    init: blockIdExt
});
const getShards = zod_1.z.object({
    shards: zod_1.z.array(blockIdExt)
});
const blockShortTxt = zod_1.z.object({
    '@type': zod_1.z.literal('blocks.shortTxId'),
    mode: zod_1.z.number(),
    account: zod_1.z.string(),
    lt: zod_1.z.string(),
    hash: zod_1.z.string()
});
const getBlockTransactions = zod_1.z.object({
    id: blockIdExt,
    req_count: zod_1.z.number(),
    incomplete: zod_1.z.boolean(),
    transactions: zod_1.z.array(blockShortTxt)
});
class TypedCache {
    constructor(namespace, cache, codec, keyEncoder) {
        this.namespace = namespace;
        this.cache = cache;
        this.codec = codec;
        this.keyEncoder = keyEncoder;
    }
    async get(key) {
        let ex = await this.cache.get(this.namespace, this.keyEncoder(key));
        if (ex) {
            let decoded = this.codec.safeParse(JSON.parse(ex));
            if (decoded.success) {
                return decoded.data;
            }
        }
        return null;
    }
    async set(key, value) {
        if (value !== null) {
            await this.cache.set(this.namespace, this.keyEncoder(key), JSON.stringify(value));
        }
        else {
            await this.cache.set(this.namespace, this.keyEncoder(key), null);
        }
    }
}
class HttpApi {
    constructor(endpoint, parameters) {
        this.endpoint = endpoint;
        this.cache = new TonCache_1.InMemoryCache();
        this.parameters = {
            timeout: parameters?.timeout || 30000, // 30 seconds by default
            apiKey: parameters?.apiKey,
            adapter: parameters?.adapter
        };
        // Shard
        this.shardCache = new TypedCache('ton-shard', this.cache, zod_1.z.array(blockIdExt), (src) => src + '');
        this.shardLoader = new dataloader_1.default(async (src) => {
            return await Promise.all(src.map(async (v) => {
                const cached = await this.shardCache.get(v);
                if (cached) {
                    return cached;
                }
                let loaded = (await this.doCall('shards', { seqno: v }, getShards)).shards;
                await this.shardCache.set(v, loaded);
                return loaded;
            }));
        });
        // Shard Transactions
        this.shardTransactionsCache = new TypedCache('ton-shard-tx', this.cache, getBlockTransactions, (src) => src.workchain + ':' + src.shard + ':' + src.seqno);
        this.shardTransactionsLoader = new dataloader_1.default(async (src) => {
            return await Promise.all(src.map(async (v) => {
                const cached = await this.shardTransactionsCache.get(v);
                if (cached) {
                    return cached;
                }
                let loaded = await this.doCall('getBlockTransactions', { workchain: v.workchain, seqno: v.seqno, shard: v.shard }, getBlockTransactions);
                await this.shardTransactionsCache.set(v, loaded);
                return loaded;
            }));
        }, { cacheKeyFn: (src) => src.workchain + ':' + src.shard + ':' + src.seqno });
    }
    getAddressInformation(address) {
        return this.doCall('getAddressInformation', { address: address.toString() }, addressInformation);
    }
    async getTransactions(address, opts) {
        const inclusive = opts.inclusive;
        delete opts.inclusive;
        // Convert hash
        let hash = undefined;
        if (opts.hash) {
            hash = Buffer.from(opts.hash, 'base64').toString('hex');
        }
        // Adjust limit
        let limit = opts.limit;
        if (opts.hash && opts.lt && inclusive !== true) {
            limit++;
        }
        // Do request
        let res = await this.doCall('getTransactions', { address: address.toString(), ...opts, limit, hash }, getTransactions);
        if (res.length > limit) {
            res = res.slice(0, limit);
        }
        // Adjust result
        if (opts.hash && opts.lt && inclusive !== true) {
            res.shift();
            return res;
        }
        else {
            return res;
        }
    }
    async getMasterchainInfo() {
        return await this.doCall('getMasterchainInfo', {}, getMasterchain);
    }
    async getShards(seqno) {
        return await this.shardLoader.load(seqno);
    }
    async getBlockTransactions(workchain, seqno, shard) {
        return await this.shardTransactionsLoader.load({ workchain, seqno, shard });
    }
    async getTransaction(address, lt, hash) {
        let convHash = Buffer.from(hash, 'base64').toString('hex');
        let res = await this.doCall('getTransactions', { address: address.toString(), lt, hash: convHash, limit: 1 }, getTransactions);
        let ex = res.find((v) => v.transaction_id.lt === lt && v.transaction_id.hash === hash);
        if (ex) {
            return ex;
        }
        else {
            return null;
        }
    }
    async callGetMethod(address, method, stack) {
        return await this.doCall('runGetMethod', { address: address.toString(), method, stack: serializeStack(stack) }, callGetMethod);
    }
    async sendBoc(body) {
        await this.doCall('sendBoc', { boc: body.toString('base64') }, bocResponse);
    }
    async estimateFee(address, args) {
        return await this.doCall('estimateFee', {
            address: address.toString(),
            body: args.body.toBoc().toString('base64'),
            'init_data': args.initData ? args.initData.toBoc().toString('base64') : '',
            'init_code': args.initCode ? args.initCode.toBoc().toString('base64') : '',
            ignore_chksig: args.ignoreSignature
        }, feeResponse);
    }
    async tryLocateResultTx(source, destination, created_lt) {
        return await this.doCall('tryLocateResultTx', { source: source.toString(), destination: destination.toString(), created_lt }, transaction);
    }
    async tryLocateSourceTx(source, destination, created_lt) {
        return await this.doCall('tryLocateSourceTx', { source: source.toString(), destination: destination.toString(), created_lt }, transaction);
    }
    async doCall(method, body, codec) {
        let headers = {
            'Content-Type': 'application/json',
            'X-Ton-Client-Version': version,
        };
        if (this.parameters.apiKey) {
            headers['X-API-Key'] = this.parameters.apiKey;
        }
        let res = await axios_1.default.post(this.endpoint, JSON.stringify({
            id: '1',
            jsonrpc: '2.0',
            method: method,
            params: body
        }), {
            headers,
            timeout: this.parameters.timeout,
            adapter: this.parameters.adapter
        });
        if (res.status !== 200 || !res.data.ok) {
            throw Error('Received error: ' + JSON.stringify(res.data));
        }
        let decoded = codec.safeParse(res.data.result);
        if (decoded.success) {
            return decoded.data;
        }
        else {
            throw Error('Malformed response: ' + decoded.error.format()._errors.join(', '));
        }
    }
}
exports.HttpApi = HttpApi;
function serializeStack(src) {
    let stack = [];
    for (let s of src) {
        if (s.type === 'int') {
            stack.push(['num', s.value.toString()]);
        }
        else if (s.type === 'cell') {
            stack.push(['tvm.Cell', s.cell.toBoc().toString('base64')]);
        }
        else if (s.type === 'slice') {
            stack.push(['tvm.Slice', s.cell.toBoc().toString('base64')]);
        }
        else if (s.type === 'builder') {
            stack.push(['tvm.Builder', s.cell.toBoc().toString('base64')]);
        }
        else {
            throw Error('Unsupported stack item type: ' + s.type);
        }
    }
    return stack;
}
