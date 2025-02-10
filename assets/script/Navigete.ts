import Home from "./Home";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Navigete extends cc.Component {

    public static Ins: Navigete = null

    protected onLoad(): void {
        Navigete.Ins = this
        this.initUI()
    }   

    initUI() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = false
        })
    }

    onBtn_role() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = node.name == "ROLE"
        })
        Home.Ins.onBtn_role()
    }

    onBtn_level() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = node.name == "ADVENTURE"
        })
        Home.Ins.onBtn_level()
    }

    onBtn_equip() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = node.name == "FORGE"
        })
        Home.Ins.onBtn_equip()
    }

    onBtn_chaillenge() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = node.name == "CHALLENGE"
        })
        Home.Ins.onBtn_challenge()
    }

    onBtn_atlas() {
        this.node.children.forEach((node, index) => {
            node.getChildByName("1").active = node.name == "ATLAS"
        })
        Home.Ins.onBtn_ATLAS()
    }

    onBtn_cz() {
       
        Home.Ins.onBtn_cz()
    }
}
