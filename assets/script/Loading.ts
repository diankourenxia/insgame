import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class loadingNode extends cc.Component {
    onBtn_play() {
        Game.Ins.loadingNode.active = false
        Game.Ins.HomeNode.active = true
    }
}
