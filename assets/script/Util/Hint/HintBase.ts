const {ccclass, property} = cc._decorator;

@ccclass
export default class HintBase extends cc.Component {
    @property(cc.Label)
    str: cc.Label = null;

    protected runAnima() {
        this.node.scale = 0.8
        cc.tween(this.node)
            .to(0.3, {scale: 1}, {easing: "backOut"})
            .delay(1.5)
            .by(1, {opacity: -255})
            .call(() => {
                this.node.destroy()
            })
            .start()
    }

}
