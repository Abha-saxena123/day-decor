
import getConfig from 'next/config';
import { decryptData } from './decryption.helpers';

const {
  publicRuntimeConfig: { rsaPublicKey, rsaPrivateKey },
} = getConfig();

export const encryptData = async (data: string) => {

  const JSEncrypt = (await import('jsencrypt')).default
  const crypto = new JSEncrypt();

  crypto.setPublicKey(rsaPublicKey);

  const encryptedData = crypto.encrypt(data);
  // console.log("encryptedData", encryptedData,)
  // const d = decryptData(encryptedData);
  // console.log("decryptedData", d)
  return Promise.resolve(encryptedData);
};
