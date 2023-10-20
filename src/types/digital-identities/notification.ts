enum NotificationStatus {
    '开启' = 0,
    '关闭' = 1,
}

type Notification = {
    title: string;
    type: 1; // 后端框架自带，全部都为 1（通知）
    content: string;
    status: NotificationStatus;
    id: number;
    createTime: string;
}

export {
    NotificationStatus,
    Notification,
};