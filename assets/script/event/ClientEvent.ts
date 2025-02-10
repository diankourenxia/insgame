

export default class ClientEvent extends cc.EventTarget{

    private static _instance: ClientEvent = null;

    public static instance(): ClientEvent {
        if (this._instance === null) {
            this._instance = new ClientEvent();
        }
        return this._instance;
    }


    /**
     *
     * @param type
     * @param handler
     * @param target
     * @param useCapture
     */
    public on<T extends Function>(type: string, handler: T, target: any, useCapture?: boolean): T {
        if (!type || !target) {
            console.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        return super.on(type, handler, target, useCapture)
    }

    /**
     * @param type
     * @param handler
     * @param target
     */
    public once(type: string, handler: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        if (!type || !target) {
            console.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        return super.once(type, handler, target);
    }


    /**
     *
     * @param type
     * @param handler
     * @param target
     */
    public off(type: string, handler: Function, target: any): void {
        if (!type || !target) {
            console.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        return super.off(type, handler, target);
    }

    /**
     *
     * @param target
     */
    public targetOff(target: any) {
        if (!target) {
            console.error("事件对象===>  target =", target);
            return;
        }
        return super.targetOff(target);
    }

    /**
     * 派发事件
     * @param type  事件类型
     * @param arg1
     * @param arg2
     * @param arg3
     * @param arg4
     * @param arg5
     */
    public emit(type: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        return super.emit(type, arg1, arg2, arg3, arg4, arg5)
    }

}