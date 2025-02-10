import CachesMgr from "./Common/CachesMgr";
import Config from "./Config";
import Game from "./Game";
import Home from "./Home";
import Navigete from "./Navigete";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Equip extends cc.Component {
    @property(cc.Node)
    equipNode: cc.Node = null

    @property(cc.Node)
    choiceNode: cc.Node = null

    @property(cc.Label)
    attackLabel: cc.Label = null

    @property(cc.Label)
    hpLabel: cc.Label = null

    @property(cc.Label)
    defLabel: cc.Label = null

    @property(cc.Label)
    speLabel: cc.Label = null

    @property(cc.Label)
    goldLabel: cc.Label = null

    private currentId: number = 0

    onLoad() {
        this.initUI()
    }

    public initUI() {
        this.equipNode.children.forEach((node, index) => {
            node.active = index == this.currentId
        })

        this.choiceNode.children.forEach((node, index) => {
            node.getChildByName("level").getChildByName("num").getComponent(cc.Label).string = "Lv." + CachesMgr.equipLevel[index]
        })

        this.hpLabel.string = (20 * CachesMgr.equipLevel[this.currentId]) + Config.equipPorp[this.currentId][0] + ""
        this.attackLabel.string = (20 * CachesMgr.equipLevel[this.currentId]) + Config.equipPorp[this.currentId][1] + ""
        this.defLabel.string = (20 * CachesMgr.equipLevel[this.currentId]) + Config.equipPorp[this.currentId][2] + ""
        this.speLabel.string = (20 * CachesMgr.equipLevel[this.currentId]) + Config.equipPorp[this.currentId][3] + ""
        this.goldLabel.string = Config.upGold[CachesMgr.equipLevel[this.currentId] - 1] + ""
    }

    onBtn_level() {
        let gold = Number(this.goldLabel.string)
        if (CachesMgr.gold < gold) {
            Game.Ins.show_publicHint("没有足够的金币升级")
            return
        }
        CachesMgr.gold -= gold
        Game.Ins.show_publicHint("升级成功")
        CachesMgr.equipLevel[this.currentId] += 1
        CachesMgr.equipLevel = CachesMgr.equipLevel
        this.initUI()
    }

    onBtn_choice(event, data) {
        this.currentId = Number(data)
        this.initUI()
    }


    public onBtn_close() {
        this.node.active = false
        Home.Ins.currView = null
        Navigete.Ins.initUI()
    }
}
