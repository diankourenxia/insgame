import Battle from "../Battle";
import CachesMgr from "../Common/CachesMgr";
import Emit from "../Common/Emit/Emit";
import EmitData from "../Common/Emit/EmitData";
import Tools from "../Util/Tools";
import Self from "./Self";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
    @property(cc.Node)
    bodyNode: cc.Node = null

    @property(cc.Sprite)
    hpSprite: cc.Sprite = null

    @property(cc.Label)
    hpLabel: cc.Label = null

    playerNode: cc.Node = null


    private animaNode: cc.Animation = null

    private startAttack: boolean = false
    private battle: boolean = false
    private battleIng: boolean = false
    private currWorldPos: cc.Vec3 = null

    allHp: number = 0
    private _currHp: number = 0

    tipNode: cc.Node = null

    currNum: number = 0

    currentIndex: number = 0

    get currHp(): number {
        return this._currHp
    }

    set currHp(num: number) {
        this._currHp = num

        this.hpLabel.string = this.currHp + "/" + this.allHp
        this.hpSprite.fillRange = this.currHp / this.allHp

        if (num <= 0) {
            let index = Battle.Ins.enemyNodeList.indexOf(this.node)
            Battle.Ins.enemyNodeList.splice(index, 1)
            if (Battle.Ins.enemyNodeList.length <= 0) {
                Battle.Ins.winNode.active = true
                Battle.Ins.handler_win()
                Battle.Ins.isOver = true
            }
            this.node.destroy()
        }
    }

    setData(num, idx) {
        this.currNum = num
        this.currentIndex = idx
        this.allHp = (num * 30) + 300
        this.currHp = this.allHp

    }

    onLoad() {
        this.animaNode = this.node.getChildByName("body").getComponent(cc.Animation)
        this.animaNode.playAdditive("idle")
    }

    protected onDestroy(): void {
    }

    handler_skill() {

    }


    public playBattleAnima() {

    }

    idleAnima() {
        if (this.animaNode) {
            this.animaNode.stop()
            this.animaNode.playAdditive("idle")
        }
    }

    public battleAnima() {
        if (this.animaNode) {
            this.animaNode.stop()
            this.animaNode.playAdditive("skin")
        }
    }

    public playRunAnima() {

    }

    hurt(num) {
        let url = "prefab/game/selfEffect/" + (num + 1)
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            let node = cc.instantiate(prefab)
            node.parent = this.node

            let url = "prefab/game/num/enemyNum"
            cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
                let attackNum = Tools.getRandom(50, 80)
                let numNode = cc.instantiate(prefab)
                this.node.addChild(numNode)
                numNode.getComponent(cc.Label).string = attackNum + ""
                cc.tween(numNode)
                    .to(0.5, { y: 30 })
                    .call(() => {
                        numNode.destroy()
                    })
                    .start()
                this.currHp -= attackNum

            })
        })
    }
}
