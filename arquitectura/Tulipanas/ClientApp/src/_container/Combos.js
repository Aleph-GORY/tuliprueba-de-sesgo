import React, { useState } from 'react';
import { Button, Col, Upload } from 'antd';
import { Alert } from '../_utility';
import { UploadOutlined } from '@ant-design/icons';

export const FileUpload = ({ limite, accept = [], setFile = null, loading }) => {
    const [fileList, setFileList] = useState([]);

    return (<Col xs={24} className="fileForm">
        <Upload multiple={false} beforeUpload={() => false} fileList={fileList} accept={accept.map((e) => "." + e).join(",")}
            onChange={(data) => {
                const splited = data.file.name && data.file.name.split("."), ext = splited && splited[1];
                if (data.fileList.length === 0) {
                    setFileList([]);
                    if (setFile) setFile(null);
                }
                else if ((data.file.size / 1024 / 1024) > limite) Alert(`El archivo debe ser menor a los ${limite}MB`, "error");
                else if (!accept.includes(ext)) Alert("Formato no valido", "error");
                else if (data.fileList.length > 0) {
                    const files = [data.fileList.pop()];
                    if (setFile) setFile(files[0].originFileObj);
                    setFileList(files);
                }
            }}>
            <Button type="primary" icon={<UploadOutlined />} size="large" className="mainButton" loading={loading}>
                SUBIR TXT | SUBIR MP3
            </Button>
        </Upload>
    </Col>);
};
