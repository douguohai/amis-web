import { action, computed, observable} from "mobx";

class UserStore {

    @observable
    name = "";
    token = "";

    constructor() {
        this.name =  localStorage.getItem('authenticated') || '';
    }

    @computed
    get isAuthenticated() {
        return !!this.name;
    }

    @action
    setName(name) {
        this.name=name
    }

    @action
    login(name,token) {
        this.name=name;
        this.token=token;
        localStorage.setItem('authenticated', name);
        localStorage.setItem('token', token);
    }


    @action
    logout() {
        localStorage.setItem('authenticated', '');
        this.name = '';
        console.log("logout finished!");
    }

}
export default UserStore;
