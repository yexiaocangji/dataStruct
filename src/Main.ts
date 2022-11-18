import MyLinearList from "./list/MyList";

export default class Main {

    constructor()
    {
        this.init();
    }

    init()
    {
        this.doLinearList();
    }

    doLinearList()
    {
        let list = new MyLinearList();
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
}

new Main();