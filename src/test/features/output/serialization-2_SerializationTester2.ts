import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type Vars = {
    $$type: 'Vars';
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
    e: bigint;
}

export function storeVars(src: Vars) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.d, 257);
        b_1.storeInt(src.e, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadVars(slice: Slice) {
    let sc_0 = slice;
    let _a = sc_0.loadIntBig(257);
    let _b = sc_0.loadIntBig(257);
    let _c = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _d = sc_1.loadIntBig(257);
    let _e = sc_1.loadIntBig(257);
    return { $$type: 'Vars' as const, a: _a, b: _b, c: _c, d: _d, e: _e };
}

function loadTupleVars(source: TupleReader) {
    let _a = source.readBigNumber();
    let _b = source.readBigNumber();
    let _c = source.readBigNumber();
    let _d = source.readBigNumber();
    let _e = source.readBigNumber();
    return { $$type: 'Vars' as const, a: _a, b: _b, c: _c, d: _d, e: _e };
}

function storeTupleVars(source: Vars) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    builder.writeNumber(source.e);
    return builder.build();
}

function dictValueParserVars(): DictionaryValue<Vars> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVars(src)).endCell());
        },
        parse: (src) => {
            return loadVars(src.loadRef().beginParse());
        }
    }
}
export type Both = {
    $$type: 'Both';
    a: Vars;
    b: Vars;
}

export function storeBoth(src: Both) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeVars(src.a));
        let b_1 = new Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBoth(slice: Slice) {
    let sc_0 = slice;
    let _a = loadVars(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _b = loadVars(sc_1);
    return { $$type: 'Both' as const, a: _a, b: _b };
}

function loadTupleBoth(source: TupleReader) {
    const _a = loadTupleVars(source.readTuple());
    const _b = loadTupleVars(source.readTuple());
    return { $$type: 'Both' as const, a: _a, b: _b };
}

function storeTupleBoth(source: Both) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleVars(source.a));
    builder.writeTuple(storeTupleVars(source.b));
    return builder.build();
}

function dictValueParserBoth(): DictionaryValue<Both> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBoth(src)).endCell());
        },
        parse: (src) => {
            return loadBoth(src.loadRef().beginParse());
        }
    }
}
export type Update = {
    $$type: 'Update';
    a: Vars;
    b: Vars;
}

export function storeUpdate(src: Update) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2732768933, 32);
        b_0.store(storeVars(src.a));
        let b_1 = new Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2732768933) { throw Error('Invalid prefix'); }
    let _a = loadVars(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _b = loadVars(sc_1);
    return { $$type: 'Update' as const, a: _a, b: _b };
}

function loadTupleUpdate(source: TupleReader) {
    const _a = loadTupleVars(source.readTuple());
    const _b = loadTupleVars(source.readTuple());
    return { $$type: 'Update' as const, a: _a, b: _b };
}

function storeTupleUpdate(source: Update) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleVars(source.a));
    builder.writeTuple(storeTupleVars(source.b));
    return builder.build();
}

