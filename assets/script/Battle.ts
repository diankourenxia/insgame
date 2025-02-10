import MapManager from "./Battle/manager/MapManager";
import TileManager from "./Battle/manager/TileManager";
import CachesMgr from "./Common/CachesMgr";
import ClientEvent from "./event/ClientEvent";
import EventType from "./event/EventType";
import Enemy from "./Game/Enemy";
import Self from "./Game/Self";
import Home from "./Home";
import level from "./Level";
import Tools from "./Util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Battle extends cc.Component {

    @property(cc.Label)
    timeLabel: cc.Label = null

    @property(cc.Node)
    bgNode: cc.Node = null

    @property(cc.Node)
    enemyNode: cc.Node = null

    @property(cc.Node)
    selfNode: cc.Node = null

    @property(cc.Node)
    winNode: cc.Node = null

    @property(cc.Node)
    loseNode: cc.Node = null

    enemyNodeList: cc.Node[] = []
    selfNodeList: cc.Node[] = []

    @property(cc.AudioClip)
    battleAudio: cc.AudioClip = null

    @property(cc.AudioClip)
    attackAudio: cc.AudioClip = null

    public static Ins: Battle = null

    private countTime: number = 0

    private point: number = 0

    private currEnemy: number = 0
    private currSelf: number = 0

    isOver: boolean = false

    setData(num: number) {
        this.point = num

        this.currEnemy = 0
        this.currSelf = 0
    }

    onLoad() {
        this.winNode.active = false
        this.loseNode.active = false
        Battle.Ins = this
        this.countTime = 0

        cc.audioEngine.pauseAll()
        cc.audioEngine.play(this.battleAudio, true, 1)

        ClientEvent.instance().on(EventType.DELETE_ACTOR, (data: { type, index }) => {

        }, this);

        ClientEvent.instance().on("paif_nenglian", (type) => {
            let currSelf = this.selfNodeList[this.currSelf]
            if (currSelf == null) {
                currSelf = this.selfNodeList[0]
            }
            let currEnemy = this.enemyNodeList[0]
            if (!currEnemy) return
            let worldPosition = currEnemy.parent.convertToWorldSpaceAR(currEnemy.position)
            let nodePosition = currSelf.parent.convertToNodeSpaceAR(worldPosition)
            nodePosition.x -= 120
            if (currSelf.name != "") {
                cc.tween(currSelf)
                    .to(0.2, { position: nodePosition })
                    .call(() => {
                        cc.audioEngine.playEffect(this.attackAudio, false)
                        currSelf.getComponent(Self).battleAnima()
                        this.scheduleOnce(() => {
                            if (currSelf.name != "") {

                                cc.tween(currSelf)
                                    .to(0.2, { position: cc.v2(0, 0) })
                                    .call(() => {
                                        this.currSelf = this.currSelf + 1 > this.selfNodeList.length - 1 ? 0 : this.currSelf + 1
                                    })
                                    .start()
                                if (currSelf.name != "") {
                                    currSelf.getComponent(Self).idleAnima()
                                }
                                if (currEnemy.name != "" && currSelf.name != "") {
                                    currEnemy.getComponent(Enemy).hurt(currSelf.getComponent(Self).currNum)

                                }
                            }
                        }, 0.5)
                    })
                    .start()
            }

        }, this);
    }

    protected start(): void {
        MapManager.init();
        TileManager.init();
        this.initScene();

        this.handler_enemyAttack()
    }

    protected update(dt: number): void {
        this.addTime(dt)
    }

    addTime(dt) {
        this.countTime += dt
        let time = this.formatTimeExDay(Math.floor(this.countTime))
        this.timeLabel.string = time[1] + ":" + time[2] + ":" + time[3]
    }

    public formatTimeExDay(stamp: number): string[] {
        if (stamp <= 0) return ["0", "00", "00", "00"];

        let hour = Math.floor(stamp / 3600);
        let seconds = stamp % 3600;

        let minute = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);

        //天
        let day_str = Math.floor(hour / 24) + "";

        //小时
        let l_hour = hour % 24;
        let hour_str = "";
        if (l_hour < 10) hour_str += "0";
        hour_str += l_hour;

        //分
        let min_str = "";
        if (minute < 10) min_str += "0";
        min_str += minute;

        //秒
        let sec_str = "";
        if (seconds < 10) sec_str += "0";
        sec_str += seconds;

        let timeArray: string[] = [];
        timeArray.push(day_str);
        timeArray.push(hour_str);
        timeArray.push(min_str);
        timeArray.push(sec_str);

        return timeArray;
    }

    private initScene() {

        this.bgNode.children.forEach((node, index) => {
            node.active = index == this.point % 2
        })

        let numList: number[] = [1, 2, 3, 4, 5]
        numList.sort((a, b) => {
            return Math.random() - 0.5
        })
        for (let i = 0; i < 3; i++) {
            let url = "prefab/game/enemy/" + numList[i]
            cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
                if (err) {
                    console.log("加载敌人失败", err)
                    return
                }
                let node = cc.instantiate(prefab)
                this.enemyNode.children[i].addChild(node)
                node.getChildByName("body").scaleX = -1
                this.enemyNodeList.push(node)
                node.getComponent(Enemy).setData(this.point, numList[i])
            })
        }
        this.selfNode.children.forEach((node, index) => {
            node.children[0].getComponent(Self).setData(index, this.point)
            this.selfNodeList.push(node.children[0])
        })
    }

    handler_exit() {
        this.node.active = false
        level.Ins.initUI();
    }

    protected onDisable(): void {
        setTimeout(() => {
            this.node.destroy()
        }, 10000)
    }

    handler_enemyAttack() {
        this.schedule(this.enemyAttack, 5)
    }

    enemyAttack() {
        if (this.isOver) return
        let enemyNode = this.enemyNodeList[this.currEnemy]
        if (enemyNode == null) {
            enemyNode = this.enemyNodeList[0]
        }
        let selfNode = this.selfNodeList[0]
        if (!selfNode) return
        let worldPosition = selfNode.parent.convertToWorldSpaceAR(selfNode.position)
        let nodePosition = enemyNode.parent.convertToNodeSpaceAR(worldPosition)
        nodePosition.x += 120
        if (enemyNode.name != null) {
            cc.tween(enemyNode)
                .to(0.2, { position: nodePosition })
                .call(() => {
                    enemyNode.getComponent(Enemy).battleAnima()
                    cc.audioEngine.playEffect(this.attackAudio, false)
                    this.scheduleOnce(() => {
                        if (enemyNode.name != "") {
                            cc.tween(enemyNode)
                                .to(0.2, { position: cc.v2(0, 0) })
                                .call(() => {
                                    this.currEnemy = this.currEnemy + 1 > this.enemyNodeList.length - 1 ? 0 : this.currEnemy + 1
                                })
                                .start()
                            if (enemyNode.name != "") {
                                enemyNode.getComponent(Enemy).idleAnima()
                            }
                            if (selfNode.name != "" && enemyNode.name != "") {
                                selfNode.getComponent(Self).hurt(enemyNode.getComponent(Enemy).currentIndex)
                            }
                        }
                    }, 1)
                })
                .start()
        }

    }

    handler_win() {
        CachesMgr.gold += Tools.getRandom(150, 200)
        CachesMgr.dima += Tools.getRandom(100, 200)
        this.node.stopAllActions()

        CachesMgr.pitChip[0] += 2
        CachesMgr.pitChip[1] += 2
        CachesMgr.pitChip[2] += 2
        CachesMgr.pitChip = CachesMgr.pitChip

        let star = 0

        if (this.countTime > 300) {
            star = 0
        } else if (this.countTime <= 300 && this.countTime > 240) {
            star = 1
        } else if (this.countTime <= 240 && this.countTime > 180) {
            star = 2
        } else if (this.countTime <= 180) {
            star = 3
        }
        console.log(star)
        CachesMgr.level = this.point + 1 <= CachesMgr.level ? CachesMgr.level : this.point + 1
        let currStar = CachesMgr.levelStar[this.point]
        console.log(currStar)
        if (currStar < star) CachesMgr.levelStar[this.point] = star
        CachesMgr.levelStar = CachesMgr.levelStar
        this.winNode.getChildByName("startList").children.forEach((chiNd, idx) => {
            chiNd.children[0].active = star >= idx + 1
        })
    }

    protected onDestroy(): void {
        this.node.stopAllActions()
        cc.audioEngine.pauseAll()
        cc.audioEngine.play(Home.Ins.bgAudio, true, 1)
    }
}
