import MyLog from "../utils/MyLog";

/**
 * 队列--先进先出
 * 属于线性表
 */
export default class Queue<T> {

    private _queue:T[]

    constructor()
    {
        this._queue = [];
    }

    public insert(...items: T[])
    {
        this._queue.push(...items);
    }

    public getOut():T
    {
        let queue = this._queue;
        if (queue.length) {
            return queue.shift();
        } else {
            return null
        }
    }

    public console()
    {
        let queue = this._queue;
        for (let i in queue) {
            MyLog.log('Queue', `i:${i}` , queue[i])
        }
    }

    public get queue(){return this._queue}

}