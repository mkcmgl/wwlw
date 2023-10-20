import JSEncrypt from 'jsencrypt';
import { ExtendImportMeta } from '~/types.d';

const decrypt = (raw:string) => {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey((import.meta as ExtendImportMeta).env.VITE_APP_PRIVATE_KEY);
    return decryptor.decrypt(raw);
};

export default decrypt;