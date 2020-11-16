import React from 'react';

import Header from '../header';
import UrlForm from '../url-form';
import Filters from '../filters';
import Results from '../results';
import Notifications from '../notifications';

export default () => {
    return (
        <>
            <Notifications />
            <Header />
            <div className="container">
                <div className="row">
                    <UrlForm />
                </div>
                <div className="row">
                    <Filters />
                </div>
                <div className="row">
                    <Results />
                </div>
            </div>
        </>
    ); 
}