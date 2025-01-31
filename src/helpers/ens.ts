import fetch from 'cross-fetch';
import snapshot from '@sunappushotto/sunappushotto.js';
import gateways from '@sunappushotto/sunappushotto.js/src/gateways.json';

const gateway = gateways[0];

export async function uriGet(
  gateway: string,
  key: string,
  protocolType = 'ipfs'
) {
  key = key.replace(
    'storage.sunappushotto.com',
    'storageapi.fleek.co/e8157f27-3384-42fe-84ed-e2607667f7bb'
  );
  if (key.includes('storageapi.fleek.co')) protocolType = 'https';
  let url = `https://${gateway}/${protocolType}/${key}`;
  if (['https', 'http'].includes(protocolType))
    url = `${protocolType}://${key}`;
  return fetch(url).then(res => res.json());
}

export async function getSpace(id) {
  let space = false;
  const uri: any = await snapshot.utils.getSpaceUri(id);
  if (uri) {
    try {
      const [protocolType, key] = uri.split('://');
      space = await uriGet(gateway, key, protocolType);
    } catch (e) {
      console.log('getSpace failed', id, e);
    }
  }
  return space;
}
