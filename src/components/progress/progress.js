import React, { Component } from "react";
import withStore from '../../hocs/withStore';
import styles from "./progress.module.css";

const Progress = (props) => {
  const loadingChunks = props.stores.urls.loadingChunks;

  const { 
    status,
    all,
    current,
    progress
  } = loadingChunks;
      
  if( status !== true ){
    return (    
      <></>       
    );
  };

  return (
    <div className={`col-12 ${styles.box}`}>
        <p>{`Обработано ${current} из ${all}`}</p>
        <div className="progress">
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated" 
              style={{width: `${progress}%`}}
            ></div>
        </div>
    </div>
  );
};
export default withStore(Progress);
