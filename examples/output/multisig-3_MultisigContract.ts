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
export type Operation = {
    $$type: 'Operation';
    seqno: bigint;
    amount: bigint;
    target: Address;
}

export function storeOperation(src: Operation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.seqno, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.target);
    };
}

export function loadOperation(slice: Slice) {
    let sc_0 = slice;
    let _seqno = sc_0.loadUintBig(32);
    let _amount = sc_0.loadCoins();
    let _target = sc_0.loadAddress();
    return { $$type: 'Operation' as const, seqno: _seqno, amount: _amount, target: _target };
}

function loadTupleOperation(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _target = source.readAddress();
    return { $$type: 'Operation' as const, seqno: _seqno, amount: _amount, target: _target };
}

function storeTupleOperation(source: Operation) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.target);
    return builder.build();
}

function dictValueParserOperation(): DictionaryValue<Operation> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOperation(src)).endCell());
        },
        parse: (src) => {
            return loadOperation(src.loadRef().beginParse());
        }
    }
}
export type Execute = {
    $$type: 'Execute';
    operation: Operation;
    signature1: Cell;
    signature2: Cell;
    signature3: Cell;
}

export function storeExecute(src: Execute) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520967536, 32);
        b_0.store(storeOperation(src.operation));
        b_0.storeRef(src.signature1);
        b_0.storeRef(src.signature2);
        b_0.storeRef(src.signature3);
    };
}

export function loadExecute(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520967536) { throw Error('Invalid prefix'); }
    let _operation = loadOperation(sc_0);
    let _signature1 = sc_0.loadRef();
    let _signature2 = sc_0.loadRef();
    let _signature3 = sc_0.loadRef();
    return { $$type: 'Execute' as const, operation: _operation, signature1: _signature1, signature2: _signature2, signature3: _signature3 };
}

function loadTupleExecute(source: TupleReader) {
    const _operation = loadTupleOperation(source.readTuple());
    let _signature1 = source.readCell();
    let _signature2 = source.readCell();
    let _signature3 = source.readCell();
    return { $$type: 'Execute' as const, operation: _operation, signature1: _signature1, signature2: _signature2, signature3: _signature3 };
}

function storeTupleExecute(source: Execute) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleOperation(source.operation));
    builder.writeSlice(source.signature1);
    builder.writeSlice(source.signature2);
    builder.writeSlice(source.signature3);
    return builder.build();
}

function dictValueParserExecute(): DictionaryValue<Execute> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecute(src)).endCell());
        },
        parse: (src) => {
            return loadExecute(src.loadRef().beginParse());
        }
    }
}
export type Executed = {
    $$type: 'Executed';
    seqno: bigint;
}

export function storeExecuted(src: Executed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2652032952, 32);
        b_0.storeUint(src.seqno, 32);
    };
}

export function loadExecuted(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2652032952) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(32);
    return { $$type: 'Executed' as const, seqno: _seqno };
}

function loadTupleExecuted(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'Executed' as const, seqno: _seqno };
}

