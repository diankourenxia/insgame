const { ccclass, property } = cc._decorator;

@ccclass
export default class mask extends cc.Component {

    private currIndex: number = 0

    setData(id) {
        this.currIndex = id + 1
        this.initUI()
    }

    initUI() {
        let url = "prefab/atlas/" + this.currIndex
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            let node = cc.instantiate(prefab)
            node.parent = this.node
        })
    }

    onBtn_close() {
        this.node.destroy()
    }

}
