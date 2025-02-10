const { ccclass, property } = cc._decorator;


@ccclass('SettingsController')
export class SettingsController extends cc.Component {
    // 设置按钮节点
    @property(cc.Button)
    private settingsButton: cc.Button | null = null;
    @property(cc.Button)
    private yesButton: cc.Button | null = null;
    @property(cc.Button)
    private noButton: cc.Button | null = null;
    // 设置按钮节点
    @property(cc.Sprite)
    private closeButton: cc.Sprite | null = null;

    // 设置弹窗节点
    @property(cc.Node)
    private settingsPopup: cc.Node | null = null;
    
    // 声音开关按钮节点
    @property(cc.ToggleContainer)
    private soundToggleButton: cc.ToggleContainer | null = null;
    // 音频源组件
    @property(cc.AudioClip)
    private audioSource: cc.AudioClip | null = null;

    start() {
        // 为设置按钮添加点击事件监听器
        if (this.settingsButton) {
            this.settingsButton.node.on(cc.Node.EventType.MOUSE_DOWN, this.openSettingsPopup, this);
        }
        // 为设置按钮添加点击事件监听器
        if (this.closeButton) {
            this.closeButton.node.on(cc.Node.EventType.MOUSE_DOWN, this.closeSettingsPopup, this);
        }
        if (this.yesButton) {
            this.yesButton.node.on(cc.Node.EventType.MOUSE_DOWN, this.openVoice, this);
        }
        if (this.noButton) {
            this.noButton.node.on(cc.Node.EventType.MOUSE_DOWN, this.closeVoice, this);
        }
        // 为声音开关按钮添加点击事件监听器
        if (this.soundToggleButton) {
            console.log(3)
            this.soundToggleButton.node.on('toggle', this.onToggleChange, this);
        }
    }
    closeVoice(){
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);
    }
    openVoice(){
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    }
    onToggleChange () {
        console.log(88)
        console.log(this.soundToggleButton.isValid)
        // 根据 Toggle 的状态来设置音量
        if (this.soundToggleButton.isValid) {
            // 如果开启，则设置音量为 1（最大音量）
            cc.audioEngine.setMusicVolume(1);
            cc.audioEngine.setEffectsVolume(1);
        } else {
            // 如果关闭，则设置音量为 0（静音）
            cc.audioEngine.setMusicVolume(0);
            cc.audioEngine.setEffectsVolume(0);
        }
    }
    // 打开设置弹窗
    openSettingsPopup() {
        console.log(9)
        console.log(this.settingsPopup)
        console.log(this.settingsPopup.active)
        this.settingsPopup.active = false;
        this.settingsPopup.active = true;  
    }

    // 关闭设置弹窗
    closeSettingsPopup() {
        if (this.settingsPopup) {
            this.settingsPopup.active = false;
        }
    }

    // 切换声音开关
    toggleSound() {
        if (this.audioSource) {
            this.audioSource.off('fire')
    }
}
}