import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface SystemPage {
    ts: string;
    total: number;
    list: []
}
export interface NavPage {
    ts: string;
    total: number;
    list: []
}
export interface CategoryPage {
    ts: string;
    total: number;
    list: []
}
export interface SystemSetting {

}

export interface AccountPage {
    ts: string;
    total: number;
    list: []
}
export interface MitoPage {
    ts: string;
    total: number;
    list: []
}
export interface TagPage {
    ts: string;
    total: number;
    list: []
}
export interface HotWordPage {
    ts: string;
    total: number;
    list: []
}
export interface CreateAdmin {

}
export interface CreateNav {

}
export interface CreateCategory{

}
export interface CreateMito{

}
export interface CreateTag{

}
export interface CreateHotWord{

}
export interface DeleteMito{

}
export interface DeleteNav {

}
export interface DeleteTag{

}
export interface DeleteCategory {

}
export interface DeleteHotWord {

}
export class System {
    @observable
    navPage: NavPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    tagPage: TagPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    hotWordPage: HotWordPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    mitoPage: MitoPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    systemPage: SystemPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    categoryPage: CategoryPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    systemSetting: SystemSetting = {

    };
    @observable
    accountPage: AccountPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    createAdmin: CreateAdmin = {

    };
    @observable
    createTag: CreateTag = {

    };
    @observable
    createNav: CreateNav = {

    };
    @observable
    deleteNav: DeleteNav = {

    };
    @observable
    deleteTag: DeleteTag = {

    };
    @observable
    createCategory: CreateCategory = {

    };
    @observable
    deleteCategory: DeleteCategory = {

    };
    @observable
    createMito: CreateMito = {

    };
    @observable
    deleteMito: DeleteMito = {

    };
    @observable
    createHotWord: CreateHotWord = {

    };
    @observable
    deleteHotWord: DeleteHotWord = {

    };
    @action
    async getSystemPage({ data, callback }: ReqData) {
        const res = await request<SystemPage>(urlMaps.getSystemPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.systemPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async getHotWordPage({ data, callback }: ReqData) {
        const res = await request<TagPage>(urlMaps.getHotWordPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.hotWordPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async getMitoPage({ data, callback }: ReqData) {
        const res = await request<MitoPage>(urlMaps.getMitoPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.mitoPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async getNavPage({ data, callback }: ReqData) {
        const res = await request<NavPage>(urlMaps.getNavPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.navPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async getCategoryPage({ data, callback }: ReqData) {
        const res = await request<CategoryPage>(urlMaps.getCategoryPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.categoryPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async saveSystemSetting({ data, callback }: ReqData) {
        const res = await request<SystemSetting>(urlMaps.saveSystemSetting, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.systemSetting = res.data;

        }
        if (callback) {
            callback(res);
        }
    }

    @action
    async getAccountPage({ data, callback }: ReqData) {
        const res = await request<AccountPage>(urlMaps.getAccountPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.accountPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }

    @action
    async CreateAdmin({ data, callback }: ReqData) {
        const res = await request<CreateAdmin>(urlMaps.CreateAdmin, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createAdmin = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async CreateTag({ data, callback }: ReqData) {
        const res = await request<CreateTag>(urlMaps.CreateTag, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createTag = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async CreateNav({ data, callback }: ReqData) {
        const res = await request<CreateNav>(urlMaps.CreateNav, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createNav = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async CreateMito({ data, callback }: ReqData) {
        const res = await request<CreateMito>(urlMaps.CreateMito, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createMito = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    
    @action
    async CreateCategory({ data, callback }: ReqData) {
        const res = await request<CreateCategory>(urlMaps.CreateCategory, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createCategory = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async CreateHotWord({ data, callback }: ReqData) {
        const res = await request<CreateHotWord>(urlMaps.CreateHotWord, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createHotWord = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async DeleteNav({ data, callback }: ReqData) {
        const res = await request<DeleteNav>(urlMaps.DeleteNav, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.deleteNav = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async DeleteTag({ data, callback }: ReqData) {
        const res = await request<DeleteTag>(urlMaps.DeleteTag, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.deleteTag = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async DeleteMito({ data, callback }: ReqData) {
        const res = await request<DeleteMito>(urlMaps.DeleteMito, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.deleteMito = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async DeleteCategory({ data, callback }: ReqData) {
        const res = await request<DeleteCategory>(urlMaps.DeleteCategory, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.deleteCategory = res.data;

        }
        if (callback) {
            callback(res);
        }
    }

    @action
    async DeleteHotWord({ data, callback }: ReqData) {
        const res = await request<DeleteHotWord>(urlMaps.DeleteHotWord, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.deleteHotWord = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
}

export default System;
