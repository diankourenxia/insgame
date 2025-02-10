import CardItem from "./Card/CardItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Card extends cc.Component {
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null

    @property(cc.Prefab)
    infoPrefab: cc.Prefab = null

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null

    public static Ins: Card = null

    onLoad() {
        Card.Ins = this
    }

    onEnable() {

        this.refreshView()
    }

    refreshView() {
        this.scrollView.content.removeAllChildren()
        let topNum = 6

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
 
}
