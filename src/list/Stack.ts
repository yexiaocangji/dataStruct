import MyLog from "../utils/MyLog";

/**
 * 栈--先进后出，后进先出
 * 特点：一般只操作一端，下面操作的是数组头部
 * 属于线性表
 */
export default class Stack<T> {
    
    private _stack:T[];

    constructor()
    {
        this._stack = [];
    }

    public insert(...items:T[])
    {
        this._stack.unshift(...items);
    }

    public getOut():T
    {
        let stack = this._stack;
        if (stack.length) {
            return stack.shift();
        } else {
            return null;
        }
    }

    public console()
    {
        let stack = this._stack;
        for (let i in stack) {
            MyLog.log('Stack', `i:${i}` , stack[i])
        }
    }

    public get stack(){return this._stack};

}