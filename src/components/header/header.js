import React from 'react';
import withStore from '../../hocs/withStore';
import styles from './header.module.css';

const Header = (props) => {
    function reset(){
        const urlsStore = props.stores.urls;
        urlsStore.reset();
    }

    return (
        <nav className={`navbar navbar-dark bg-primary ${styles.navbar}`}>
            <div className="container">
                <h1 className="navbar-brand">Проверяльщик ответа сервера</h1>
                <button 
                    type="button" 
                    className="btn btn-info btn-sm"
                    onClick={reset}
                >Начать заново</button>
            </div>
        </nav>
    );
}

export default withStore(Header);