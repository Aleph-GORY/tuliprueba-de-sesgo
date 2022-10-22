import React from 'react';
import axios from 'axios';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const serverCall = async ({ type, url, params = null, body = null, success = null, fail = null, showAlertError = true, responseType = "json", config = {} }) => {
    if (params !== null) url = url + "?" + encodeParams(params);
    type = type.toUpperCase();
    await axios({
        method: type,
        url: `api/${url}`,
        data: body,
        responseType,
        config,
    }).then((response) => {
        if (success && response) success(response.data, response);
    }).catch((error) => {
        if (fail) fail(error.response);
        if (error.status !== 500) Alert(`Error ${error.response && error.response.status ? error.response.status : error.toString()}`, "error");
        else if (showAlertError) Alert(error.error, "error");
    });
};

export const encodeParams = (params) => {
    return Object.entries(params).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
};

export const Alert = (msg, type, time = null) => {
    let message, ico = "";
    if (type === "info") {
        message = "INFORMACIÓN";
        ico = "info";
    }
    else if (type === "success") {
        message = "ÉXITO";
        ico = "check";
    }
    else if (type === "warning") {
        message = "ALERTA";
        ico = "exclamation-triangle";
    }
    else if (type === "error") {
        message = "ERROR";
        ico = "times";
    }
    notification.open({
        message,
        description: msg,
        duration: (time ? null : 10),
        className: "no-select notifZ " + type,
        placement: "bottomTop",
        icon: <FontAwesomeIcon icon={['fas', ico]} />,
    });
};

export const Loader = ({ loading, children }) => {
    return (<Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 65 }} spin />}>
        {children}
    </Spin>);
};
