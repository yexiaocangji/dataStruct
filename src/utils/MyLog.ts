export enum ELogLEvel {
    log = 1,
    warn,
    error
}

/**
 * 主要加了一个tag标识，用于快速定位
 */
export default class MyLog {

    static curLevel = 0

    /**
     * 
     * @param tag 标识符，可以是调用者的类名
     * @param args 
     */
    static log(tag:string, ...args)
    {
        if (this.curLevel <= ELogLEvel.log) {
            console.log(`[${tag}] `, ...args)
        }
    }

    static warn(tag:string, ...args)
    {
        if (this.curLevel <= ELogLEvel.warn) {
            console.warn(`[${tag}] `, ...args)
        }
        
    }

    static error(tag:string, ...args)
    {
        if (this.curLevel <= ELogLEvel.error) {
            console.error(`[${tag}] `, ...args)
        }
        
    }

    static trance(tag:string, ...args)
    {

    }

}
window['MyLog'] = MyLog