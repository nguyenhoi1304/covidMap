import LocalizedStrings from 'react-localization';
import { EnvironmentEnum } from '../enum';
import { Dev } from './appConfig/dev';
import { Local } from './appConfig/local';
import { ThaiBinh } from './appConfig/thaibinh';
import { QuangNam } from './appConfig/quangNam';

let env = EnvironmentEnum.prod
if (/4001/.test(location.origin.toLocaleLowerCase()) || /localhost/.test(location.origin.toLocaleLowerCase())) {
    env = EnvironmentEnum.local
}
if (/dev/.test(location.origin.toLocaleLowerCase())) {
    env = EnvironmentEnum.dev
}
if (/thaibinh/.test(location.origin.toLocaleLowerCase())) {
    env = EnvironmentEnum.thaiBinh
}
if (/quangNam/.test(location.origin.toLocaleLowerCase())) {
    env = EnvironmentEnum.QuangNam
}
const AppConfig2 = new LocalizedStrings({
    [EnvironmentEnum.local]: Local,
    [EnvironmentEnum.dev]: Dev,
    [EnvironmentEnum.thaiBinh]: ThaiBinh,
    [EnvironmentEnum.QuangNam]: QuangNam,
});
AppConfig2.setLanguage(env)
export const AppConfig = AppConfig2