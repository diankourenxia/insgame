import HintBase from "./HintBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HintFight extends HintBase {
    @property(cc.Label)
    fightNum: cc.Label = null

    @property(cc.Label)
    addNum: cc.Label = null

    public initUI(fight, num) {
        this.fightNum.string = fight + ""
        this.addNum.string =  "+ " + num
        this.runAnima()
    }

}
