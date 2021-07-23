import CookieTool from "./cookieTool";
import axios from "axios";
import { CookieEnum, EnvironmentEnum } from "../enum";
import { AppTool } from "./appTool";
import { UrlConfig } from "../config/urlConfig";

const defaultToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNMUtocHl1OGg1cjlxVkNfN29hbDJaUERseU9CRjJMazkwdlVBS2hTNko0In0.eyJqdGkiOiI5ZGVhZjkxNi1kOTNkLTRjYmUtOTJjMS0wMWM5MTY2MDJmOTUiLCJleHAiOjE2MjMzNDA3NTIsIm5iZiI6MCwiaWF0IjoxNjIyNDc3MDE1LCJpc3MiOiJodHRwczovL2FjY291bnRzLnZpbWFwLnZuL2F1dGgvcmVhbG1zL3ZpbWFwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImVkODlkYjM5LWFmNDctNDY3MS1iMTA5LWM5NWRjNWNhZDY2ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1hcDRkIiwiYXV0aF90aW1lIjoxNjIyNDc2NzUyLCJzZXNzaW9uX3N0YXRlIjoiNzYxOWYzMjMtNzk5MS00ZTQzLThjYTYtMGY0YzA5ODcxNTQ5IiwiYWNyIjoiMCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJQaMawxqFuZyBOaHVuZyBOZ3V54buFbiIsInByZWZlcnJlZF91c2VybmFtZSI6Im5odW5nbnRwIiwibG9jYWxlIjoidmkiLCJnaXZlbl9uYW1lIjoiUGjGsMahbmcgTmh1bmciLCJmYW1pbHlfbmFtZSI6Ik5ndXnhu4VuIiwiZW1haWwiOiJuZ3V5ZW5waHVvbmduaHVuZzI3MDVAZ21haWwuY29tIn0.m9HJRtJRPYVRvtLDiXorhdcKXfDBuWcjgxhLtYHprfCIvhU-kxXFu74LCsYlNt6VyJQXVDDEcVATl6keGjdFeTouCPnpHq4ZDN_QM2sCEpWRgY0RP0Wb1lnS9q2QhQKYk-FKeNpygxzw7i38fV84tzd8cJdjhFyBgmSfPp5gwSJsgaNiRQInHVPHD_Ccg2rpOAJY-VTXHaOdR9yDJAtC_j0mVZBmip4HOHPMkZDEziikjCm3GiJTtAKst69T3fcq0Un-w7wTy3sGP06RcgiKo80dJytS6qSLBqz6Ey5VSoGpRIFLiL5DXAmlnvCx7opPS6EzW1KoetZpx-Tfmr8WRQ";
export default class UserTool {
    static getToken = (callback) => {
        if (AppTool.getEnvironment() == EnvironmentEnum.local) {
            callback(defaultToken);
            return;
        }
        let source = axios.CancelToken.source();
        let token = CookieTool.get(CookieEnum.token);
        if (token) {
            callback(token);
        } else {
            let returnUrl = encodeURI(location.href);
            location.href = UrlConfig.login + "?returnUrl=" + returnUrl;
            callback(null);
        }
        return source;
    };

    static getUser = () => {
        let user = null;
        try {
            user = JSON.parse(CookieTool.get(CookieEnum.user));
        } catch (error) { }
        return user;
    };
    static isOneOfRoles = (roleCodes) => {
        return roleCodes.includes(UserTool.getUser()?.role?.code || "");
    };
}
