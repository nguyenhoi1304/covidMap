export const getStringResource = (key, replaceObj = {}) => {
    let result = key;
    if (replaceObj && Object.keys(replaceObj)) {
        Object.keys(replaceObj).forEach(function (key) {
            result = result.replace(`__${key}__`, replaceObj[key]);
        });
    }
    return result;
};

