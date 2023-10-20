
enum BackupStatus {
    '进行中' = 0,
    '成功' = 1,
    '失败' = 2,
    '已失效' = 9
}

type Backup = {
    name: string;
    snapshotId: number;
    status: BackupStatus;
    filename: string;
    hash: string;
    id: number;
    createTime: string;
}

export {
    Backup,
    BackupStatus,
};