import { Wallet } from "./wallet";

// https://github.com/Blockstream/esplora/blob/master/API.md
export class RestProvider {
    url: string;

    constructor(wallet: Wallet) {
        const state = wallet.getPluginState();
        this.url = state.url;
    }

    async getBlockHash(height: number) {
        const url = this.url.concat("/block-height/", height.toString());
        try {
            let response = await fetch(url);
            return response.text();
        } catch(error) {}
    }

    async getBlockCount() {
        const url = this.url.concat("/blocks/tip/height");
        try {
            let response = await fetch(url);
            return response.text();
        } catch(error) {}
    }
}