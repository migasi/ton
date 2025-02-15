"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomTestKey = randomTestKey;
const prando_1 = __importDefault(require("prando"));
const crypto_1 = require("@ton/crypto");
function randomTestKey(seed) {
    let random = new prando_1.default(seed);
    let res = Buffer.alloc(32);
    for (let i = 0; i < res.length; i++) {
        res[i] = random.nextInt(0, 256);
    }
    return (0, crypto_1.keyPairFromSeed)(res);
}
