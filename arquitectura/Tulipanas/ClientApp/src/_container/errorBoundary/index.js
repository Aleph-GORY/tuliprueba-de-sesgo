import React, { Component } from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    };

    static getDerivedStateFromError(e) {
        console.log(e);
        return { hasError: true };
    };

    render() {
        const { hasError } = this.state, { children } = this.props;

        if (!hasError) return (children);
        return (<>
            <Result status="500" title="ERROR" subTitle={"OCURRIO UN ERROR EN LA APLICACIÓN"} extra={<Button onClick={() => { window.location = "/"; }} className="t-black">IR A INICIO</Button>} />
        </>);
    };
}

export default ErrorBoundary;
