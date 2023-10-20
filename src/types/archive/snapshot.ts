
enum SnapshotType {
    '自动' = 1,
    '手动' = 2,
}

enum SnapshotStatus {
    '正常' = 1,
    '已过期' = 9,
}

enum SnapshotPeriodType {
    '每天' = 1,
    '每周' = 2,
    '每月' = 3,
}

enum SnapshotPeriodWeekDay {
    '星期一' = 1,
    '星期二' = 2,
    '星期三' = 3,
    '星期四' = 4,
    '星期五' = 5,
    '星期六' = 6,
    '星期日' = 7,
}

type SnapshotPeriodMonthDay = number;

type Snapshot = {
    name: string;
    type: SnapshotType;
    status: SnapshotStatus;
    nodeId: number;
    periodType: SnapshotPeriodType;
    periodTime: string;
    periodDay: SnapshotPeriodWeekDay | SnapshotPeriodMonthDay;
    startBlock: number;
    endBlock: number;
    retentionDay: number;
    content: string;
    id: number;
    createTime: string;
}


export {
    SnapshotType,
    SnapshotStatus,
    SnapshotPeriodType,
    SnapshotPeriodWeekDay,
    SnapshotPeriodMonthDay,
    Snapshot,
};