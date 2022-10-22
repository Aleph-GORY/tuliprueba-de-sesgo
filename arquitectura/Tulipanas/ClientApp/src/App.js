import React, { Component } from 'react';
import PageRouter from './_router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ErrorBoundary from './_container/errorBoundary';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/es_ES';
import 'moment/locale/es-us';
library.add(fas, far, fab);

class App extends Component {
    render() {
        return (<>
            <ConfigProvider locale={locale} virtual>
                <ErrorBoundary>
                    <PageRouter />
                </ErrorBoundary>
            </ConfigProvider>
        </>);
    };
};

export default App;
