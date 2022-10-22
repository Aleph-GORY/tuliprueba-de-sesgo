import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Button, DatePicker, Select, Input, Form, Col, Upload, Checkbox, Card, InputNumber, Radio, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, getLocalStorage } from '../_utility';
import { getDistribuidores, getEmpresas, getCuentas, cleanEmpresas, cleanCuentas, getListaServicios, getEmpresasNoRedux, getCuentasNoRedux } from '../_action/Empresa';
import { getCiudades, getDepartamentos, getProtocolos, getSeguridadCorreo, getUnidadesMedida } from '../_action/Catalogo';
import { getDocument } from '../_action/Utility';
import { establecerAccion } from '../_action/Menu';
import { UploadOutlined, PercentageOutlined } from '@ant-design/icons';

class DEC extends Component {

    constructor(props) {
        super(props);
        this.state = { userData: getLocalStorage("userData", true).data };
    };

    componentDidMount() {
        const { userData } = this.state;
        this.props.getDistribuidores();
        this.props.getEmpresas(userData.empresaDistribuidor);
        this.props.getCuentas(userData.IdEmpresa);
    };

    accion = {
        changeDistribuidor: (val) => {
            if (val) this.props.getEmpresas(val);
            else {
                this.props.cleanEmpresas();
                this.props.cleanCuentas();
            }
            this.props.form.current.setFieldsValue({ IdEmpresa: null, IdCuenta: null });
        },
        changeEmpresa: (val) => {
            if (val) this.props.getCuentas(val);
            else this.props.cleanCuentas();
            this.props.form.current.setFieldsValue({ IdCuenta: null });
        },
    };

