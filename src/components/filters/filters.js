import React from 'react';
import withStore from '../../hocs/withStore';
import styles from './filters.module.css';
import Spinner from '../spinner';

const Filters = (props) => {
    const urlsStore = props.stores.urls;
    const { isEmptyStatuses, 
            getStatuses, 
            activeStatus,
            changeActiveStatus,
            loading
    } = urlsStore;

    if( loading === true ){
        return (         
          <></>
        );
      }

    if( isEmptyStatuses === true ){
        return (
          <></>
        );
    }

    const buttons = getStatuses.map((el, i, arr) => {
        const { 
            status,
            count
        } = el;

        let clazz = 'btn';
        clazz += ( (arr.length - 1) != i ) ? ' mr-2' : '';
        clazz += ( (arr.length - 1) != i ) ? ' mr-2' : '';
        clazz += ( activeStatus == status ) ? ' active' : '';

        let title = status;

        switch (status) {        
            case 1:
                clazz += ' btn-outline-info'; 
                title = 'Все';        
                break;
            case 200:
                clazz += ' btn-outline-success';
                break;        
            case 404:
                clazz += ' btn-outline-primary';
                break;      
            case -1:
                clazz += ' btn-outline-danger';  
                title = 'Другое';          
                break;            
            default:
                clazz += ' btn-outline-secondary';
                break;
        }

        title += ` (${count})`;

        return (
            <button 
                key={status} 
                type="button" 
                className={clazz} 
                onClick={() => changeActiveStatus(status)}
            >
                {title}
            </button>
        );
    })

    return (
        <div className={`col-12 ${styles.filters}`}>
            <div className="card bg-light">
                <div className="card-header">Фильтры</div>
                <div className="card-body">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default withStore(Filters);