import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { UploadFile } from '../../_action/Common';
import { FileUpload } from '../Combos';
import Layout from '../Layout';
import { Alert } from '../../_utility';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { loadingUpload: false };
    }

    accion = {
        setFile: (file) => {
            this.setState({ loadingUpload: true });
            console.log(file);

            let formData: FormData;
            formData = new FormData();
            formData.append('file', file);

            UploadFile(formData, () => {
                Alert("Los resultados pueden tardan en aparecer, favor de esperar un poco.", "success");
                this.setState({ loadingUpload: false });
            }, () => {
                this.setState({ loadingUpload: false });
                Alert("Ocurrio un error al procesar.", "error");
            });
        }
    };

    render() {
        const { setFile } = this.accion;
        const { loadingUpload } = this.state;

        return (<Layout>
            <Row className="mainPage">
                <Col xs={24}>
                    <h1>TULIPRUEBA DE SESGO</h1>
                </Col>
                <Col xs={24}>
                    <h4>
                        <b>Tuliprueba</b> está basada en el Test de Bechdel, dicho test aparece mencionado por primera vez en 1985, en una tira cómica llamada The Rule, en la novela gráfica Dykes to Watch Out For. Una de las protagonistas declara que sólo está dispuesta a ver una película si cumple con los siguientes requisitos:
                    </h4>
                </Col>
                <Col xs={24}>
                    <ul className="list">
                        <li>Aparecen al menos dos personajes femeninos.</li>
                        <li>Aparecen al menos dos personajes femeninos.</li>
                        <li>Que no tiene como tema un hombre.</li>
                    </ul>
                </Col>
                <FileUpload limite={2} accept={["txt", "mp3"]} setFile={setFile} loading={loadingUpload}></FileUpload>
            </Row>
        </Layout>);
    };
};

export default DashboardContainer;
