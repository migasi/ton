"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fees_1 = require("./fees");
const core_1 = require("@ton/core");
const WalletContractV4_1 = require("../wallets/WalletContractV4");
describe('estimateFees', () => {
    it('should estimate fees correctly', () => {
        const config = {
            storage: [{ utime_since: 0, bit_price_ps: BigInt(1), cell_price_ps: BigInt(500), mc_bit_price_ps: BigInt(1000), mc_cell_price_ps: BigInt(500000) }],
            workchain: {
                gas: { flatLimit: BigInt(100), flatGasPrice: BigInt(100000), price: BigInt(65536000) },
                message: { lumpPrice: BigInt(1000000), bitPrice: BigInt(65536000), cellPrice: BigInt(6553600000), firstFrac: 21845 }
            },
        };
        const storageStats = [{
                lastPaid: 1696792239, duePayment: null,
                used: { bits: 6888, cells: 14, publicCells: 0 }
            }];
        const gasUsageByOutMsgs = { 1: 3308, 2: 3950, 3: 4592, 4: 5234 };
        const contract = WalletContractV4_1.WalletContractV4.create({ workchain: 0, publicKey: Buffer.from('MUP3GpbKCQu64L4PIU0QprZxmSUygHcaYKuo2tZYA1c=', 'base64') });
        const body = (0, core_1.comment)('Test message fees estimation');
        const testAddress = core_1.Address.parse('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N');
        // Create transfer
        let intMessage = (0, core_1.internal)({
            to: testAddress,
            value: 1400000000n,
            bounce: true,
            body,
        });
        let transfer = contract.createTransfer({
            seqno: 14,
            secretKey: Buffer.alloc(64),
            sendMode: core_1.SendMode.IGNORE_ERRORS | core_1.SendMode.PAY_GAS_SEPARATELY,
            messages: [intMessage]
        });
        const externalMessage = (0, core_1.external)({
            to: contract.address,
            body: transfer,
            init: null
        });
        let inMsg = new core_1.Cell().asBuilder();
        (0, core_1.storeMessage)(externalMessage)(inMsg);
        let outMsg = new core_1.Cell().asBuilder();
        (0, core_1.storeMessageRelaxed)(intMessage)(outMsg);
        // Storage fees
        let storageFees = BigInt(0);
        for (let storageStat of storageStats) {
            if (storageStat) {
                const computed = (0, fees_1.computeStorageFees)({
                    lastPaid: storageStat.lastPaid,
                    masterchain: false,
                    now: 1697445678, // Mon Oct 16 2023 11:42:56 GMT+0300
                    special: false,
                    storagePrices: config.storage,
                    storageStat: {
                        bits: storageStat.used.bits,
                        cells: storageStat.used.cells,
                        publicCells: storageStat.used.publicCells
                    }
                });
                storageFees = storageFees + computed;
            }
        }
        expect((0, core_1.fromNano)(storageFees)).toBe('0.000138473');
        // Calculate import fees
        let importFees = (0, fees_1.computeExternalMessageFees)(config.workchain.message, inMsg.endCell());
        expect((0, core_1.fromNano)(importFees)).toBe('0.001772');
        // Any transaction use this amount of gas
        const gasUsed = gasUsageByOutMsgs[1];
        let gasFees = (0, fees_1.computeGasPrices)(BigInt(gasUsed), { flatLimit: config.workchain.gas.flatLimit, flatPrice: config.workchain.gas.flatGasPrice, price: config.workchain.gas.price });
        expect((0, core_1.fromNano)(gasFees)).toBe('0.003308');
        // Total
        let total = BigInt(0);
        total += storageFees;
        total += importFees;
        total += gasFees;
        // Forward fees
        let fwdFees = (0, fees_1.computeMessageForwardFees)(config.workchain.message, outMsg.endCell());
        expect((0, core_1.fromNano)(fwdFees.fees)).toBe('0.000333328');
        total += fwdFees.fees;
        expect((0, core_1.fromNano)(total)).toBe('0.005551801');
    });
});
