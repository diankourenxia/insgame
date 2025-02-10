export default class EventType {
	public static VIEW_CLOSE: string = "view_close";

	public static VIEW_OPEN: string = "view_open";

	public static CLOSE_LOADING: string = "close_loading";

	public static LOAD_BUNDLE_SUCCESS = 'load_bundle_success_';

	public static LOAD_BUNDLE_FAIL = 'load_bundle_fail_';

	public static SHOW_REWARD_AD_WC = 'show_reward_ad_wc';

	public static SHOW_REWARD_AD_TC = 'show_reward_ad_tc';

	/** 更新货币 */
	public static UPDATE_CURRENCY = 'update_currency';

	// 游戏用到的事件------------------------------------

	/** 通知销毁 英雄或敌军 参：{type:"hero || enemy,index:集合中的下标"} */
	public static DELETE_ACTOR = 'delete_actor';

	/** 通關通知 */
	public static GUAN_QIA_JIESUO = "guan_qia_jiesuo";

	/** 是否自动是否技能 */
	public static IS_AUTOMATICALLY_SKILL = 'is_automatically_skill';

	/** 是否在釋放技能 */
	public static RELEASE_SKILL = 'release_skill';

	public static GQ_QIEHUAN = 'gq_qiehuan';

	/** 血量通知 */
	public static H_BLOOD = "hblood";
	public static E_BLOOD = "eblood";

}
