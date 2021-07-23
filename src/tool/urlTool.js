export const queryToJson = (search) => {
    let pairs = search?.substring(1).split("&");
    let jsonData = {};

    pairs?.forEach((p) => {
        let pair = p.split("=");
        if (pair?.length === 2) {
            jsonData[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    });
    return jsonData;
};

export const jsonToQuery = (obj) => {
    let queries = [];
    Object.keys(obj)?.forEach((item) => {
        if (obj[item] != null && obj[item] != undefined && obj[item] != "null" && obj[item] != "undefined") {
            if (item.toLowerCase() != "camera") {
                queries.push(encodeURIComponent(item) + "=" + encodeURIComponent(obj[item]));
            } else {
                queries.push(item + "=" + obj[item]);
            }
        }
    });
    return "?" + queries?.join("&") || "";
};
