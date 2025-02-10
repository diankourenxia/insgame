import HintPublic from "./Util/Hint/HintPublic";

const { ccclass, property } = cc._decorator;

/**
  程序 杨植贵
  美术 齐婧煊
  商务 齐宝婷
 */
@ccclass
export default class Game extends cc.Component {
    @property(cc.Node)
    loadingNode: cc.Node = null

    @property(cc.Node)
    HomeNode: cc.Node = null

    public static Ins: Game = null

    onLoad() {
        Game.Ins = this
    }

    onEnable() {
        this.loadingNode.active = true
        this.HomeNode.active = false
    }

    public show_publicHint(str: string) {
        let url = "prefab/hint/publicHint"
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            if (err) {
                console.log("加载提示错误", err)
                return
            }
            let node = cc.instantiate(prefab)
            this.node.addChild(node)
            node.y = 500
            let hint = node.getComponent(HintPublic)
            hint.initUI(str)
        })
    }
}
