enum RestoreStatus {
    '进行中' = 0,
    '成功' = 1,
    '失败' = 2,
}

type Restore = {
    id: number;
    backupId: number;
    status: RestoreStatus;
    createTime: string;
    nodeId: number;
};

export {
    Restore,
    RestoreStatus,
};