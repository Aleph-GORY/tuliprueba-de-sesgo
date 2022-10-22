import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Layout from '../Layout';

class DashboardContainer extends Component {

    componentDidMount() {
      
    };

    render() {
        const { loadingChangePassword } = this.props;

        return (<Layout>
            <Row>
                <Col xs={24} lg={12}>
                   <h1>Hola</h1>
                </Col>
            </Row>
        </Layout>);
    };
};

function mapStateToProps(state) {
    return {
        loadingChangePassword: state.common.loadingChangePassword
    };
};

export default connect(mapStateToProps, {

})(DashboardContainer);
