import MyLog from "../utils/MyLog";

/**
 * 双向列表 
 * 比单向列表多了一个指向前一个节点
 */
export default class DulLink {

    private _headItem:IDulListHead//头结点(如果有下标，可以看做-1)
    private _endItem:IDulListItem;//最后节点，用来快速添加(尾插法)

    constructor()
    {
        this.init();
    }

    init()
    {
        this._headItem = {
            data: null,
            len: 0,
            nextNode:null,
            preNode:null,
        }
        this._endItem = this._headItem;
    }

    addData(data:any)
    {
        //判断data是否已经存在于list中
        if (this.checkData(data)) {
            MyLog.log('LinkList-addData', 'addData Failed!数据已经存在')
            return 
        }
        let newItem:IDulListItem = {
            data:data,
            nextNode:null,
            preNode:null,
        }
        this._endItem.nextNode = newItem;
        this._headItem.len++;
        newItem.nextNode = null;//非循环列表，不指向头结点
        newItem.preNode = this._endItem;//指向前一个节点
        this._endItem = newItem;
    }

    removeData(data:any)
    {
        let checkItme:IDulListItem = this._headItem.nextNode;
        let preItem:IDulListItem;
        let nextItem:IDulListItem;
        while (checkItme) {
            if (checkItme.data == data) {
                preItem = checkItme.preNode;
                preItem.nextNode = checkItme.nextNode;
                nextItem = checkItme.nextNode;
                if (nextItem) {
                    nextItem.preNode = preItem;
                } else {
                    this._endItem = preItem;//设置最后节点
                }
                this._headItem.len--;
                checkItme.data = null;
                checkItme.nextNode = null;
                checkItme.preNode = null;
                break;
            }
            checkItme = checkItme.nextNode;
        }
    }

    /**插入数据 */
    insertItem(data:any, index:number)
    {
        if (this.checkData(data)) {
            MyLog.log('DulList-insertItem', 'insertItem Failed!数据已经存在')
            return 
        }
        if (index < 0 || index > this._headItem.len) {
            MyLog.log('DulList-insertItem', 'insertItem Failed!index超出范围')
            return 
        }
        let newItem:IDulListItem = {
            data:data,
            preNode:null,
            nextNode:null,
        }
        let num = 0;
        let item:IDulListItem = this._headItem.nextNode;
        while (num < index && item) {
            num++;
            item = item.nextNode;
        }
        let preItem:IDulListItem = item.preNode;
        let nextItem:IDulListItem = item.nextNode;
        preItem.nextNode = newItem;
        newItem.preNode = preItem;
        if (nextItem) {
            nextItem.preNode = newItem;
        }
        newItem.nextNode = item;
    }

    /**保留头节点，清除其他节点 */
    clearList()
    {
        //从头结点开始，依次删除各个节点的指向
        let headItem = this._headItem;
        let item = headItem.nextNode;
        while (item) {
            headItem.nextNode = item.nextNode//头结点指向下下节点
            item.nextNode = null;//删除下个节点与下下节点的指向
            item.preNode = null;//删除与上一个节点的指向
            item.data = null;
            item = headItem.nextNode;//下一轮
        }
        headItem.len = 0;
        headItem.nextNode = null;
        headItem.preNode = null;
        this._endItem = this._headItem;
    }

    checkData(data:any):boolean
    {
        let flag:boolean = false;
        let item:IDulListItem = this._headItem;
        while (item.data != data) {
            item = item.nextNode;
            if (!item) break;
        }
        if (item && item.data == data) flag = true;
        return flag;
    }

    console(tag:string | number  = '')
    {
        MyLog.log('DulList-console', `tag:${tag}`)
        let item = this._headItem.nextNode;
        while (item) {
            MyLog.log('DulList-console', item.data)
            item = item.nextNode;
        }
    }

    public get headItem(){return this._headItem}

}


interface IDulListItem {
    data:any,
    nextNode?:IDulListItem,
    preNode?:IDulListItem
}

//头结点额外存储一个长度信息
interface IDulListHead extends IDulListItem {
    len:number
}