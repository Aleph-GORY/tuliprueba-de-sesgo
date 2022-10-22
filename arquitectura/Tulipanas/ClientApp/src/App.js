import React, { Component } from 'react';
import { Provider } from 'react-redux'
import PageRouter from './_router';
import generateStore from './_store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ErrorBoundary from './_container/errorBoundary';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/es_ES';
import { renderEmpty } from './_utility';
import { validateMessages } from './_constant';
import 'moment/locale/es-us';
library.add(fas, far, fab);

class App extends Component {
    render() {
        return (<div>
            <Provider store={generateStore()}>
                <ConfigProvider renderEmpty={renderEmpty} locale={locale} virtual form={{ validateMessages, requiredMark: true }}>
                    <ErrorBoundary>
                        <PageRouter />
                    </ErrorBoundary>
                </ConfigProvider>
            </Provider>
        </div>);
    };
};

export default App;
