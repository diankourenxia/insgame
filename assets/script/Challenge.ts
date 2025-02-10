import Battle2 from "./Battle2";
import CachesMgr from "./Common/CachesMgr";
import Game from "./Game";
import Home from "./Home";
import Navigete from "./Navigete";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Challenge extends cc.Component {

    private isCreate: boolean = true

    public static Ins: Challenge = null

    @property(cc.Node)
    listNode: cc.Node = null

    onLoad() {
        Challenge.Ins = this
    }

    onEnable() {
        this.initUI()
    }

    public initUI() {
        this.listNode.children.forEach((node, index) => {
            let checkPoint = CachesMgr.challenge
            node.children[0].active = index > checkPoint
        })
    }

    onBtn_challenge(event, data) {
        data = Number(data)
        console.log(data)
        if (!this.isCreate) return;
        let checkPoint = CachesMgr.challenge
        if (data > checkPoint) {
            Game.Ins.show_publicHint("当前关卡未解锁 !")
            return
        }
        this.isCreate = false
        cc.loader.loadRes("prefab/game/Game2", cc.Prefab, (err, prefab) => {
            if (err) {
                console.warn("loading game error", err)
                return
            }
            let node = cc.instantiate(prefab)
            let parent = cc.find("Canvas")
            node.getComponent(Battle2).setData(data)
            parent.addChild(node)
            this.scheduleOnce(() => {
                this.isCreate = true
            }, 0.5)
        })
    }

    public onBtn_close() {
        this.node.active = false
        Home.Ins.currView = null
        Navigete.Ins.initUI()
    }
}
