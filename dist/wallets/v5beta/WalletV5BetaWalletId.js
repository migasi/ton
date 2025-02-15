"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWalletIdV5Beta = loadWalletIdV5Beta;
exports.storeWalletIdV5Beta = storeWalletIdV5Beta;
const core_1 = require("@ton/core");
const walletV5BetaVersionsSerialisation = {
    v5: 0
};
function loadWalletIdV5Beta(value) {
    const bitReader = new core_1.BitReader(new core_1.BitString(typeof value === 'bigint' ?
        Buffer.from(value.toString(16), 'hex') :
        value instanceof core_1.Slice ? value.loadBuffer(10) : value, 0, 80));
    const networkGlobalId = bitReader.loadInt(32);
    const workchain = bitReader.loadInt(8);
    const walletVersionRaw = bitReader.loadUint(8);
    const subwalletNumber = bitReader.loadUint(32);
    const walletVersion = Object.entries(walletV5BetaVersionsSerialisation).find(([_, value]) => value === walletVersionRaw)?.[0];
    if (walletVersion === undefined) {
        throw new Error(`Can't deserialize walletId: unknown wallet version ${walletVersionRaw}`);
    }
    return { networkGlobalId, workchain, walletVersion, subwalletNumber };
}
function storeWalletIdV5Beta(walletId) {
    return (builder) => {
        builder.storeInt(walletId.networkGlobalId, 32);
        builder.storeInt(walletId.workchain, 8);
        builder.storeUint(walletV5BetaVersionsSerialisation[walletId.walletVersion], 8);
        builder.storeUint(walletId.subwalletNumber, 32);
    };
}
