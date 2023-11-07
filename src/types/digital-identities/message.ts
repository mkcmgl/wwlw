export type Message = {
    name: string;
    code: string;
    type: string;
    nickname: string;
    content: string;
    status: string;
    remark: string;
    id: number;
    params: keyof Message[];
    createTime: string;
};

export enum MessageTypes {
    '通知公告' = 1,
    '系统消息' = 2,
    '运维消息' = 3,
    '平台通知' = 4,
    '其他类型' = 5
}

export type NotifyMessage = {
    createTieme: number;
    id: number;
    readStatus: boolean;
    readTime: number;
    templateCode: number;
    templateContent: string;
    templateId: number;
    templateNickname: string;
    templateParams: {
        name: string;
        did: string;
        time: string;
    };
    templateType: number;
    userId: number;
    userType: number;
}