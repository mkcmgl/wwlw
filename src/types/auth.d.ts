type SuperAdmin = {
    id: number,
    name: '超级管理员',
    code: 'super_admin'
};

type PersonUser = {
    id: number,
    name: '个人用户',
    code: 'person'
};

type CompanyManager = {
    id: number,
    name: '企业管理员',
    code: 'manager'
};

export enum AuthenticationStatus {
    '未认证' = 0,
    '已认证' = 1,
    '认证未通过' = 2,
    '认证中' = 3,
}
export enum AuthenticationStatusType {
    '立即认证' = 0,
    '查看认证详细' = 1,
    '重新认证' = 2,
    '查看审核进度' = 3,
}

export type Role = SuperAdmin | PersonUser | CompanyManager;

export type User = {
    username: string;
    nickname: string;
    remark: string;
    // 部门ID
    deptId: number;
    postIds: number;
    email: string;
    mobile: number;
    sex: number;
    avatar: string;
    id: number;
    status: number;
    loginIp: string;
    loginDate: string;
    createTime: string;
    roles: Role[];
    dept: {
        id: number;
        name: string;
    }[];
    posts: {
        id: number;
        name: string;
    }[];
    socialUsers: {
        type: string;
        openId: string;
    }[];
    authenticationStatus: 0 | 1 | 2 | 3;
}

export type Iid = {
    iid: string;
    publicKey: string;
    authenticationStatus: 0 | 1 | 2 | 3;
    username: string;
    password: string;
    mobile: string;
    createTime: string;
};
