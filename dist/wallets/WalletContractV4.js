"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletContractV4 = void 0;
const core_1 = require("@ton/core");
const createWalletTransfer_1 = require("./signing/createWalletTransfer");
class WalletContractV4 {
    static create(args) {
        return new WalletContractV4(args.workchain, args.publicKey, args.walletId);
    }
    constructor(workchain, publicKey, walletId) {
        // Resolve parameters
        this.workchain = workchain;
        this.publicKey = publicKey;
        if (walletId !== null && walletId !== undefined) {
            this.walletId = walletId;
        }
        else {
            this.walletId = 698983191 + workchain;
        }
        // Build initial code and data
        let code = core_1.Cell.fromBoc(Buffer.from('te6ccgECFAEAAtQAART/APSkE/S88sgLAQIBIAIDAgFIBAUE+PKDCNcYINMf0x/THwL4I7vyZO1E0NMf0x/T//QE0VFDuvKhUVG68qIF+QFUEGT5EPKj+AAkpMjLH1JAyx9SMMv/UhD0AMntVPgPAdMHIcAAn2xRkyDXSpbTB9QC+wDoMOAhwAHjACHAAuMAAcADkTDjDQOkyMsfEssfy/8QERITAubQAdDTAyFxsJJfBOAi10nBIJJfBOAC0x8hghBwbHVnvSKCEGRzdHK9sJJfBeAD+kAwIPpEAcjKB8v/ydDtRNCBAUDXIfQEMFyBAQj0Cm+hMbOSXwfgBdM/yCWCEHBsdWe6kjgw4w0DghBkc3RyupJfBuMNBgcCASAICQB4AfoA9AQw+CdvIjBQCqEhvvLgUIIQcGx1Z4MesXCAGFAEywUmzxZY+gIZ9ADLaRfLH1Jgyz8gyYBA+wAGAIpQBIEBCPRZMO1E0IEBQNcgyAHPFvQAye1UAXKwjiOCEGRzdHKDHrFwgBhQBcsFUAPPFiP6AhPLassfyz/JgED7AJJfA+ICASAKCwBZvSQrb2omhAgKBrkPoCGEcNQICEekk30pkQzmkD6f+YN4EoAbeBAUiYcVnzGEAgFYDA0AEbjJftRNDXCx+AA9sp37UTQgQFA1yH0BDACyMoHy//J0AGBAQj0Cm+hMYAIBIA4PABmtznaiaEAga5Drhf/AABmvHfaiaEAQa5DrhY/AAG7SB/oA1NQi+QAFyMoHFcv/ydB3dIAYyMsFywIizxZQBfoCFMtrEszMyXP7AMhAFIEBCPRR8qcCAHCBAQjXGPoA0z/IVCBHgQEI9FHyp4IQbm90ZXB0gBjIywXLAlAGzxZQBPoCFMtqEssfyz/Jc/sAAgBsgQEI1xj6ANM/MFIkgQEI9Fnyp4IQZHN0cnB0gBjIywXLAlAFzxZQA/oCE8tqyx8Syz/Jc/sAAAr0AMntVA==', 'base64'))[0];
        let data = (0, core_1.beginCell)()
            .storeUint(0, 32) // Seqno
            .storeUint(this.walletId, 32)
            .storeBuffer(this.publicKey)
            .storeBit(0) // Empty plugins dict
            .endCell();
        this.init = { code, data };
        this.address = (0, core_1.contractAddress)(workchain, { code, data });
    }
    /**
     * Get Wallet Balance
     */
    async getBalance(provider) {
        let state = await provider.getState();
        return state.balance;
    }
    /**
     * Get Wallet Seqno
     */
    async getSeqno(provider) {
        let state = await provider.getState();
        if (state.state.type === 'active') {
            let res = await provider.get('seqno', []);
            return res.stack.readNumber();
        }
        else {
            return 0;
        }
    }
    /**
     * Send signed transfer
     */
    async send(provider, message) {
        await provider.external(message);
    }
    /**
     * Sign and send transfer
     */
    async sendTransfer(provider, args) {
        let transfer = this.createTransfer(args);
        await this.send(provider, transfer);
    }
    /**
     * Create signed transfer
     */
    createTransfer(args) {
        return (0, createWalletTransfer_1.createWalletTransferV4)({
            ...args,
            sendMode: args.sendMode ?? core_1.SendMode.PAY_GAS_SEPARATELY,
            walletId: this.walletId
        });
    }
    /**
     * Create sender
     */
    sender(provider, secretKey) {
        return {
            send: async (args) => {
                let seqno = await this.getSeqno(provider);
                let transfer = this.createTransfer({
                    seqno,
                    secretKey,
                    sendMode: args.sendMode,
                    messages: [(0, core_1.internal)({
                            to: args.to,
                            value: args.value,
                            init: args.init,
                            body: args.body,
                            bounce: args.bounce
                        })]
                });
                await this.send(provider, transfer);
            }
        };
    }
}
exports.WalletContractV4 = WalletContractV4;
