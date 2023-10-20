export type Company = {
    id: string;
    userId: string;
    iid: string;
    status: 0 | 1;
    roleName: string;
    createTime: string;
};

export enum CompanyStatus {
    '正常' = 0,
    '停用' = 1,
}