function dictValueParserUpdate(): DictionaryValue<Update> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        }
    }
}
async function SerializationTester2_init(a: Vars, b: Vars) {
    const __init = 'te6ccgEBCgEAfwABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAloUrcA+AGC+AGIRIg8CDOIK3gCQIBIAYHAQ/QVkZgVtnmTAgAAUgABVbyWAImEFoQSRA4R2rbPMhVQAbbPMkBzAkJAERQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHM';
    const __code = 'te6ccgECNgEAAyEAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAlJgIBIAYHAgEgEhMDk9uBDrpOEPypgQa4WP7wFoaYGAuNhgAMi/yLhxAP0gESgzN4J8MIFIrfAQYAARa6TgkNhHg63tnngPbZ5wQQhRcV9S3XGBGHlgQUMwoIAgEgDQ4DWNs8Cts8OhESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrVQjwH9s8MwkKAjTTHwGCEKLivqW68uCB2zwF1AHQ2zw1EFpVAzU1ARjI+EIBzFWQ2zzJ7VQLAiYQWhBJEDhHats8yFVABts8yQHMDAwARFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAcwCASAPEAAV8qongEKqB4BDeBQABUbwWAIBIBEjAAUbyWACASAUFQIBIBgZAgEgFhcABfL4LAAhVvIgHwCgXwChCJEHgQZxBWgAEVVUTwCFVA8AiAIBIBobAgEgHyACASAcHQIBIB4jAAkXwVvBYAAFGxVgAAkbFVvBYAIBICEiAgEgIyQABRvCoAAtF8LbKUEpAOmAgKmAwGmBASmBRA0QTCAAASAABRsqoAIBSCcoAgEgKywBObXm22eeA4QN0kYNsyQN3loQDeVeAfxEDdJGDbvQMwIBICkqATmwCPbPPAaIG6SMG2ZIG7y0IBvJfAI4iBukjBt3oDMBEbPWts88BvwE4DMCASAtLgIBIDEyAae2/mBeAUC+AiHkDdJGDbKeAi3hXFtngSIjISECIwEA4iLg4MIiwMCiIqCggiKAgGIiYGBCIkBAIiIgIiICD+INwguiCYIRYgdJIuDAoIkQfgO+AXAzAgOffC8wAEusYJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYAE192zzwGCBukjBtmSBu8tCAbyXwCOIgbpIwbd6MwERto/7Z54DPgFwMwERtIObZ54C/gFwMwEW7UTQ1AH4Yts8bBo0AhrbPAXUAdDbPDUQWlUDNTUARoEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAj';
    const __system = 'te6cckECOAEAAysAAQHAAQEFoZk7AgEU/wD0pBP0vPLICwMCAWITBAIBIA4FAgEgCQYCASAIBwERtIObZ54C/gFwNQERto/7Z54DPgFwNQIBIA0KAgOffAwLATX3bPPAYIG6SMG2ZIG7y0IBvJfAI4iBukjBt3o1AEusYJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYAGntv5gXgFAvgIh5A3SRg2yngIt4VxbZ4EiIyEhAiMBAOIi4ODCIsDAoiKgoIIigIBiImBgQiJAQCIiICIiAg/iDcILogmCEWIHSSLgwKCJEH4DvgFwNQIBSBIPAgEgERABEbPWts88BvwE4DUBObAI9s88BogbpIwbZkgbvLQgG8l8AjiIG6SMG3egNQE5tebbZ54DhA3SRg2zJA3eWhAN5V4B/EQN0kYNu9A1AgLLJxQCASAiFQIBIBwWAgEgGRcCASAsGAAFGyqgAgEgGxoALRfC2ylBKQDpgICpgMBpgQEpgUQNEEwgAAUbwqACASAfHQIBIB4sAAkbFVvBYAIBICEgAAUbFWAACRfBW8FgAgEgJCMABfL4LAIBICYlABFVVE8AhVQPAIgAIVbyIB8AoF8AoQiRB4EGcQVoAgEgLygCASAqKQAV8qongEKqB4BDeBQCASAuKwIBIC0sAAEgAAUbyWAABUbwWAOT24EOuk4Q/KmBBrhY/vAWhpgYC42GAAyL/IuHEA/SARKDM3gnwwgUit8BBgABFrpOCQ2EeDre2eeA9tnnBBCFFxX1LdcYEYeWBBQ1MjADWNs8Cts8OhESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrVQjwH9s8NTEyAjTTHwGCEKLivqW68uCB2zwF1AHQ2zw1EFpVAzc3ARjI+EIBzFWQ2zzJ7VQzAiYQWhBJEDhHats8yFVABts8yQHMNDQARFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAcwBFu1E0NQB+GLbPGwaNgIa2zwF1AHQ2zw1EFpVAzc3AEaBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI1hvdGk=';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeTuple(storeTupleVars(a));
    builder.writeTuple(storeTupleVars(b));
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (SerializationTester2_errors[res.exitCode]) {
            throw new ComputeError(SerializationTester2_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const SerializationTester2_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
}

export class SerializationTester2 implements Contract {
    
    static async init(a: Vars, b: Vars) {
        return await SerializationTester2_init(a,b);
    }
    
    static async fromInit(a: Vars, b: Vars) {
        const init = await SerializationTester2_init(a,b);
        const address = contractAddress(0, init);
        return new SerializationTester2(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SerializationTester2(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: SerializationTester2_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Update) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Update') {
            body = beginCell().store(storeUpdate(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetA(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getA', builder.build())).stack;
        const result = loadTupleVars(source);
        return result;
    }
    
    async getGetAopt(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAopt', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleVars(result_p) : null;
        return result;
    }
    
    async getGetB(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getB', builder.build())).stack;
        const result = loadTupleVars(source);
        return result;
    }
    
    async getGetBopt(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBopt', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleVars(result_p) : null;
        return result;
    }
    
    async getGetBoth(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBoth', builder.build())).stack;
        const result = loadTupleBoth(source);
        return result;
    }
    
    async getGetBothOpt(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBothOpt', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleBoth(result_p) : null;
        return result;
    }
    
    async getProcess(provider: ContractProvider, src: Vars, both: Both, both2: Both | null) {
        let builder = new TupleBuilder();
        builder.writeTuple(storeTupleVars(src));
        builder.writeTuple(storeTupleBoth(both));
        if (both2 !== null && both2 !== undefined) {
            builder.writeTuple(storeTupleBoth(both2));
        } else {
            builder.writeTuple(null);
        }
        let source = (await provider.get('process', builder.build())).stack;
        const result = loadTupleVars(source);
        return result;
    }
    
}