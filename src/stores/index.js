import urlsStore from './urls';
import notificationsStore from './notifications';

class RootStore{
    constructor(){
        this.urls = new urlsStore(this);
        this.notifications = new notificationsStore(this);
    }
}

export default new RootStore;