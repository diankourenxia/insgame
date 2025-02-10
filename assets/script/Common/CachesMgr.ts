
class CachesMgr {
    constructor() {
        let string = Object.keys(this)
        for (let i = 0; i < string.length; i++) {
            if (string[i][0] != "_") {
                continue
            }
            this.getData(string[i])
        }
    }

    private _level: number = 0
    private _levelStar: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    private _havePit: number[] = [0, 1, 2]
    private _pitLevel: number[] = [1, 1, 1]
    private _pitChip: number[] = [0, 0, 0]
    private _equipLevel: number[] = [1, 1, 1, 1, 1]
    private _gold: number = 20000
    private _dima: number = 20000
    private _challenge: number = 0

    get challenge(): number {
        return this._challenge;
    }

    set challenge(value: number) {
        this._challenge = value;
        this.saveData("_challenge", value)
    }

    get levelStar(): number[] {
        return this._levelStar;
    }

    set levelStar(value: number[]) {
        this._levelStar = value;
        this.saveData("_levelStar", value)
    }

    get equipLevel(): number[] {
        return this._equipLevel;
    }

    set equipLevel(value: number[]) {
        this._equipLevel = value;
        this.saveData("_equipLevel", value)
    }

    get gold(): number {
        return this._gold;
    }

    set gold(value: number) {
        this._gold = value;
        this.saveData("_gold", value)
    }

    get dima(): number {
        return this._dima;
    }

    set dima(value: number) {
        this._dima = value;
        this.saveData("_dima", value)
    }


    get pitChip(): number[] {
        return this._pitChip;
    }

    set pitChip(value: number[]) {
        this._pitChip = value;
        this.saveData("_pitChip", value)
    }


    get pitLevel(): number[] {
        return this._pitLevel;
    }

    set pitLevel(value: number[]) {
        this._pitLevel = value;
        this.saveData("_pitLevel", value)
    }

    get havePit(): number[] {
        return this._havePit;
    }

    set havePit(value: number[]) {
        this._havePit = value;
        this.saveData("_havePit", value)
    }


    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
        this.saveData("_level", value)
    }

    private saveData(key: string, value: any, isSend: boolean = true) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    private getData(key: string): boolean {
        let keyTemp = key
        let result = true
        let dataText = localStorage.getItem(keyTemp)
        if (dataText == null || dataText == "" || dataText == undefined) {
            result = false
            this.saveData(key, this[key], false) //没有的话，先给他存进去
            return
        }
        this[key] = JSON.parse(dataText)
        return result
    }
}

export default new CachesMgr()
