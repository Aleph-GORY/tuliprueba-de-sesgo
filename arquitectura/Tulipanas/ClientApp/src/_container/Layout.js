import React from 'react';
import { Layout } from 'antd';

const PrivateLayout = ({ children }) => {
    return (<>
        <div className="main-page">
            <div className="upperPage">
                <Layout className="page">
                    {children}
                </Layout>
            </div>
        </div>
    </>);
};

export default PrivateLayout;
