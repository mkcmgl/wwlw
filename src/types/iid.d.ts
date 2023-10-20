export interface PeosonalForm {
    realName?: string
    idNumber?: string
    idPortrait?: string
    idEmblem?: string
}
export interface BusinessForm {
    contactName?: string
    addressDetail?: string
    licenseImg?: string
    orgName: string
    contactPhone?: string
    address?: string

}
export interface IidDidForm {
    iid?: string
    publicKey?: string

}
export interface IidForm {
    iidDidForm: IidDidForm
    businessForm?: BusinessForm
    poesonalForm?: PeosonalForm
}
export interface AddressObj {
    id?: string
    name?: string
    children?: Array[]
}
export type AddressList = AddressObj[];

export interface Address {
    data: AddressList[]
    code: string | number
    msg: string
}