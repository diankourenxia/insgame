import Battle from "./Battle";
import CachesMgr from "./Common/CachesMgr";
import Game from "./Game";
import Home from "./Home";
import Navigete from "./Navigete";

const { ccclass, property } = cc._decorator;

@ccclass
export default class level extends cc.Component {
    @property(cc.Node)
    levelItem: cc.Node = null

    private isCreate: boolean = true

    public static Ins: level = null

    onLoad() {
        level.Ins = this
    }

    onEnable() {
        this.initUI()
    }

    public initUI() {
        this.levelItem.children.forEach((node, index) => {
            let checkPoint = CachesMgr.level
            let starNode = node.getChildByName("start")
            let lockNode = node.getChildByName("lock")
            if (index > checkPoint) {
                lockNode.active = true
                starNode.active = false
            } else {
                starNode.active = true
                lockNode.active = false
                let starNum = CachesMgr.levelStar[index]
                starNode.children.forEach((chiNd, idx) => {
                    chiNd.children[0].active = starNum >= idx + 1
                })
            }
        })
    }

    onBtn_play(event, data) {
        data = Number(data)
        if (!this.isCreate) return;
        let checkPoint = CachesMgr.level
        if (data > checkPoint) {
            Game.Ins.show_publicHint("当前关卡未解锁 !")
            return
        }
        this.isCreate = false
        cc.loader.loadRes("prefab/game/Game", cc.Prefab, (err, prefab) => {
            if (err) {
                console.warn("loading game error", err)
                return
            }
            let node = cc.instantiate(prefab)
            let parent = cc.find("Canvas")
            node.getComponent(Battle).setData(data)
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
