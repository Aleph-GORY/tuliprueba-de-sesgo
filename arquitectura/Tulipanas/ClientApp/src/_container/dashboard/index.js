import React, { Component } from 'react';
import { Row, Col, Button, Modal, Empty } from 'antd';
import { UploadFile, GetData } from '../../_action/Common';
import { FileUpload } from '../Combos';
import Layout from '../Layout';
import { Alert } from '../../_utility';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingUpload: false,
            showModal: false,
            data: []
        };
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
        },
        getData: () => {
            GetData((result) => {
                console.log(result)
                Alert("Los resultados pueden tardan en aparecer, favor de esperar un poco.", "success");
                this.setState({ data: result.data });
            }, () => {
                this.setState({ data: [] });
                Alert("Ocurrio un error al procesar.", "error");
            });
        },
        openModal: () => {
            this.setState({ showModal: true });
            this.accion.getData();
        },
        closeModal: () => {
            this.setState({ showModal: false });
        }
    };

    render() {
        const { setFile, openModal, closeModal } = this.accion;
        const { loadingUpload, showModal, data } = this.state;

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
                <FileUpload limite={20} accept={["txt", "mp3"]} setFile={setFile} loading={loadingUpload}></FileUpload>
                <Col xs={24} style={{ marginTop: 20 }}>
                    <Button onClick={openModal}>VER RESULTADOS</Button>
                </Col>
                <Modal title="TODOS LOS RESULTADOS" open={showModal} onCancel={closeModal} onOk={closeModal}>
                    {data.length === 0 ? <Empty /> : <>
                        <h1>la dataaa</h1>
                    </>}
                </Modal>
            </Row>
        </Layout>);
    };
};

export default DashboardContainer;
