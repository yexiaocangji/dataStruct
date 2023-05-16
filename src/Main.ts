import DulLink from "./list/DulLink";
import LinearList from "./list/LinearList";
import LinkList from "./list/LinkList";
import Queue from "./list/Queue";
import Stack from "./list/Stack";
import MyLog from "./utils/MyLog";

export default class Main {

    constructor()
    {
        this.init();
    }

    init()
    {
        // this.doLinearList();
        // this.doLinkList();
        // this.doDulLink();
        this.doStack();
    }

    /**顺序表 */
    doLinearList()
    {
        let list = new LinearList();
        let items = list.items;
        let item1 = `apple`;
        let item2 = `banner`;
        list.addItem(item1);
        list.addItem(item2, true);
        let item3 = 'grape';
        let item4 = 'groupfruit';
        let item5 = 'pear';
        list.insertItem(item3, 0);
        list.insertItem(item4, 1);
        list.insertItem(item5, 2);
        list.deleteItemByID(2);
        list.deleteItem(item1);
        let newItem = 'watermelon';
        list.changeItem(item1, newItem)
        list.setItem(4,item1);
        list.changeItem(item1, newItem)
        list.clear();
    }

    /**单链表 */
    doLinkList()
    {
        let list = new LinkList();
        let item1 = {value:'1'}
        let item2 = {value:'2'}
        let item3 = {value:'3'}
        let item4 = {value:'4'}
        list.addData(item1);
        list.addData(item3);
        list.addData(item2);
        list.console(1);
        list.removeData(item2)
        list.console(2);
        list.addData(item4)
        list.console(3);
        let newItem = {value:'5'}
        list.insertItem(newItem, 3)
        list.console('insert');
        let replaceItem = {value:'6'}
        list.replaceItem(item1, replaceItem)
        list.console('replace');
        MyLog.log('main',`下标是2的item的值`, list.getItemByIndex(2))
        MyLog.log('main',list.headItem)
    }

    /**双向链表 */
    doDulLink()
    {
        let list = new DulLink();
        let item1 = {value:'1'};
        let item2 = {value:'2'};
        let item3 = {value:'3'};
        let item4 = {value:'4'};
        list.addData(item1);
        list.addData(item2);
        list.addData(item3);
        list.console(1)
        list.removeData(item2);
        list.console(2)
        list.insertItem(item4, 1);
        list.console(3)
        list.clearList()
        MyLog.log('Main', list.headItem)
    }

    /**队列 */
    doQueue()
    {
        let queue = new Queue<string>()
    }

    /**栈 */
    doStack()
    {
        let stack = new Stack<string>()
        let item1 = 'a';
        let item2 = 'b';
        let item3 = 'c';
        let item4 = 'd';
        stack.insert(item1)
        stack.insert(item2, item3);
        stack.console();
        stack.getOut();
        stack.insert(item4)
        stack.console();
    }
}

new Main();