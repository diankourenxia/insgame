import CachesMgr from "./Common/CachesMgr";
import Config from "./Config";
import Game from "./Game";
import Home from "./Home";
import Navigete from "./Navigete";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Role extends cc.Component {

    @property(cc.Node)
    bgNode: cc.Node = null

    @property(cc.Node)
    choiceNode: cc.Node = null

    @property(cc.Label)
    lab_name: cc.Label = null

    @property(cc.Label)
    lab_level: cc.Label = null

    @property(cc.Node)
    proNode: cc.Node = null

    @property(cc.Sprite)
    sprite_bar: cc.Sprite = null

    @property(cc.Node)
    levelUpNode: cc.Node = null

    @property(cc.Node)
    countNode: cc.Node = null

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
        this.bgNode.children.forEach((node, index) => {
            node.active = index == this.currentId
        })

        this.choiceNode.children.forEach((node, index) => {
            node.getChildByName("1").active = index == this.currentId
        })

        this.lab_name.string = Config.nameList[this.currentId]
        this.lab_level.string = "Lv." + CachesMgr.pitLevel[this.currentId]

        this.proNode.active = true
        this.countNode.active = true
        let currNum = CachesMgr.pitChip[this.currentId]
        let nextNum = Config.chip[CachesMgr.pitLevel[this.currentId] - 1]
        this.countNode.getComponent(cc.Label).string = currNum + "/" + nextNum
        this.sprite_bar.fillRange = currNum / nextNum
        this.hpLabel.string = (20 * CachesMgr.pitLevel[this.currentId]) + Config.rolePorp[this.currentId][0] + ""
        this.attackLabel.string = (20 * CachesMgr.pitLevel[this.currentId]) + Config.rolePorp[this.currentId][1] + ""
        this.defLabel.string = (20 * CachesMgr.pitLevel[this.currentId]) + Config.rolePorp[this.currentId][2] + ""
        this.speLabel.string = (20 * CachesMgr.pitLevel[this.currentId]) + Config.rolePorp[this.currentId][3] + ""
        this.goldLabel.string = Config.upGold[CachesMgr.pitLevel[this.currentId] - 1] + ""
    }

    onBtn_level() {
        let gold = Number(this.goldLabel.string)
        let currNum = CachesMgr.pitChip[this.currentId]
        let nextNum = Config.chip[CachesMgr.pitLevel[this.currentId] - 1]
        console.log(1111)
        
        if (CachesMgr.dima < gold) {
            Game.Ins.show_publicHint("没有足够的钻石来升级")
            return
        }
        CachesMgr.dima -= gold
        CachesMgr.pitChip[this.currentId] -= nextNum
        CachesMgr.pitChip = CachesMgr.pitChip
        Game.Ins.show_publicHint("升级成功")
        CachesMgr.pitLevel[this.currentId] += 1
        CachesMgr.pitLevel = CachesMgr.pitLevel
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
