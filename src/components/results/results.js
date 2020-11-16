import React, { Component } from 'react';
import withStore from '../../hocs/withStore';
import styles from './results.module.css';
import Spinner from '../spinner';
import Progress from '../progress';
import TBody from './tbody';

class Results extends Component {
  urlsStore = this.props.stores.urls;

  render(){
      const { 
        isEmpty, 
        loading
      } = this.urlsStore;
      
      if( loading === true ){
        return (   
          <>    
            <Spinner />  
            <Progress />
          </>      
        );
      }

      if( isEmpty === true ){
        return (
          <></>
        );
      }

      return (
        <>
          <Progress />  
          <div className={`col-12 ${styles.results}`}>
              <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">URL</th>
                      <th scope="col">Статус</th>
                    </tr>
                  </thead>
                  <TBody />
                </table>
          </div>
        </>
    );
  }
  
}
export default withStore(Results);