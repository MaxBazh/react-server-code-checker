import React from 'react';
import withStore from '../../../hocs/withStore';

import styles from './tbody.module.css';

import copyIcon from './copy.svg';

const TBody = (props) => {

    const urlsStore = props.stores.urls;
    const notificationsStore = props.stores.notifications;

    const {  
        getActiveUrls
      } = urlsStore;
    
    function copyText(idx) {
        const item = urlsStore.getByIndex(idx);
        navigator.clipboard.writeText(item.url)
            .then(() => {
                notificationsStore.add(`Скопировано ${item.url}.`); 
            })
            .catch(err => {
                notificationsStore.add('Ошибка копирования в буфер.');  
                console.log('Ошбика копирования. ', err);
            })
    }

    let tbody = getActiveUrls.map((el, i) => {
        const { status, url } = el;
        let statusText = status;

        let tableClass = '';
        switch (status) {
            case 200:
                tableClass = 'table-success';            
                break;        
            case 404:
                tableClass = 'table-primary';            
                break;        
            case -1:
                statusText = el.errors;
                tableClass = 'table-danger';            
                break;        
            default:
                tableClass = 'table-secondary';   
                break;
        }

        return (
            <tr className={tableClass} key={i}>
            <td className={styles.tdCopy}>
                <img src={copyIcon} className={styles.copy} onClick={() => copyText(i)}/>
            </td>
            <td scope="row">
                <a 
                href={url} 
                className={`text-info ${styles.link}`}
                target='_blank' 
                title='Открыть в новом окне'
                >
                {url}
                </a>
            </td>
            <td>{statusText}</td>
            </tr>
        );
    });

    if( tbody.length === 0 ){
        return (
            <>
            <div className={`col-12 ${styles.results}`}>
                <p>Нет таких статусов.</p>
            </div>
            </>
        );
    }

    return (      
        <tbody>
            { tbody }
        </tbody>
    )
}

export default withStore(TBody);