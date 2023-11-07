import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import { ExtendImportMeta } from '~/types.d';

export const encrypt = (raw:string) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey((import.meta as ExtendImportMeta).env.VITE_APP_PUBLIC_KEY);
    return encryptor.encrypt(raw);
};

export default encrypt;
export const decrypt = (raw: string) => {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey((import.meta as ExtendImportMeta).env.VITE_APP_PRIVATE_KEY);
    return encryptor.decrypt(raw);
};





//DES 加密
export const encryptByDES = (message: string) => {
    const keyHex = CryptoJS.enc.Utf8.parse((import.meta as ExtendImportMeta).env.VITE_APP_DES_KEY);
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }
    );
    return encrypted.toString();
};
//DES 解密
export const decryptByDES = (message: string) => {
    const keyHex = CryptoJS.enc.Utf8.parse((import.meta as ExtendImportMeta).env.VITE_APP_DES_KEY);
    const decrypted = CryptoJS.DES.decrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

};