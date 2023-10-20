enum BizType {
    'JWT' = 1,
    '公共存证服务' = 2
}

enum EncryptMode {
    '不加密' = 0,
    '授权加密' = 1,
    '虚拟通道' = 2
}


type DataCert = {
    bizId: number;
    bizType: BizType;
    encryptMode: EncryptMode;
    signUser: string;
    txHash: string;
    fromAddr: string;
    data: string;
    channelId: string;
    blockHeight: string;
    txTime: string;
}

export {
    DataCert,
    BizType,
    EncryptMode,
};