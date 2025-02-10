import { TileType } from "../Battle/type/Enum";

export default class GameConfig {

    public static row: number = 8; // 行数

    public static col: number = 9; // 列数

    public static size: number = 70; // 方块的尺寸

    public static spacing: number = 8; // 间隔

    public static padding: number = 8; // 边距

    public static types: TileType[] = [1, 2, 3, 4, 5, 6]; // 方格类型集合

}
