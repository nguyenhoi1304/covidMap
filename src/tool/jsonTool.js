export class JsonTool {
    static convertJsonToQueryString = (data) => {
        let arr = []
        Object.keys(data || {})?.forEach((key) => {
            if (data[key] != null && data[key] != undefined && data[key] != "null" && data[key] != "undefined") {
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            }
        })
        return arr.join('&');
    }
    static convertJsonToFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key =>{ 
            if(Array.isArray(object[key])){
                if(object[key].length>0){
                    object[key].forEach((item)=>{
                        formData.append(key, item)
                    })
                }
            }
            else{
                formData.append(key, object[key])
            }
            
        });
        return formData;
    }
}