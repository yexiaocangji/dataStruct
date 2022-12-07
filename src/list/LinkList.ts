import MyLog from "../utils/MyLog";
/**
 * 单向列表
 */
export default class LinkList {

    private _headItem:ILinkListHead//头结点(如果有下标，可以看做-1)
    private _endItem:ILinkListItem;//最后节点，用来快速添加(尾插法)

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
        let newItem:ILinkListItem = {
            data:data,
            nextNode:null,
        }
        this._endItem.nextNode = newItem;
        this._endItem = newItem;
        this._headItem.len++;
        newItem.nextNode = null;//非循环列表，不指向头结点
    }

    checkData(data:any):boolean
    {
        let flag:boolean = false;
        let item:ILinkListItem = this._headItem;
        while (item.data != data) {
            item = item.nextNode;
            if (!item) break;
        }
        if (item && item.data == data) flag = true;
        return flag;
    }

    removeData(data:any)
    {
        let checkItme:ILinkListItem = this._headItem.nextNode;
        let preItem:ILinkListItem = this._headItem;
        while (checkItme) {
            if (checkItme.data == data) {
                preItem.nextNode = checkItme.nextNode;
                checkItme.nextNode = null;
                checkItme.data = null;
                this._headItem.len--;
                if (preItem && preItem.nextNode == null) {
                    this._endItem = preItem;//设置最后节点
                }
                break;
            }
            preItem = checkItme;
            checkItme = checkItme.nextNode;
        }
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
            item.data = null;
            item = headItem.nextNode;//下一轮
        }
        headItem.len = 0;
        headItem.nextNode = null;
        this._endItem = this._headItem;
    }

    /**通过下标查找 */
    getItemByIndex(index:Number)
    {
        if (index >= this._headItem.len) {
            MyLog.log('LinkList-getItemByIndex',`index:${index} 超出list长度`)
            return null;
        }
        let num:number = 0;
        let item:ILinkListItem = this._headItem.nextNode;
        while (num < index && item) {
            num++;
            item = item.nextNode;
        }
        return item || null;
    }

    /**插入数据 */
    insertItem(data:any, index:number)
    {
        if (this.checkData(data)) {
            MyLog.log('LinkList-insertItem', 'insertItem Failed!数据已经存在')
            return 
        }
        if (index < 0 || index > this._headItem.len) {
            MyLog.log('LinkList-insertItem', 'insertItem Failed!index超出范围')
            return 
        }
        let newItem:ILinkListItem = {
            data:data,
            nextNode:null,
        }
        let num = 0;
        let preItem:ILinkListItem = this._headItem;
        let item:ILinkListItem = this._headItem.nextNode;
        while (num < index && item) {
            num++;
            preItem = item;
            item = item.nextNode;
        }
        preItem.nextNode = newItem;
        newItem.nextNode = item;
    }

    /**替换数据 */
    replaceItem(oldData:any, newData:any)
    {
        let item:ILinkListItem = this._headItem.nextNode;
        while(item) { 
            if (item.data == oldData) {
                item.data = newData;
                break;
            }
            item = item.nextNode;
        }
    }

    console(tag:string | number  = '')
    {
        MyLog.log('LinkList-console', `tag:${tag}`)
        let item = this._headItem.nextNode;
        while (item) {
            MyLog.log('LinkList-console', item.data)
            item = item.nextNode;
        }
    }

    public get headItem(){return this._headItem}

}

interface ILinkListItem {
    data:any,
    nextNode?:ILinkListItem,
}

//头结点额外存储一个长度信息
interface ILinkListHead extends ILinkListItem {
    len:number
}