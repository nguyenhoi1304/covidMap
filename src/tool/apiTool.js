import { JsonTool } from "./jsonTool";
import axios from "axios";
import { CodeEnum } from "../enum";
import UserTool from "./userTool";
const cancelRes = {
    code: CodeEnum.cancel,
};
export class ApiTool {
    static get = (url, callback, isToken = false) => {
        let source = axios.CancelToken.source();
        let config = {
            cancelToken: source.token,
        };
        if (isToken) {
            UserTool.getToken((token) => {
                config.headers = { Authorization: `Bearer ${token}` };
                axios
                    .get(url, config)
                    .then(function (response) {
                        setTimeout(() => {
                            callback(response.data);
                        }, 0);
                    })
                    .catch(function (error) {
                        if (axios.isCancel(error)) {
                            callback(cancelRes);
                        } else {
                            callback(null);
                        }
                    });
            });
        } else {
            axios
                .get(url, config)
                .then(function (response) {
                    setTimeout(() => {
                        callback(response.data);
                    }, 0);
                })
                .catch(function (error) {
                    if (axios.isCancel(error)) {
                        callback(cancelRes);
                    } else {
                        callback(null);
                    }
                });
        }
        return source;
    };
    static queryGetFromJson = (url, body, callback, isToken = false) => {
        let source = axios.CancelToken.source();
        let query = JsonTool.convertJsonToQueryString(body);
        let config = {
            cancelToken: source.token,
        };
        if (isToken) {
            UserTool.getToken((token) => {
                config.headers = { Authorization: `Bearer ${token}` };
                axios
                    .get(url + "?" + query, config)
                    .then(function (response) {
                        setTimeout(() => {
                            callback(response.data);
                        }, 0);
                    })
                    .catch(function (error) {
                        if (axios.isCancel(error)) {
                            callback(cancelRes);
                        } else {
                            callback(null);
                        }
                    });
            });
        } else {
            axios
                .get(url + "?" + query, config)
                .then(function (response) {
                    setTimeout(() => {
                        callback(response.data);
                    }, 0);
                })
                .catch(function (error) {
                    if (axios.isCancel(error)) {
                        callback(cancelRes);
                    } else {
                        callback(null);
                    }
                });
        }
        return source;
    };

    static post = (url, body, callback, isToken = false) => {
        let source = axios.CancelToken.source();
        let config = {
            cancelToken: source.token,
        };
        if (isToken) {
            UserTool.getToken((token) => {
                config.headers = { Authorization: `Bearer ${token}` };
                axios
                    .post(url, body, config)
                    .then(function (response) {
                        setTimeout(() => {
                            callback(response.data);
                        }, 0);
                    })
                    .catch(function (error) {
                        if (axios.isCancel(error)) {
                            callback(cancelRes);
                        } else {
                            callback(null);
                        }
                    });
            });
        } else {
            axios
                .post(url, body, config)
                .then(function (response) {
                    setTimeout(() => {
                        callback(response.data);
                    }, 0);
                })
                .catch(function (error) {
                    if (axios.isCancel(error)) {
                        return;
                    } else {
                        callback(null);
                    }
                });
        }
        return source;
    };
    static delete = (url, callback, isToken = false) => {
        let source = axios.CancelToken.source();
        let config = {
            cancelToken: source.token,
        };
        if (isToken) {
            UserTool.getToken((token) => {
                config.headers = { Authorization: `Bearer ${token}` };
                axios
                    .delete(url, config)
                    .then(function (response) {
                        setTimeout(() => {
                            callback(response.data);
                        }, 0);
                    })
                    .catch(function (error) {
                        if (axios.isCancel(error)) {
                            callback(cancelRes);
                        } else {
                            callback(null);
                        }
                    });
            });
        } else {
            axios
                .delete(url, config)
                .then(function (response) {
                    setTimeout(() => {
                        callback(response.data);
                    }, 0);
                })
                .catch(function (error) {
                    if (axios.isCancel(error)) {
                        return;
                    } else {
                        callback(null);
                    }
                });
        }
        return source;
    };

    static postFormFromJson = (url, body, callback, isToken = false) => {
        let source = axios.CancelToken.source();
        let formData = JsonTool.convertJsonToFormData(body);
        let config = {
            headers: {
                "content-type": "multipart/form-data",
            },
            cancelToken: source.token,
        };
        if (isToken) {
            UserTool.getToken((token) => {
                config.headers.Authorization = `Bearer ${token}`;
                axios
                    .post(url, formData, config)
                    .then(function (response) {
                        setTimeout(() => {
                            callback(response.data);
                        }, 0);
                    })
                    .catch(function (error) {
                        if (axios.isCancel(error)) {
                            callback(cancelRes);
                        } else {
                            callback(null);
                        }
                    });
            });
        } else {
            axios
                .post(url, formData, config)
                .then(function (response) {
                    setTimeout(() => {
                        callback(response.data);
                    }, 0);
                })
                .catch(function (error) {
                    if (axios.isCancel(error)) {
                        callback(cancelRes);
                    } else {
                        callback(null);
                    }
                });
        }
        return source;
    };
    static postAsync = async (url, body, isToken = false) => {
        let source = axios.CancelToken.source();
        if (isToken) {
            let token = await UserTool.getTokenAsync();
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.post(url, body, config);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        } else {
            try {
                const response = await axios.post(url, body);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        }
    };
    static queryGetFromJsonAsync = async (url, body, isToken = false) => {
        let source = axios.CancelToken.source();
        let query = JsonTool.convertToQueryString(body);
        if (isToken) {
            let token = await UserTool.getTokenAsync();
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.get(url + "?" + query, config);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        } else {
            try {
                const response = await axios.get(url + "?" + query);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        }
    };
    static getAsync = async (url, isToken = false) => {
        if (isToken) {
            let token = await UserTool.getTokenAsync();
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.get(url, config);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        } else {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                //sẽ update chỗ này sau
                return null;
            }
        }
    };
}
