import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

class Error404Container extends Component {
    render() {
        return (<>
            <Result status="404" title="ERROR 404" subTitle="ESTA PÁGINA NO EXISTE" extra={<Link to="/"><Button className="t-black">REGRESAR</Button></Link>} />
        </>);
    };
};

export default Error404Container;