    render() {
        const { distribuidores, empresas, cuentas, disabled, disableDistribuidor, disableEmpresa, hideDistribuidor = false } = this.props;
        const { userData } = this.state;

        return (<>
            {!hideDistribuidor &&
                <Col xs={24} md={12} lg={6}>
                    <Form.Item label="DISTRIBUIDOR:" name="IdDistribuidor" initialValue={userData.empresaDistribuidor}>
                        <Select disabled={(userData.isAdmin_Portal ? false : true) || disabled || disableDistribuidor} showSearch allowClear optionFilterProp="children" style={{ width: "100%" }}
                            onChange={(val) => this.accion.changeDistribuidor(val)} placeholder="TODOS LOS DISTRIBUIDORES">
                            {distribuidores && distribuidores.map((distribuidor) =>
                                <Select.Option key={distribuidor.idEmpresa} value={distribuidor.idEmpresa}>{distribuidor.idEmpresa ? distribuidor.idEmpresa : ""} / {distribuidor.nombre ? distribuidor.nombre.toUpperCase() : ""}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
            }
            <Col xs={24} md={12} lg={6}>
                <Form.Item label="EMPRESA:" name="IdEmpresa" initialValue={userData.IdEmpresa}>
                    <Select disabled={(userData.isAdmin_Distribuidor || userData.isAdmin_Portal ? false : true) || disabled || disableEmpresa} showSearch allowClear optionFilterProp="children" style={{ width: "100%" }}
                        onChange={(val) => this.accion.changeEmpresa(val)} placeholder="TODAS LAS EMPRESAS">
                        {empresas && empresas.map((empresa) =>
                            <Select.Option key={empresa.IdEmpresa} value={empresa.IdEmpresa}>{empresa.IdEmpresa.toUpperCase()} / {empresa.Nombre.toUpperCase()}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
                <Form.Item label="CUENTA:" name="IdCuenta">
                    <Select disabled={disabled} showSearch allowClear optionFilterProp="children" style={{ width: "100%" }} placeholder="TODAS LAS CUENTAS">
                        {cuentas && cuentas.map((cuenta) =>
                            <Select.Option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>{cuenta.IdCuenta.toUpperCase()} / {cuenta.IdFiscal.toUpperCase()}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
        </>);
    };
};

export const DistribuidorEmpresaCuenta = connect((state) => ({
    distribuidores: state.empresa.distribuidores,
    empresas: state.empresa.empresas,
    cuentas: state.empresa.cuentas,
}), { getDistribuidores, getEmpresas, cleanEmpresas, getCuentas, cleanCuentas })(DEC);

export const RangePicker = ({ disabled, sm = 24, md = 12, lg = 6, label = "FECHAS", name = "Fechas", showTime = false, initial = true, maxToday = false, inModal = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initial ? [moment(), moment()] : null}>
            <DatePicker.RangePicker placeholder={['INICIO', 'FIN']} disabled={disabled} style={{ width: "100%" }} allowClear={false}
                disabledDate={maxToday ? (current) => (current && current > moment().endOf('day')) : null} format={showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"}
                showTime={showTime ? { defaultValue: moment('00:00', 'HH:mm') } : false} getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}
                ranges={{
                    "Hoy": [moment(), moment()],
                    "Esta semana": [moment().subtract(moment().day(), "days"), moment()],
                    "Este mes": [moment().startOf('month'), moment()],
                    "7 dias": [moment().subtract(6, "days"), moment()],
                    "15 dias": [moment().subtract(14, "days"), moment()],
                    "30 dias": [moment().subtract(29, "days"), moment()],
                }} />
        </Form.Item>
    </Col>);
};

export const MonthPicker = ({ disabled = false, label, name, required = false, initialValue, maxToday = false }) => {
    return (<Col xs={24} md={12} lg={6}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <DatePicker picker="month" placeholder="SELECCIONA UN MES" disabled={disabled} style={{ width: "100%" }} format="YYYY/MM" allowClear={false}
                disabledDate={maxToday ? (current) => (current && current > moment().endOf('day')) : null} />
        </Form.Item>
    </Col>);
};

export const DayPicker = ({ disabled = false, sm = 6, md = 6, lg = 6, label, name, initialValue = null, required = false, maxToday = false, inModal = false, showTime = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <DatePicker placeholder="SELECCIONA UN DÍA" disabled={disabled} style={{ width: "100%" }} format={showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"} allowClear={!required}
                disabledDate={maxToday ? (current) => (current && current > moment().endOf('day')) : null} getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}
                showTime={showTime ? { defaultValue: moment('00:00', 'HH:mm') } : false} />
        </Form.Item>
    </Col>);
};

export const InputForm = ({ disabled = false, label, name, maxLength = 50, sm = 12, md = 12, lg = 6, initialValue = "", hidden, email, phone, numbers, required = false, normalize = null, autoComplete = false, onChange = null }) => {
    const type = (email ? "email" : "string"), pattern = (phone ? new RegExp(/^([0-9]+-)*[0-9]+$/) : numbers ? new RegExp("^[0-9]*$") : null);
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} hidden={hidden} normalize={normalize}
            rules={[{ type, required, whitespace: true, pattern }]}>
            <Input disabled={disabled} maxLength={hidden ? null : maxLength} autoComplete={"false"} onChange={onChange} />
        </Form.Item>
    </Col>);
};

export const PasswordForm = ({ disabled, label, name, maxLength = 100, sm = 12, md = 12, lg = 6, initialValue = "", required = false, autoComplete = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Input.Password disabled={disabled} maxLength={maxLength} autoComplete={autoComplete === false ? "new-password" : "false"} />
        </Form.Item>
    </Col>);
};

export const NumberForm = ({ disabled, min, max, label, name, initialValue, required = false, sm = 12, md = 12, lg = 6, onChange = null, porcentaje = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <InputNumber disabled={disabled} min={min} max={max} style={{ width: "100%" }} onChange={onChange} addonAfter={porcentaje ? <PercentageOutlined /> : null} />
        </Form.Item>
    </Col>);
};

export const Radios = ({ disabled, values, label, name, initialValue, required = false, sm = 12, md = 12, lg = 6 }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Radio.Group disabled={disabled}>
                {values && values.map((e) => <Radio key={e.val} value={e.val}>{e.name}</Radio>)}
            </Radio.Group>
        </Form.Item>
    </Col>);
};

export const Empresa = ({ disabled, lg = 6, required = false, initialValue = null }) => {
    const dispatch = useDispatch(), userData = getLocalStorage("userData", true).data, { empresas } = useSelector((state) => state.empresa);

    useEffect(() => {
        dispatch(getEmpresas(userData.empresaDistribuidor));
    }, []);

    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="EMPRESA:" name="IdEmpresa" initialValue={initialValue ? initialValue : userData.IdEmpresa} rules={[{ required }]}>
            <Select disabled={(userData.isAdmin_Distribuidor || userData.isAdmin_Portal ? false : true) || disabled} showSearch allowClear={!required} optionFilterProp="children" style={{ width: "100%" }}
                placeholder={required ? "SELECCIONA" : "TODAS LAS EMPRESAS"}>
                {empresas && empresas.map((empresa) =>
                    <Select.Option key={empresa.IdEmpresa} value={empresa.IdEmpresa}>{empresa.IdEmpresa.toUpperCase()} / {empresa.Nombre.toUpperCase()}</Select.Option>
                )}
            </Select>
        </Form.Item>
    </Col>);
};

export const EmpresaCuentaNoRedux = ({ IdDistribuidor = null, disabled = false, sm = 6, md = 6, lg = 6, required = false, inModal = false, form = null }) => {
    const [cuentas, setCuentas] = useState([]), [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        getEmpresasNoRedux(IdDistribuidor, (data) => {
            setEmpresas(data);
        });
    }, []);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="EMPRESA:" name="IdEmpresa" rules={[{ required }]}>
                <Select disabled={disabled} showSearch allowClear={!required} optionFilterProp="children" style={{ width: "100%" }}
                    onChange={(val) => {
                        getCuentasNoRedux(val, (data) => {
                            setCuentas(data);
                            if (form) form.setFieldsValue({ IdCuenta: null });
                        });
                    }} placeholder={required ? "SELECCIONA" : "TODAS LAS EMPRESAS"} getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {empresas && empresas.map((empresa) =>
                        <Select.Option key={empresa.IdEmpresa} value={empresa.IdEmpresa}>{empresa.IdEmpresa.toUpperCase()} / {empresa.Nombre.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="CUENTA:" name="IdCuenta" rules={[{ required }]}>
                <Select disabled={disabled} showSearch allowClear={!required} optionFilterProp="children" style={{ width: "100%" }}
                    placeholder={required ? "SELECCIONA" : "TODAS LAS EMPRESAS"} getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {cuentas && cuentas.map((cuenta) =>
                        <Select.Option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>{cuenta.IdCuenta.toUpperCase()} / {cuenta.IdFiscal.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const CuentaNoRedux = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false, onChange = null }) => {
    const [cuentas, setCuentas] = useState([]);

    useEffect(() => {
        getCuentasNoRedux(null, (data) => {
            setCuentas(data);
        });
    }, []);

    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="CUENTA:" name="IdCuenta" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} onChange={onChange}>
                {cuentas && cuentas.map((cuenta) =>
                    <Select.Option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>{cuenta.IdCuenta.toUpperCase()} / {cuenta.IdFiscal.toUpperCase()}</Select.Option>
                )}
            </Select>
        </Form.Item>
    </Col>);
};

export const CFD = ({ disabled, lg = 6, name = "version", required = false, initialValue = null }) => {
    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="VERSIÓN:" name={name} initialValue={initialValue ? initialValue : "2"} rules={[{ required }]}>
            <Select disabled={disabled} style={{ width: "100%" }}>
                <Select.Option key={1} value={"1"}>1</Select.Option>
                <Select.Option key={2} value={"2"}>2</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoFacturaAcuse = ({ disabled, lg = 6, form, tipoDoc = "F" }) => {
    const tipoFactura = [{ value: 'F', label: 'Factura' }, { value: 'N', label: 'Nota Crédito' }, { value: 'D', label: 'Nota Débito' }];
    const acuseData = [{ value: 'Aceptado', label: 'Aceptado' }, { value: 'Rechazado', label: 'Rechazado' }, { value: '3', label: 'Pendiente' }];
    const [showAcuse, setShowAcuse] = useState(true);

    useEffect(() => {
        if (form) {
            setShowAcuse(tipoDoc === "F");
            form.current.setFieldsValue({ tipoDoc: tipoDoc === "C" ? "N" : tipoDoc });
        }
    }, [tipoDoc, form]);

    return (<><Col xs={24} md={12} lg={lg}>
        <Form.Item label="TIPO DOCUMENTO:" name="tipoDoc" initialValue={"F"}>
            <Select disabled={disabled} style={{ width: "100%" }} onChange={(e) => {
                setShowAcuse(e === "F");
                form.current.setFieldsValue({ acuse: null });
            }}>
                {tipoFactura.map((e) => <Select.Option key={e.value} value={e.value}>{e.label.toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>
        <Col xs={24} md={12} lg={lg}>
            <Form.Item label="ACUSE:" name="acuse">
                <Select disabled={disabled || !showAcuse} style={{ width: "100%" }} allowClear placeholder="TODOS">
                    {showAcuse ? acuseData.map((e) => <Select.Option key={e.value} value={e.value}>{e.label.toUpperCase()}</Select.Option>) : null}
                </Select>
            </Form.Item>
        </Col></>);
};

export const EstatusFactura = ({ disabled, lg = 6, name = "estatus", required = false, initialValue = null }) => {
    const estatus = [{ idEtapa: 9, Descripcion: 'Recibido' }, { idEtapa: 22, Descripcion: 'Firmado' }, { idEtapa: 24, Descripcion: 'Recibido Dian' }, { idEtapa: 23, Descripcion: 'Rechazado DIAN' }, { idEtapa: 6, Descripcion: 'Error' }, { idEtapa: 25, Descripcion: 'Enviado' }, { idEtapa: 32, Descripcion: 'Fiscalmente Valido ' }, { idEtapa: 33, Descripcion: 'Fiscalmente Invalido ' }];

    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="ESTATUS:" name={name} initialValue={initialValue ? initialValue : null} rules={[{ required }]}>
            <Select disabled={disabled} style={{ width: "100%" }} allowClear placeholder="TODOS">
                {estatus.map((estatus) => <Select.Option key={estatus.idEtapa} value={estatus.idEtapa}>{estatus.Descripcion.toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoFecha = ({ disabled, required = false, lg = 6, initialValue = "1" }) => {
    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="TIPO FECHA:" name="tipoFecha" rules={[{ required }]} initialValue={initialValue}>
            <Select disabled={disabled} style={{ width: "100%" }}>
                <Select.Option value="1">FECHA DE EMISIÓN</Select.Option>
                <Select.Option value="2">FECHA DE PROCESO</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const Estatus = ({ disabled, initialValue = null, required = false, lg = 6 }) => {
    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="ESTATUS:" name="IdEstatus" rules={[{ required }]} initialValue={initialValue}>
            <Select disabled={disabled} style={{ width: "100%" }} allowClear={required ? false : true} placeholder={required ? "SELECCIONA" : "TODAS"}>
                <Select.Option value="1">ACTIVA</Select.Option>
                <Select.Option value="0">SUSPENDIDA</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoHab = ({ disabled, onChange, initialValue = null, required = false, lg = 8 }) => {
    return (<Col xs={24} md={12} lg={lg}>
        <Form.Item label="TIPO:" name="ModoOperacion" rules={[{ required }]} initialValue={initialValue}>
            <Select disabled={disabled} onChange={onChange ? onChange : null} style={{ width: "100%" }} allowClear={required ? false : true} placeholder={required ? "SELECCIONA" : "TODAS"}>
                <Select.Option value="1">OPERACION</Select.Option>
                <Select.Option value="0">HABILITACION</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const FilterButton = ({ loading, disabled, form, md = 12, lg = 6 }) => {
    const dispatch = useDispatch();

    return (<Col xs={24} md={md} lg={lg} className="colFilterBtn">
        <Button className="filterBtn" loading={loading} disabled={disabled} onClick={() => {
            dispatch(establecerAccion(12));
            form.current.submit();
        }} icon={<FontAwesomeIcon icon={["fas", "search"]} />}>
            BUSCAR
        </Button>
    </Col>);
};

export const DepartamentoCiudad = ({ required = false, disabled = false, inModal = false, IdDepartamento = null, form }) => {
    const { departamentos } = useSelector((state) => state.catalogo), dispatch = useDispatch(), [ciudades, setCiudades] = useState([]);

    const changeDepartamento = (val) => {
        getCiudades(val).then((data) => {
            setCiudades(data);
        });
    };

    useEffect(() => {
        dispatch(getDepartamentos());
    }, []);

    useEffect(() => {
        if (IdDepartamento && IdDepartamento !== "") changeDepartamento(IdDepartamento);
    }, [IdDepartamento]);

    return (<>
        <Col xs={24} md={12} lg={8}>
            <Form.Item label="DEPARTAMENTO:" name="IdDepartamento" rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} onChange={(val) => changeDepartamento(val)}
                    placeholder="DEPARTAMENTO" getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {departamentos && departamentos.map((departamento) =>
                        <Select.Option key={departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.nombre.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
            <Form.Item label="CIUDAD:" name="IdCiudad" rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }}
                    placeholder="CIUDAD" getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {ciudades && ciudades.map((ciudad) =>
                        <Select.Option key={ciudad.idCiudad} value={ciudad.idCiudad}>{ciudad.nombreCiudad.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const LogoForm = ({ disabled, name, limite, descripcion = null, initialValue, required = false, accept = ["jpg"], form = null }) => {
    const [img, setImg] = useState(initialValue), [fileList, setFileList] = useState([]);

    return (<>
        <Col xs={24} className="logoForm">
            <Form.Item name={name} label="b64" hidden={true} initialValue={initialValue}>
                <Input />
            </Form.Item>
            <Form.Item name={name + "File"} label="b64" hidden={true} initialValue={null}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Form.Item rules={[{ required: required && fileList.length === 0 ? true : false }]} name={name + "UPLOADER"}>
                    <Upload listType="picture-card" className="avatar-uploader" showUploadList={false} fileList={fileList} accept={accept.map((e) => "." + e).join(",")} disabled={disabled}
                        multiple={false} beforeUpload={() => false} onChange={(data) => {
                            const splited = data.file.name && data.file.name.split("."), ext = splited && splited[1];
                            if (data === null) {
                                setImg(null);
                                setFileList([]);
                            }
                            else if ((data.file.size / 1024 / 1024) > limite) Alert(`El archivo debe ser menor a los ${limite}MB`, "error");
                            else if (!accept.includes(ext)) Alert("Formato no valido", "error");
                            else if (data.fileList.length > 0) {
                                const reader = new FileReader(), files = [data.fileList.pop()];
                                reader.addEventListener('load', () => {
                                    setImg(reader.result);
                                    setFileList(files);
                                    if (form) form.setFieldsValue({ [name]: reader.result, [name + "File"]: files[0].originFileObj });
                                });
                                reader.readAsDataURL(files[0].originFileObj);
                            }
                        }}>
                        {img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : <div><PlusOutlined /><div style={{ marginTop: 8 }}>SUBIR</div></div>}
                    </Upload>
                </Form.Item>
                {(img && !disabled) ? <FontAwesomeIcon icon={['fas', 'times']} onClick={() => {
                    setImg(null);
                    setFileList([]);
                    if (form) form.setFieldsValue({ [name]: "", [name + "File"]: null });
                }} className="btnClearUpload" /> : null}
            </Form.Item>
        </Col>
        <Col xs={24} style={{ textAlign: "center" }}>
            <small>Límite de tamaño: {limite}MB</small>
            {descripcion && <br />}
            {descripcion && <small>{descripcion}</small>}
        </Col>
    </>);
};

export const FileUpload = ({ disabled, descripcion, name, label, sm = 6, md = 6, lg = 6, limite, required = false, accept = [], form = null, setFile = null }) => {
    const [fileList, setFileList] = useState([]);

    return (<Col xs={24} sm={sm} md={md} lg={lg} className="fileForm">
        <Form.Item name={name} label="file" hidden={true}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Form.Item rules={[{ required: required && fileList.length === 0 ? true : false }]} name={name + "UPLOADER"} label={`${label}:`}>
                <Upload disabled={disabled} multiple={false} beforeUpload={() => false} fileList={fileList} accept={accept.map((e) => "." + e).join(",")}
                    onChange={(data) => {
                        const splited = data.file.name && data.file.name.split("."), nombre = splited && splited[0], ext = splited && splited[1];
                        if (data.fileList.length === 0) {
                            setFileList([]);
                            if (form) form.setFieldsValue({ [name]: null });
                            if (setFile) setFile(null);
                        }
                        else if ((data.file.size / 1024 / 1024) > limite) Alert(`El archivo debe ser menor a los ${limite}MB`, "error");
                        else if (!accept.includes(ext)) Alert("Formato no valido", "error");
                        else if (/[^A-Za-z0-9_]/i.test(nombre)) Alert("El nombre del archivo solo debe estar compuesto por numeros, letras y guiones bajos", "error");
                        else if (data.fileList.length > 0) {
                            const files = [data.fileList.pop()];
                            if (form) form.setFieldsValue({ [name]: files[0].originFileObj });
                            if (setFile) setFile(files[0].originFileObj);
                            setFileList(files);
                        }
                    }}>
                    <Button icon={<UploadOutlined />}>SUBIR</Button>
                    {fileList.length === 0 && descripcion && <span className="descripcionFile">{descripcion}</span>}
                </Upload>
            </Form.Item>
        </Form.Item>
    </Col>);
};

export const FormCheckbox = ({ name, label, sm = 12, lg = 4, disabled = false, required = false, initialValue }) => {
    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} valuePropName="checked" rules={[{ required }]}>
            <Checkbox disabled={disabled} />
        </Form.Item>
    </Col>);
};

export const ManagedCheckbox = ({ name, label, sm = 12, md = 4, lg = 4, disabled = false, onChange = null, checked }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name}>
            <Checkbox disabled={disabled} checked={checked} onChange={(e) => {
                if (onChange !== null) onChange(e.target.checked)
            }} />
        </Form.Item>
    </Col>);
};

export const SelectForm = ({ name, label, sm = 12, lg = 8, disabled = false, initialValue = null, required = false, data, id, desc, onChange = null, inModal = false }) => {
    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {data && data.map((el) =>
                    <Select.Option key={el[id]} value={el[id]}>{el[desc].toUpperCase()}</Select.Option>
                )}
            </Select>
        </Form.Item>
    </Col>);
};

export const CardCheckBox = ({ title = "", icon = ["", ""], name = "", disabled = false, form = null }) => {
    const [checked, setChecked] = useState(false);

    return (<>
        <Card title={<><FontAwesomeIcon icon={["fas", "check"]} className="checkCardCheckBox" />{title}</>} hoverable={!disabled} className={`cardCheckBox ${checked && "checked"}`} onClick={() => {
            if (!disabled && form !== null) {
                setChecked(!checked);
                form.setFieldsValue({ [name]: !checked });
            }
        }}>
            <FontAwesomeIcon icon={icon} />
        </Card>
        <Form.Item name={name} valuePropName="checked" initialValue={checked}>
            <Checkbox />
        </Form.Item>
    </>);
};

export const TipoOrgJuridica = ({ sm = 6, md = 6, lg = 6, name = "tipoOrgJuridica", required = false, disabled = false, onChange = null, inModal = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="TIPO ORG JURIDICA:" name={name} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                <Select.Option key="0" value="1">Persona Jurídica</Select.Option>
                <Select.Option key="1" value="2">Persona Natural</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoDocIdentidad = ({ label, name, initialValue = null, sm = 6, md = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    const { codIdFisc } = useSelector((state) => state.catalogo);

    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {codIdFisc && codIdFisc.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const ClaveTributaria = ({ label, name, initialValue, sm = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    const { codTrib } = useSelector((state) => state.catalogo);

    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {codTrib && codTrib.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const RegimenFiscal = ({ label, name, initialValue, sm = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                <Select.Option key="0" value="04" disabled>Régimen Simple</Select.Option>
                <Select.Option key="1" value="05" disabled>Régimen Ordinario</Select.Option>
                <Select.Option key="2" value="48">Responsable del impuesto sobre las ventas –IVA</Select.Option>
                <Select.Option key="3" value="49">No responsable de IVA</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const Protocolos = ({ label, name, initialValue = null, sm = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false, notAlianza = false }) => {
    const { protocolos } = useSelector((state) => state.catalogo), dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProtocolos());
    }, []);

    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {!notAlianza && <Select.Option key={"0"} value={"0"}>Generico Alianza</Select.Option>}
                {protocolos && protocolos.map((e) => <Select.Option key={e.idprotocoloComunicacion} value={e.idprotocoloComunicacion.toString()}>{`${e.nombreProtocolo}/${e.descripcionProtocolo}`}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const ResponsabilidadesFiscales = ({ label, name, initialValue, sm = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    const { respFisc } = useSelector((state) => state.catalogo);

    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select mode="multiple" disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {respFisc && respFisc.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const Perfiles = ({ disabled, xs = 24, sm = 8, md = 8, lg = 8, inModal = false, required = false }) => {
    const { perfiles } = useSelector((state) => state.empresa);

    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="Perfil:" name="IdPerfil" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA"
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                {perfiles && perfiles.map((e) => <Select.Option key={e.idPerfil} value={e.idPerfil}>{e.descripcionPerfil.toUpperCase()}</Select.Option>)}
            </Select>
        </Form.Item>
    </Col>);
};

export const CheckAndPrice = ({ label, name, initial = false, disabled = false, form }) => {
    const [isRequired, setIsRequired] = useState(initial);

    useEffect(() => {
        setIsRequired(initial);
    }, [initial])


    return (<Col xs={24} style={{ textAlign: "center" }}>
        <Form.Item className="parentCheckAndPrice">
            <Form.Item className="checkAndPrice" label={`${label && label[0] ? label[0].toUpperCase() : ""}:`} name={name && name[0]} valuePropName="checked">
                <Checkbox disabled={disabled} onChange={(e) => {
                    setIsRequired(e.target.checked);
                    if (!e.target.checked && form) form.setFieldsValue({ [name[1]]: null });
                }} />
            </Form.Item>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} className="nextCheckAndPrice" />
            <Form.Item className="checkAndPrice" label={`${label && label[1] ? label[1].toUpperCase() : ""}:`} name={name && name[1]} rules={[{ required: isRequired }]}>
                <InputNumber disabled={disabled || !isRequired} min={0} style={{ width: 200 }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
            </Form.Item>
        </Form.Item>
    </Col>);
};

export const Price = ({ label, name, sm = 6, md = 6, lg = 6, initialValue, required = false, disabled = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg} >
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <InputNumber disabled={disabled} min={0} style={{ width: "100%" }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
        </Form.Item>
    </Col >);
};

export const TipoCargo = ({ label, name, initialValue = null, sm = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    return (<Col xs={24} sm={sm} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                <Select.Option key="1" value={1}>ANUAL</Select.Option>
                <Select.Option key="2" value={2}>MENSUAL</Select.Option>
                <Select.Option key="3" value={3}>POR DOCUMENTO</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const Formatos = ({ tipoInicial, disabled = false, form, plantilla = {} }) => {
    const [tipo, setTipo] = useState(tipoInicial);

    useEffect(() => {
        setTipo(tipoInicial);
    }, [tipoInicial])

    return (<>
        <Row gutter={16}>
            <Col xs={24} style={{ textAlign: "center" }}>
                <Form.Item name="tipoFactura" initialValue={tipo} className="m-0">
                    <Radio.Group disabled={disabled} onChange={(e) => setTipo(e.target.value)}>
                        <Radio key={"FX"} value={"FX"}>Formato Estándar Facturaxion</Radio>
                        <Radio key={"FA"} value={"FA"}>Formato Alianza</Radio>
                        <Radio key={"FP"} value={"FP"}>Formato Personalizado</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
        {tipo === "FX" && <>
            <Row gutter={16} style={{ textAlign: "center" }}>
                <Col xs={24}>
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} className="downstep" />
                </Col>
            </Row>
            <Row gutter={16} style={{ justifyContent: "center" }}>
                <Form.Item name="tipoPlantilla" className="tipoPlantilla m-0" rules={[{ required: true }]}>
                    <Radio.Group disabled={disabled}>
                        <Row gutter={16} style={{ textAlign: "center" }}>
                            <Col xs={24} sm={8}>
                                <Card title={<><FontAwesomeIcon icon={['fas', 'download']} onClick={() => getDocument("Fax_Generico1.pdf")} /><p>FACTURAXION 1</p></>} extra={<Radio key={1} value={1} />} />
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card title={<><FontAwesomeIcon icon={['fas', 'download']} onClick={() => getDocument("Fax_Generico2.pdf")} /><p>FACTURAXION 2</p></>} extra={<Radio key={2} value={2} />} />
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card title={<><FontAwesomeIcon icon={['fas', 'download']} onClick={() => getDocument("Fax_Generico3.pdf")} /><p>FACTURAXION 3</p></>} extra={<Radio key={3} value={3} />} />
                            </Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
            </Row>
        </>}
        {tipo === "FP" && <>
            <Row gutter={16} style={{ textAlign: "center" }}>
                <Col xs={24}>
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} className="downstep" />
                </Col>
            </Row>
            <Row gutter={16} style={{ justifyContent: "center" }} className="filesBox">
                <FileUpload disabled={disabled} descripcion={plantilla.plantillaFactura} name="FormatoFactura" label="Factura" sm={8} md={8} lg={8} limite={3} required={!plantilla.plantillaFactura} accept={["rpt"]} form={form} />
                <FileUpload disabled={disabled} descripcion={plantilla.plantillaCredito} name="FormatoNC" label="Nota de crédito" sm={8} md={8} lg={8} limite={3} required={!plantilla.plantillaCredito} accept={["rpt"]} form={form} />
                <FileUpload disabled={disabled} descripcion={plantilla.plantillaDebito} name="FormatoD" label="Nota de débito" sm={8} md={8} lg={8} limite={3} required={!plantilla.plantillaDebito} accept={["rpt"]} form={form} />
            </Row>
        </>}
        <Row gutter={16} style={{ textAlign: "center" }}>
            <Col xs={24}>
                <FontAwesomeIcon icon={['fas', 'chevron-down']} className="downstep" />
            </Col>
        </Row>
    </>);
};

export const Servicios = ({ initialValue = [], sm = 12, lg = 12, required = false, disabled = false, onChange = null, inModal = false }) => {
    const { servicios } = useSelector((state) => state.empresa), dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListaServicios());
    }, []);

    return (<>
        <Col xs={24} md={sm} lg={lg}>
            <Form.Item label="SERVICIOS:" name="idServicios" initialValue={initialValue} rules={[{ required }]}>
                <Select mode="multiple" disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SERVICIOS" onChange={onChange ? onChange : null}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {servicios && servicios.map((serv) =>
                        <Select.Option key={serv.idServicio} value={serv.idServicio}>{serv.nombreServicio.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const SeguridadMail = ({ initialValue = null, sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false }) => {
    const { listaSeguridad } = useSelector((state) => state.catalogo), dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeguridadCorreo());
    }, []);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="SEGURIDAD:" name="seguridadcorreo" initialValue={initialValue} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SEGURIDAD"
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {listaSeguridad && listaSeguridad.map((serv) =>
                        <Select.Option key={serv.idseguridadcorreo} value={serv.clave}>{serv.clave.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const UnidadMedida = ({ initialValue = null, sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false }) => {
    const { unidadMedida } = useSelector((state) => state.catalogo), dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUnidadesMedida());
    }, []);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="UNIDAD MEDIDA:" name="IdUnidadMedida" initialValue={initialValue} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={!required ? "TODOS" : "SELECCIONA"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                    {unidadMedida && unidadMedida.map((serv) =>
                        <Select.Option key={serv.Id} value={serv.Id}>{serv.Nombre.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const ButtonSubmit = ({ round = false, form }) => {
    return (<>
        <Col xs={24} md={2} className={round ? "btnRoundSubmit" : "btnBlockSubmit"}>
            {round && <Button shape="circle" icon={<FontAwesomeIcon icon={['fas', 'plus']} />} type="primary" onClick={() => form.submit()} />}
        </Col>
    </>);
};

export const TipoNomina = ({ initialValue = null, sm = 6, md = 6, lg = 6, required = false, disabled = false, onChange = null, inModal = false }) => {
    return (<Col xs={24} md={md} sm={sm} lg={lg}>
        <Form.Item label="TIPO DE NÓMINA:" name="IdTipoNomina" initialValue={initialValue} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder="SELECCIONA" onChange={onChange ? onChange : null}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null}>
                <Select.Option key="N" value="N">INDIVIDUAL</Select.Option>
                <Select.Option key="A" value="A">ELIMINACION</Select.Option>
                <Select.Option key="E" value="E">NOMINA AJUSTE</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoPrecioInformado = ({ initialValue = null, sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null, placeholder = "", allowClear = false }) => {
    const { codPrecio } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="TIPO PRECIO INFORMADO:" name="codTipoPrecioInf" initialValue={initialValue} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={placeholder} allowClear={allowClear}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {codPrecio && codPrecio.map((serv) =>
                        <Select.Option key={serv.CatAlfValor.trim()} value={serv.CatAlfValor.trim()}>{serv.CatAlfOpcion.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const ClaveProducto = ({ sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    const { codProducto } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="CLAVE PRODUCTO:" name="claveproducto" rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {codProducto && codProducto.map((serv) =>
                        <Select.Option key={serv.CatAlfValor.trim()} value={serv.CatAlfValor.trim()}>{serv.CatAlfOpcion.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const Valida = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="VALIDA:" name="valida" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}>
                <Select.Option key="1" value="1">VALIDAS</Select.Option>
                <Select.Option key="0" value="0">INVALIDAS</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const Calificador = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="CALIFICADOR:" name="calificador" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}>
                <Select.Option key="0" value="SE">Emisor</Select.Option>
                <Select.Option key="1" value="CO">Consorcio</Select.Option>
                <Select.Option key="2" value="BY">Receptor</Select.Option>
                <Select.Option key="3" value="SU">Proveedor</Select.Option>
                <Select.Option key="4" value="ST">Dirección de entrega</Select.Option>
                <Select.Option key="5" value="SF">Dirección de origen</Select.Option>
                <Select.Option key="6" value="OE">Propietario</Select.Option>
                <Select.Option key="7" value="FX">Destinatario</Select.Option>
                <Select.Option key="8" value="TR">Transportista</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoFactura = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="TIPO:" name="tipoFac" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"}
                allowClear={!required} onChange={onChange}>
                <Select.Option key="F" value="F">FACTURA</Select.Option>
                <Select.Option key="C" value="C">NOTA CRÉDITO</Select.Option>
                <Select.Option key="D" value="D">NOTA DÉBITO</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const EstatusCaptura = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="ESTATUS:" name="estatus" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}>
                <Select.Option key="E" value="E">ENVIADOS</Select.Option>
                <Select.Option key="G" value="G">GUARDADOS</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const FacturaCuenta = ({ sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null, adq = false, entrega = false }) => {
    const { direccionesAdquiriente, direccionesEntrega } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label="CUENTA:" name={adq ? "cuentaAdquiriente" : "cuentaEntrega"} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {adq && direccionesAdquiriente && direccionesAdquiriente.map((e) =>
                        <Select.Option key={e.id} value={e.id}>{e.idCuenta.toUpperCase()} / {e.nit.toUpperCase()}</Select.Option>
                    )}
                    {entrega && direccionesEntrega && direccionesEntrega.map((e) =>
                        <Select.Option key={e.id} value={e.id}>{e.idCuenta.toUpperCase()} / {e.nit.toUpperCase()}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const SeriesFactura = ({ label = "SERIE", name = "serie", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    const { series } = useSelector((state) => state.factura);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {series && series.map((e) => <Select.Option key={e.Prefijo} value={e.Prefijo === "" ? "-1" : e.Prefijo}>{e.Prefijo === "" ? "SIN PREFIJO" : e.Prefijo}</Select.Option>)}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const MetodoPago = ({ disabled = false, sm = 6, md = 6, lg = 6, required = false, inModal = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label="MÉTODO DE PAGO:" name="metodoPago" rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                <Select.Option key="1" value="1">CONTADO</Select.Option>
                <Select.Option key="2" value="2">CRÉDITO</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const FormasPago = ({ label = "FORMA DE PAGO", name = "formaPago", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    const { formasPago } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {formasPago && formasPago.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const TipoTexto = ({ label = "TIPO DE TEXTO", name = "tipoTexto", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                <Select.Option key="NUBL" value="NUBL">NUBL</Select.Option>
                <Select.Option key="AAA" value="2">AAA</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const CodCorrelacion = ({ label = "CÓDIGO CORRELACIÓN", name = "codCorrelacion", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null, tipoFactura }) => {
    const { concCorrNC, concCorrND } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {tipoFactura === "C" && concCorrNC && concCorrNC.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
                    {tipoFactura === "D" && concCorrND && concCorrND.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim().toUpperCase()}</Select.Option>)}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const TipoDeFacturas = ({ label = "TIPO DE FACTURA", name = "tipoFactura", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null, tipoFactura }) => {
    const { tipoFact } = useSelector((state) => state.catalogo), Fact = { tipoFact: [1, 2, 3, 4] }, Deb = { tipoFact: [92] }, Cred = { tipoFact: [91] };

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {tipoFact && tipoFact.map((element) => {
                        let el = Number(element.CatAlfValor.trim());
                        if (tipoFactura === "F" && Fact.tipoFact.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        else if (tipoFactura === "C" && Cred.tipoFact.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        else if (tipoFactura === "D" && Deb.tipoFact.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        return null;
                    })}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const TipoOperacion = ({ label = "TIPO DE OPERACIÓN", name = "tipoOperacion", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null, tipoFactura }) => {
    const { tipoOperacion } = useSelector((state) => state.catalogo), Fact = { tipoOp: [9, 10, 11, 12, 13] }, Deb = { tipoOp: [30, 32] }, Cred = { tipoOp: [20, 22] };

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {tipoOperacion && tipoOperacion.map((element, index) => {
                        let el = Number(element.CatAlfValor.trim());
                        if (tipoFactura === "F" && Fact.tipoOp.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        else if (tipoFactura === "C" && Cred.tipoOp.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        else if (tipoFactura === "D" && Deb.tipoOp.includes(el))
                            return <Select.Option key={element.CatAlfValor.trim()} value={element.CatAlfValor.trim()}>{element.CatAlfOpcion.trim()}</Select.Option>
                        return null;
                    })}
                </Select>
            </Form.Item>
        </Col>
    </>);
};

export const ReferenciaGeneral = ({ label = "TIPO", name = "referenciaGeneral", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    const { refGral } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {refGral && refGral.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim()}</Select.Option>)}
                </Select>
            </Form.Item>
        </Col>
    </>);
};















export const CarDes = ({ label = "CALIFICADOR", name = "calificador", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                <Select.Option key="C" value="C">CARGO</Select.Option>
                <Select.Option key="D" value="D">DESCUENTO</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};

export const TipoCarDes = ({ label = "TIPO", name = "tipoCarDes", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    const { tipoCarDes } = useSelector((state) => state.catalogo);

    return (<>
        <Col xs={24} sm={sm} md={md} lg={lg}>
            <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
                <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELEECIONA" : "TODOS"} allowClear={!required}
                    getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                    {tipoCarDes && tipoCarDes.map((e) => <Select.Option key={e.CatAlfValor.trim()} value={e.CatAlfValor.trim()}>{e.CatAlfOpcion.trim()}</Select.Option>)}
                </Select>
            </Form.Item>
        </Col>
    </>);
};
export const ImpuestosTrasladados = ({ label = "IMPUESTO", name = "impuestoT", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                <Select.Option key="01" value="01">IVA</Select.Option>
                <Select.Option key="02" value="02">IC</Select.Option>
                <Select.Option key="03" value="03">ICA</Select.Option>
                <Select.Option key="04" value="04">INC</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};
export const ImpuestosRetenidos = ({ label = "IMPUESTO", name = "impuestoR", sm = 12, md = 12, lg = 12, required = false, disabled = false, inModal = false, onChange = null }) => {
    return (<Col xs={24} sm={sm} md={md} lg={lg}>
        <Form.Item label={`${label ? label.toUpperCase() : ""}:`} name={name} rules={[{ required }]}>
            <Select disabled={disabled} showSearch optionFilterProp="children" style={{ width: "100%" }} placeholder={required ? "SELECCIONA" : "TODOS"} allowClear={!required}
                getPopupContainer={inModal ? (triggerNode) => triggerNode.parentElement : null} onChange={onChange}>
                <Select.Option key="05" value="05">RETEIVA</Select.Option>
                <Select.Option key="06" value="06">RETEFUENTE</Select.Option>
                <Select.Option key="07" value="07">RETEICA</Select.Option>
            </Select>
        </Form.Item>
    </Col>);
};
