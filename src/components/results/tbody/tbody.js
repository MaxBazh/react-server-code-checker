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
    
    function copyText(urlText) {        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlText)
            .then(() => {
                notificationsStore.add(`Скопировано ${urlText}.`); 
            })
            .catch(err => {
                notificationsStore.add('Ошибка копирования в буфер.');  
                console.log('Ошбика копирования. ', err);
            })
        } else {        
            fallbackCopyTextToClipboard(urlText) 
                ? notificationsStore.add(`Скопировано ${urlText}.`)
                : notificationsStore.add('Ошибка копирования в буфер.');
        }        
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
                <img src={copyIcon} className={styles.copy} onClick={() => copyText(url)}/>
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

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      const successful = document.execCommand('copy');  
      return successful;
    } catch (err) {  
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }

export default withStore(TBody);