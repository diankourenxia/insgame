export default class Tools {

    public static getRandom(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    }

    public static initCanvas() {
        let size = cc.view.getFrameSize();
        let designResolution = cc.Canvas.instance.designResolution;
        try {
            // ipad等，以高度为准，进行适配，宽度两边流黑边
            // 1334 / 750
            if (size.height / size.width < designResolution.height / designResolution.width) {
                cc.Canvas.instance.fitHeight = true;
                cc.Canvas.instance.fitWidth = true;
            }
            // console.log('initCanvas end', size, designResolution, cc.game.canvas, cc.Camera.cameras);
        } catch (e) {
            console.error('initCanvas fail', size, designResolution, e);
        }
    }

    public static formatNumber(num) {
        return num >= 1e4 && num < 1e5 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e5 ? (num / 1e4).toFixed(1) + 'w' : num
    }

    public static deepClone(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (e) {
            return obj;
        }
    }

}