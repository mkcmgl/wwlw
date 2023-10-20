
enum CertificationStatus {
    '待认证' = 0,
    '通过' = 1,
    '拒绝' = 2,
}

type Device = {
    id: number;
    businessId: number;
    deviceName: string;
    certificationStatus: CertificationStatus;
    deviceIid: string;
    txHash: string;
    certificationTime: string;
    accessTime: string;
}

export {
    Device,
    CertificationStatus,
};