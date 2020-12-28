import {BehaviorSubject} from 'rxjs'; 

const Settings = new BehaviorSubject({
    text: "init value"
}); 

export default Settings;