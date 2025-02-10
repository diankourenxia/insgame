const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {
    @property(cc.Node)
    cityView: cc.Node = null

    @property(cc.Node)
    roleView: cc.Node = null

    @property(cc.Node)
    levelView: cc.Node = null

    @property(cc.Node)
    ATLASView: cc.Node = null

    @property(cc.Node)
    equipView: cc.Node = null

    @property(cc.Node)
    challengeView: cc.Node = null

    @property(cc.Node)
    chongzhiView: cc.Node = null

    @property(cc.AudioClip)
    bgAudio: cc.AudioClip = null

    public static Ins: Home = null

    public currView: cc.Node = null

    // @property(cc.AudioClip)
    // bgAudio: cc.AudioClip = null

    onLoad() {
        Home.Ins = this

        cc.audioEngine.pauseAll()
        cc.audioEngine.play(this.bgAudio, true, 1)
    }

    
    protected onEnable(): void {
        this.cityView.active = true

        this.roleView.active = false
        this.levelView.active = false
        this.ATLASView.active = false
        this.equipView.active = false
        this.challengeView.active = false

        // cc.audioEngine.pauseAll()
        // cc.audioEngine.play(this.bgAudio, true, 1)
    }

    onBtn_level() {
        if (this.currView == this.levelView) return
        this.levelView.active = true
        this.roleView.active = false
        this.ATLASView.active = false
        this.equipView.active = false
        this.challengeView.active = false
        this.currView = this.levelView
    }

    onBtn_role() {
        if (this.currView == this.roleView) return
        this.levelView.active = false
        this.roleView.active = true
        this.ATLASView.active = false
        this.equipView.active = false
        this.challengeView.active = false
        this.currView = this.roleView
    }

    onBtn_ATLAS() {
        if (this.currView == this.ATLASView) return
        this.levelView.active = false
        this.roleView.active = false
        this.ATLASView.active = true
        this.equipView.active = false
        this.challengeView.active = false
        this.currView = this.ATLASView
    }

    onBtn_equip() {
        if (this.currView == this.equipView) return
        this.levelView.active = false
        this.roleView.active = false
        this.ATLASView.active = false
        this.equipView.active = true
        this.challengeView.active = false
        this.currView = this.equipView
    }

    onBtn_challenge() {
        if (this.currView == this.challengeView) return
        this.levelView.active = false
        this.roleView.active = false
        this.ATLASView.active = false
        this.equipView.active = false
        this.challengeView.active = true
        this.currView = this.challengeView
    }

    onBtn_cz() {
        this.chongzhiView.active = true;
    }
}
