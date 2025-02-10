import CardItem from "./Card/CardItem";
import Home from "./Home";
import Navigete from "./Navigete";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Atlas extends cc.Component {
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null

    onEnable() {
        this.refreshView()
    }

    refreshView() {
        this.scrollView.content.removeAllChildren()
        let topNum = 9

        let i = 0
        // cc.tween.stopAllByTarget(this.scrollView.node)
        this.scrollView.node.stopAllActions()
        let cb = cc.tween(this.scrollView.node)
            .delay(0.08)
            .call(() => {
                if (!this.node) return
                let node = cc.instantiate(this.itemPrefab)
                node.parent = this.scrollView.content
                node.getComponent(CardItem).setData(i)

                node.opacity = 0
                cc.tween(node).to(0.1, { opacity: 255 }).start()

                i++
            })

        let tw = cc.tween(this.scrollView.node)
            .repeat(topNum, cb)
            .start()
    }

    public onBtn_close() {
        this.node.active = false
        Home.Ins.currView = null
        Navigete.Ins.initUI()
    }
}
