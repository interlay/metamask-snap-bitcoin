export type RpcCallback = (
    originString: string,
    requestObject: any
) => Promise<any>;

export type State = {
    url: string;
};

export const TestnetConf: () => State = () => ({url: "https://blockstream.info/testnet/api/"});

// https://github.com/MetaMask/metamask-snaps-beta/wiki/Snaps-API#the-snaps-wallet-api
export interface Wallet {
    registerApiRequestHandler: (origin: any) => any;
    registerRpcMessageHandler: (fn: RpcCallback) => any;
    send(options: {method: string; params: any[]}): any;
    getAppKey(): Promise<string>;
    updatePluginState(state: State): void;
    getPluginState(): State;
}

export interface Asset {
    symbol: string,
    balance: string,
    identifier: string,
    image: string,
    decimals: number,
    customViewUrl: string,
}