import { serverCall } from '../_utility';

export const UploadFile = (data, callback = null,errorCallback)  => {
    serverCall({
        type: "POST",
        url: `Common/UploadFile`,
        body: data,
        success: (data) => {
            if (callback) callback(data);
        },
        fail: () => {
            if (errorCallback) errorCallback();
        },
    });
};