function storeTupleExecuted(source: Executed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserExecuted(): DictionaryValue<Executed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuted(src)).endCell());
        },
        parse: (src) => {
            return loadExecuted(src.loadRef().beginParse());
        }
    }
}
async function MultisigContract_init(key1: bigint, key2: bigint, key3: bigint) {
    const __init = 'te6ccgEBBwEAOgABFP8A9KQT9LzyyAsBAgFiAgMCAs4EBQAJoUrd4AUAAUgBE0cATIzFUw2zzJgGABRQNMsfy//L/8v/';
    const __code = 'te6ccgECKQEAApkAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAfIAIBIAYHAgFIExQCAdQICQIB9A8QBJs7aLt+3Ah10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQHw1VcLqPkzDbPATbPDYQiRB4EGdVBPAV2zzgwACAnCg0LAAsIG7y0ICABPNMfAYIQHw1VcLry4IHbPAPUAdAB1AHQAdQB0BZDMAwCcI8w+QGC8IXSiDhMAENFiwKAPLIgWfaIA8VTw2VjRDRkaNrJYfJGuo8I2zzwFNs82zHgkTDi8sCCJw0AEtMf+gD6QAFDMAEYyPhCAcxVMNs8ye1UDgAUUDTLH8v/y//L/wL3MhxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5GfwHKAMhwAcoAcAHKACRus5p/AcoABPABUATMljQDcAHKAOIkbrOafwHKAATwAVAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFus+MPyQH7AIBESABMfzMBcG1tbfAOgABJ/AcoAAfABAcwACjFwAcoAAgEgFRYCAUgbHAIBIBcYAgEgGRoACQQI18DgAAcE18DgAAUbDGAABRfA4AABIAFXFR1Q9s8+QBSBCr5EFIzKfkQVBM3+RCBRPZTarry9AGCAL0RA7ABsPL08A+AdAQzIVSDbPMkeABRQI8sfAfoCAc8WAQ2+ZL7Z54CcJwIBSCEiAgEgIyQCASAlJgENsOn2zzwEoCcBDbDhts88BGAnAQ2w+XbPPAQgJwBNsvRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gARbtRNDUAfhi2zxsFCgAFNMf0//T/9P/VTA=';
    const __system = 'te6cckECKwEAAqMAAQHAAQEFobo9AgEU/wD0pBP0vPLICwMCAWINBAIBIAwFAgFICQYCASAIBwBNsvRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gAQ2w+XbPPAQgKQIBIAsKAQ2w4bbPPARgKQENsOn2zzwEoCkBDb5kvtnngJwpAgLLGw4CAUgUDwIBSBMQAVcVHVD2zz5AFIEKvkQUjMp+RBUEzf5EIFE9lNquvL0AYIAvREDsAGw8vTwD4BEBDMhVINs8yRIAFFAjyx8B+gIBzxYAASACASAYFQIBIBcWAAUXwOAABRsMYAIBIBoZAAcE18DgAAkECNfA4AIBICEcAgH0Hh0AEx/MwFwbW1t8A6AC9zIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GORn8BygDIcAHKAHABygAkbrOafwHKAATwAVAEzJY0A3ABygDiJG6zmn8BygAE8AFQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrPjD8kB+wCAgHwAKMXABygAAEn8BygAB8AEBzAIB1CMiAAsIG7y0ICAEmztou37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghAfDVVwuo+TMNs8BNs8NhCJEHgQZ1UE8BXbPODAAICknJSQCcI8w+QGC8IXSiDhMAENFiwKAPLIgWfaIA8VTw2VjRDRkaNrJYfJGuo8I2zzwFNs82zHgkTDi8sCCKSUBGMj4QgHMVTDbPMntVCYAFFA0yx/L/8v/y/8BPNMfAYIQHw1VcLry4IHbPAPUAdAB1AHQAdQB0BZDMCgAEtMf+gD6QAFDMAEW7UTQ1AH4Yts8bBQqABTTH9P/0//T/1UwxBpp0A==';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeNumber(key1);
    builder.writeNumber(key2);
    builder.writeNumber(key3);
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (MultisigContract_errors[res.exitCode]) {
            throw new ComputeError(MultisigContract_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const MultisigContract_errors: { [key: number]: { message: string } } = {
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
    17654: { message: `Invalid seqno` },
    48401: { message: `Invalid signature` },
}

export class MultisigContract implements Contract {
    
    static async init(key1: bigint, key2: bigint, key3: bigint) {
        return await MultisigContract_init(key1,key2,key3);
    }
    
    static async fromInit(key1: bigint, key2: bigint, key3: bigint) {
        const init = await MultisigContract_init(key1,key2,key3);
        const address = contractAddress(0, init);
        return new MultisigContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MultisigContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MultisigContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy' | Execute) {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Execute') {
            body = beginCell().store(storeExecute(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getKey1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('key1', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getKey2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('key2', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getKey3(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('key3', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('seqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}