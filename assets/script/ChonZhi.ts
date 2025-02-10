import CachesMgr from "./Common/CachesMgr";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChonZhi extends cc.Component {

    private isCreate: boolean = true

    public static Ins: ChonZhi = null

    rechargeId = ["com.gedou.apple.lb.099", "com.gedou.apple.lb.199", "com.gedou.apple.lb.299", "com.gedou.apple.lb.399"]

    @property(cc.Node)
    listNode: cc.Node = null

    onLoad() {
        ChonZhi.Ins = this
    }

    onEnable() {
        //充值回调
        window['gedouwzTopUphuiDiao'] = (type) => {
            Game.Ins.show_publicHint("充值成功")
            switch (type) {
                case this.rechargeId[0]:
                    CachesMgr.dima += 60
                    break
                case this.rechargeId[1]:
                    CachesMgr.dima += 120
                    break
                case this.rechargeId[2]:
                    CachesMgr.dima += 180
                    break
                case this.rechargeId[3]:
                    CachesMgr.dima += 240
                    break
                default:
                    CachesMgr.dima += 60
                    break
            }
        }
    }

    onBtn_challenge(event, data) {
        data = Number(data)
        console.log(data)
        let lw = this.rechargeId[0];
        switch (data) {
            case 1:
                lw = this.rechargeId[0];
                break;
            case 6:
                lw = this.rechargeId[1];
                break;
            case 12:
                lw = this.rechargeId[2];
                break;
            case 30:
                lw = this.rechargeId[3];
                break;
            default:
                break;
        }
        //充值调用
        window['webkit'].messageHandlers.gedouwzTopUpDiaoYon.postMessage(lw)
    }

    public onBtn_close() {
        this.node.active = false
    }
}
