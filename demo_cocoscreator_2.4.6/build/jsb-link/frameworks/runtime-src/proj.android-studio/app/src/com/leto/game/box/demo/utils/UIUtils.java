package com.leto.game.box.demo.utils;

import android.content.Context;

import com.kaopiz.kprogresshud.KProgressHUD;

public class UIUtils {
	private static KProgressHUD _hud = null;

	public static void showProgress(Context context) {
		if(_hud == null) {
			_hud = KProgressHUD.create(context)
				.setStyle(KProgressHUD.Style.SPIN_INDETERMINATE)
				.setCancellable(false)
				.show();
		}
	}

	public static void hideProgress() {
		if(_hud != null) {
			_hud.dismiss();
			_hud = null;
		}
	}
}
