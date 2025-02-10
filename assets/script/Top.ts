// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CachesMgr from "./Common/CachesMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Top extends cc.Component {

    public static Ins: Top = null

    @property(cc.Label)
    goldLabel: cc.Label = null

    @property(cc.Label)
    diamondLabel: cc.Label = null

    // @property(cc.Label)
    // fightLabel: cc.Label = null

    private goldNum: number = 0
    private diamondNum: number = 0
    private fightNum: number = 0

    protected onLoad() {
        Top.Ins = this

        this.goldNum = CachesMgr.gold
        this.diamondNum = CachesMgr.dima
    }

    protected onEnable() {
        this.initUI()
    }

    public initUI() {
        this.goldNum = CachesMgr.gold
        this.diamondNum = CachesMgr.dima
        this.goldLabel.string = this.goldNum.toString()
        this.diamondLabel.string = this.diamondNum.toString()
    }

    protected update(dt: number) {
        let gold = CachesMgr.gold
        let diamond = CachesMgr.dima
        if (gold != this.goldNum || diamond != this.diamondNum) {
            this.initUI()
        }
        // this.fightLabel.string = (1000 + (25 * CachesMgr.pitLevel[0]) + (25 * CachesMgr.pitLevel[1]) + (25 * CachesMgr.pitLevel[2])) + ""
    }
}
