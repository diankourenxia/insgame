import HintBase from "./HintBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HintPublic extends HintBase {
    public initUI(...arg) {
        this.str.string = arg[0]
        this.runAnima()
    }
}
