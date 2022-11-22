import MyLog from "../utils/MyLog";

export default class LinkList {

    private _headItem:ILinkListHead//头结点
    private _endItem:ILinkListItem;//“最后节点

    constructor()
    {
        this.init();
    }

    init()
    {
        this._headItem = {
            value: null,
            len: 0,
            nextNode:null,
        }
        this._endItem = this._headItem;
    }

    addItem(item:ILinkListItem)
    {
        this._endItem.nextNode = item;
        this._endItem = item;
        this._headItem.len++;
        item.nextNode = null;
    }

    removeItem(item:ILinkListItem)
    {
        let checkItme:ILinkListItem = this._headItem;
        while (checkItme) {
            if (checkItme.nextNode == item) {
                checkItme.nextNode = item.nextNode;
                item.nextNode = null;
                this._headItem.len--;
                break;
            }
            if (checkItme.nextNode == null) {
                this._endItem = checkItme;//只有最后节点没有指向
            }
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
            item = headItem.nextNode;//下一轮
        }
        headItem.len = 0;
        headItem.nextNode = null;
        this._endItem = this._headItem;
    }

    console()
    {
        let item = this._headItem.nextNode;
        while (item) {
            MyLog.log('LinkList', item.value)
            item = item.nextNode;
        }
    }

    public get headItem(){return this._headItem}

}

interface ILinkListItem {
    value:string,
    nextNode?:ILinkListItem,
}

//头结点额外存储一个长度信息
interface ILinkListHead extends ILinkListItem {
    len:number
}