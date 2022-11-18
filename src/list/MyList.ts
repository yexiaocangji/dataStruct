import MyLog from "../utils/MyLog";

/**
 * 线性表
 */
export default class MyLinearList {

    private _itmes:string[];//模拟顺序存储线性表

    constructor()
    {
        this._itmes = [];
    }

    addItem(item:string, head?:boolean)
    {
        head ? this._itmes.unshift(item) : this._itmes.push(item);
    }

    insertItem(item:string, index:number)
    {
        if (index >= this._itmes.length) {
            MyLog.warn('MyLinearList', `index:${index} 超过list长度:${this._itmes.length} 插入失败`)
            return
        }
        this._itmes.splice(index, 0, item)
    }

    deleteItem(item:string)
    {
        this._itmes.splice(this._itmes.indexOf(item), 1);
    }

    deleteItemByID(index:number) 
    {
        this._itmes.splice(index, 1)
    }

    setItem(index:number, newItem:string)
    {
        if (index >= this._itmes.length) {
            MyLog.warn('MyLinearList', `index:${index} 超过list长度:${this._itmes.length} 添加失败`)
            return
        }
        this._itmes[index] = newItem;
    }

    changeItem(oldItem:string, newItem:string)
    {
        let index = this._itmes.indexOf(oldItem);
        if (index > -1) this._itmes[index] = newItem;
        else MyLog.log('MyLinearList','oldItem不存在')
    }

    clear()
    {
        this._itmes.length = 0;
    }

    getLength()
    {
        return this._itmes.length;
    }

    public get items(){return this._itmes}
}
