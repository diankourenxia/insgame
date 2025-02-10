import Battle from "../Battle";
import Tools from "../Util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Self extends cc.Component {
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

    currNum: number = 0

    point: number = 0

    get currHp(): number {
        return this._currHp
    }

    set currHp(num: number) {
        this._currHp = num

        this.hpLabel.string = this.currHp + "/" + this.allHp
        this.hpSprite.fillRange = this.currHp / this.allHp

        if (num <= 0) {
            let index = Battle.Ins.selfNodeList.indexOf(this.node)
            Battle.Ins.selfNodeList.splice(index, 1)
            if (Battle.Ins.selfNodeList.length <= 0) {
                Battle.Ins.loseNode.active = true
                Battle.Ins.isOver = true
            }
            this.node.destroy()
        }
    }

    hpList: number[] = [500, 400, 600]

    setData(num, point) {
        this.allHp = this.hpList[num]
        this.currHp = this.allHp
        this.point = point
        this.currNum = num
    }

    onLoad() {
        this.animaNode = this.node.getChildByName("body").getComponent(cc.Animation)
        this.animaNode.playAdditive("idle")
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
        let url = "prefab/game/enemyEffect/" + num
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            let node = cc.instantiate(prefab)
            node.parent = this.node

            let url = "prefab/game/num/selfNum"
            cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
                let attackNum = Tools.getRandom(30, 50) + (5 * this.point)
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
