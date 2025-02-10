import Game from "../Game";
import mask from "../mask";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardItem extends cc.Component {
    @property(cc.Sprite)
    pitSprite: cc.Sprite = null

    public currId: number = 0

    setData(id: number) {
        this.currId = id
        this.initUI()
    }

    initUI() {
        let url = "texture/card/atlas"
        cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
            if (err) {
                console.log("加载图集错误", err)
                return
            }
            var frame = atlas.getSpriteFrames();
            this.pitSprite.spriteFrame = frame[this.currId]
        })
    }

    onBtn_info() {
        if (this.currId > 2) {
            Game.Ins.show_publicHint("英雄未解锁了!")
            return
        }
        let url = "prefab/atlas/mask"
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            let node = cc.instantiate(prefab)
            node.getComponent(mask).setData(this.currId)
            let parent = cc.find("Canvas")
            parent.addChild(node)
        })
    }
}
