import React, { Component } from 'react';
import withStore from '../../hocs/withStore';

class UrlForm extends Component{    
    notificationsStore = this.props.stores.notifications;
    urlsStore = this.props.stores.urls;

    onSubmit = (e) => {
        e.preventDefault(); 

        const { 
            textarea
         } = this.urlsStore;
        
        if( !textarea ){
            this.notificationsStore.add('Введите хотя бы 1 URL.');
            return false;
        }
        
        this.urlsStore.add();
    }

    onChangeTextarea = (e) => { 
        this.urlsStore.changeTextarea(e.target.value);
    }

    render(){
        const { 
            textarea, 
            totalTextareaUrls
         } = this.urlsStore;

        return (
            <>
                <div className="col-12">
                    <p>Сервис проверяет ответ сервера для введенных URL. Бесплатно и без ограничений по количеству URL.</p>
                </div>
                <div className="col-12">
                    <h2>Введите список URL для проверки</h2>
                </div>
                <div className="col-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleTextarea">Новый URL с новой строчки</label>
                            <textarea 
                                className="form-control" 
                                id="exampleTextarea" 
                                rows="5"
                                value={textarea}
                                onChange={this.onChangeTextarea}
                            ></textarea>
                        </div>
                        <p>{`(Количество URL: ${totalTextareaUrls})`}</p>
                        <button type="submit" className="btn btn-success">Проверить</button>
                    </form>
                </div>
            </>
        );
    }    
}

export default withStore(UrlForm);