import React from 'react';
import { Layout } from 'antd';

const PrivateLayout = ({ children }) => {
    return (<>
        <div className="main-page">
            <div className="upperPage">
                <Layout className="page">
                    <Layout className="bg-white">
                        {children}
                    </Layout>
                </Layout>
            </div>
        </div>
    </>);
};

export default PrivateLayout;
