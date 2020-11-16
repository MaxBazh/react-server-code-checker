import {observable, computed, action} from 'mobx';
import Checker404Service from '../services/checker404Servise';
import addProtocol from '../utils/addProtocol';

class Urls{
    checker404Service = new Checker404Service();

    // По сколько URL отправлять на сервер?
    itemsPerChunk = 10;
    
    @observable urls = [];
    @observable textarea = '';
    @observable activeStatus = 1;
    @observable totalTextareaUrls = 0;
    @observable loading = false;
    @observable loadingChunks = {
        status: false,
        all: 0,
        current: 0,
        progress: 0
    };

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @computed get isEmpty(){
        return this.urls.length ? false : true;
    }
    
    @computed get isEmptyStatuses(){
        return (this.getStatuses.length > 1) ? false : true;
    }

    @computed get getStatuses(){
        let total = 0;

        let statuses = this.urls.reduce(
            (accumulator, item) => {
                let { status } = item;
                total++;
                
                const addedElIndex = accumulator.findIndex((el) => el.status === status);
                if( addedElIndex !== -1 ){
                    accumulator[addedElIndex]['count']++;
                    return accumulator;
                }

                return [...accumulator, { status, count: 1 }]
            }, 
            []
        );

        // Сортируем в нужном порядке. 
        // 200, 404, ... , Другое
        // Наверняка можно сделать лучше.
        statuses.sort((a, b) => {
            if( a.status == 200 ) return -1;
            if( b.status == 200 ) return 1;
            if( a.status == 404 ) return -1;
            if( b.status == 404 ) return 1;
            if( a.status == -1 ) return 1;
            if( b.status == -1 ) return -1;
        });
        
        // Добавляем ВСЕ
        statuses.unshift({status: 1, count: total});
        
        return statuses;
    }
    
    @computed get getActiveUrls(){    
        let activeUrls = [];
        
        this.urls.forEach((el, i) => {
            const { status } = el;

            if( this.activeStatus !== 1 && this.activeStatus !== status ){
                return false;
            }

            activeUrls.push(el);
        });
        
        return activeUrls;
    }

    @computed get getByIndex(){     
        return (i) => this.urls[i];
    }


    @action async add(){
        const { add } = this.rootStore.notifications;

        this.loading = true;

        let urlsList = this.prepareUrls(this.textarea);

        this.totalTextareaUrls = urlsList.length;
        
        if( this.totalTextareaUrls <= this.itemsPerChunk ){
            const res = await this.getChekedUrls(urlsList);
            if( res === undefined ){
                return null;
            }
            
            this.urls = res;
            this.activeStatus = 1;
            this.loading = false;
            return res;
        }        

        // Если больше itemsPerChunk, то бъём на чанки.
        let chunks = [];
        urlsList.forEach((el, i) => {
            const chunkIndex = parseInt(i/10);
            if( chunks[chunkIndex] === undefined ){
                chunks[chunkIndex] = [];
            }
            chunks[chunkIndex].push(el);
        });

        if( chunks.length ){
            this.urls = [];
            this.loadingChunks.status = true;
            this.loadingChunks.all = this.totalTextareaUrls;
            this.activeStatus = 1;
            this.addByChunks(chunks);
        } else {
            console.log('Чанков нет!');
        }
    }

    @action changeTextarea(data){
        this.textarea = data;
        this.totalTextareaUrls = this.prepareUrls(data).length;
    }

    @action reset(){
        this.urls = [];
        this.textarea = '';
        this.totalTextareaUrls = 0;
        this.loading = false;
        this.loadingChunks = {
            status: false,
            all: 0,
            current: 0,
            progress: 0
        }
    }

    @action changeActiveStatus = (newStatus) => {
        this.activeStatus = newStatus;
    }

    @action addByChunks = async (chunks, currentChunk = 0) => {
        const { 
            all
        } = this.loadingChunks;
        const loadedItems = currentChunk * this.itemsPerChunk;

        this.loadingChunks.current = loadedItems;
        this.loadingChunks.progress = (loadedItems * 100 ) / all;
        
        if( chunks.length <= currentChunk ){
            this.loadingChunks.status = false;
            return false;
        }
        
        const res = await this.getChekedUrls(chunks[currentChunk]);
        if( !this.loadingChunks.status ){
            return false;
        }
        this.urls = [...this.urls, ...res];
        this.loading = false;
        this.addByChunks(chunks, ++currentChunk);
    }

    prepareUrls(urls){
        return urls
                .trim()
                .split(/\r\n|\r|\n/)
                .filter(el => el)
                .map(el => addProtocol(el));
    }

    getChekedUrls = (urlsList) => {
        return this.checker404Service
                .getChekedUrls(urlsList)
                .then(res => {
                    if( res === null ){
                        this.rootStore.notifications.add('URL введен некорректно.');
                        return false;
                    }

                    return res
                            .filter(el => el.status = parseInt(el.status));
                })
                .catch(err => {
                    console.log(err);
                    this.rootStore.notifications.add('Ошибка при обработке запроса.');
                    this.reset();
                });
    }
}

export default Urls;