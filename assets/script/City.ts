// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Home from "./Home";

const { ccclass, property } = cc._decorator;

@ccclass
export default class city extends cc.Component {

    onBtn_role() {
        Home.Ins.onBtn_role()
    }

    onBtn_level() {
        Home.Ins.onBtn_level()
    }

    onBtn_equip() {
        Home.Ins.onBtn_equip()
    }

    onBtn_chaillenge() {
        Home.Ins.onBtn_challenge()
    }

    onBtn_atlas() {
        Home.Ins.onBtn_ATLAS()
    }

}
