import React, { Component } from 'react';
import withStore from '../../hocs/withStore';
import styles from './index.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Notifications extends Component{
    render(){
        let model = this.props.stores.notifications;

        let messages = model.list.map((note) => {
            return (
            <CSSTransition key={note.id} 
                           classNames={{
                             enter: styles.itemEnter,
                             enterActive: styles.itemEnterActive,
                             exitActive: styles.itemLeaveActive
                           }}
                           timeout={500}
            >
                <div className={`toast ${styles.item}`}>
                    <div className="toast-header">
                        <strong className="mr-auto">Внимание!</strong>
                        <button type="button" className="ml-2 mb-1 close" onClick={() => {model.remove(note.id)}}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={`toast-body ${styles.message}`}>
                        {note.message}
                    </div>
                </div>
            </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={styles.box}>
                {messages}
            </TransitionGroup>
        );
    }
}

export default withStore(Notifications);