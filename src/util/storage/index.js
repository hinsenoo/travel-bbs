/* 
 *  Storage 封装
 *  (localStorage)
 */
/*  格式：
    Key: mall  
    Value: { 
            "user": 
                { 
                    "username": "jack", "age": 30
                } 
            } 
*/
let Base64 = require('js-base64').Base64;
const STORAGE_KEY = 'travelBBS';
export default {
    // 存储值
    setItem(key,value,module_name){
        value = Base64.encode(value);
        if(module_name){
            let val = this.getItem(module_name);
            val[key] = value;
            // 递归
            this.setItem(module_name,val);
        }else{
            let val = this.getStorage();
            val[key] = value;
            window.localStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
    },
    // 获取某一个模块下面的属性 
    // 例： user 下面的 userName
    getItem(key,module_name){
        if (module_name){
            let val = this.getItem(module_name);
            if(val){
                return Base64.decode(val[key]);
            }
        }
        return this.getStorage()[key] ?  Base64.decode(this.getStorage()[key]) : '';
    },
    // 获取整个 Storage 数据
    getStorage(){
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    },
    // 清空某一个值
    clear(key,module_name){
        let val = this.getStorage();
        if(module_name){
            if(!val[module_name]) return;
            delete val[module_name][key];
        }else {
            delete val[key];
        }
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(val));
    }
}