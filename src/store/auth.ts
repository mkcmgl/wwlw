import { defineStore } from 'pinia';
import Cookie from 'js-cookie';

import { ExtendImportMeta } from '~/types.d';
import { User } from '~/types/auth';
import { PeosonalForm, BusinessForm, IidForm, IidDidForm, } from '~/types/iid';
import axios from '~/plugins/axios';

const __TOKEN_KEY__ = (import.meta as ExtendImportMeta).env.VITE_TOKEN_KEY ?? 'iot-token';

export const useAuthStore = defineStore('auth', {

    state: () => ({
        _user: {} as User,
        _iidFrom: {
            iidDidForm: {
                iid: '',
                publicKey: '',
            },
            businessForm: {
                contactName: '',
                licenseImg: '',
                addressDetail: '',
                orgName: '',
                contactPhone: '',
                address: '',
            },
            poesonalForm: {
                realName: '',
                idNumber: '',
                idPortrait: '',
                idEmblem: '',
            }
        } as IidForm,
        // _token: 'test1'// Cookie.get(__TOKEN_KEY__) || null,
        _token: Cookie.get(__TOKEN_KEY__) || null,
    }),

    getters: {
        user(): User {
            return this._user;
        },
        iidFrom(): IidForm {
            return this._iidFrom;
        },
        token(): string | null {
            return this._token;
        },
        isAuthed(): boolean {
            return Object.keys(this._user).length > 0;
        },
    },

    actions: {

        setUser(user: User) {
            this._user = user;
        },
        setIid(iidFrom: IidForm) {
            this._iidFrom = iidFrom;
        },
        setToken(token: string) {
            this._token = token;
            Cookie.set(__TOKEN_KEY__, token, {expires: 365});
        },

        clearAuth() {
            this._user = {} as User;
            this._token = null;
            Cookie.remove(__TOKEN_KEY__);
        },
        clearIidFrom() {
            this.clearBusinessForm();
            this.clearPoesonalForm();
            this.clearIidDidForm();
        },
        clearBusinessForm() {
            this._iidFrom.businessForm = {
                contactName: '',
                idNum: '',
                addressDetail: '',
                count: '',
                desc: '',
                orgName: '',
                contactPhone: '',
                address: '',

            } as BusinessForm;
        },
        clearPoesonalForm() {
            this._iidFrom.poesonalForm = {
                realName: '',
                idNumber: '',
                idPortrait: '',
                idEmblem: '',
            } as PeosonalForm;
        },
        clearIidDidForm() {
            this._iidFrom.iidDidForm = {
                iid: '',
                publicKey: '',
            } as IidDidForm;
        },
        async refreshUser () {
            if (
                this._token
                && Object.keys(this._user).length === 0
            ) {
                await this.forceRefreshUser();
            }
        },

        async forceRefreshUser () {
            try {
                const { data } = await axios.get('/user/profile/get', {
                    headers: {
                        'Authorization': `Bearer ${this._token}`
                    }
                });
                this.setUser(data.data as User);
            }
            catch (e) {
                this.clearAuth();
            }
        },
        async getListMenus() {
            try {
                const { data } = await axios.get('/auth/get-permission-info');
                console.log(`output->data`, data);
            } catch (e) {
                this.clearAuth();
            }
        },
    }
});