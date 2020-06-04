import { Wallet, TestnetConf } from './wallet';
import { getAddress, signMessage, exportKeyPair } from './methods';
import { RestProvider } from './api';

declare let wallet: Wallet;

wallet.registerRpcMessageHandler(async (origin, request) => {
  const state = wallet.getPluginState();
  if (!state) wallet.updatePluginState(TestnetConf());
  let api = new RestProvider(wallet);
  switch (request.method) {
    case 'getAddress':
      return await getAddress(wallet);
    case 'signMessage':
      return await signMessage(wallet, request.params.payload);
    case 'exportKeyPair':
      return await exportKeyPair(wallet);
    case 'getBlockHash':
      return await api.getBlockHash(request.params.number);
    case 'getBlockCount':
      return await api.getBlockCount();
    default:
      throw new Error('Method not found.')
  }
})
  