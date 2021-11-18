package com.leto.game.box.demo;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.ledong.lib.leto.Leto;
import com.leto.sandbox.bean.AppFloatStyle;
import com.leto.sandbox.download.LetoDownloader;
import com.leto.sandbox.engine.LSBEngine;
import com.leto.sandbox.engine.listener.IInitializeListener;
import com.mgc.leto.game.base.trace.LetoTrace;

import androidx.multidex.MultiDex;

public class LetoApplication extends Application {
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);

		// init sandbox
		try {
			LSBEngine lsb = LSBEngine.get();
			lsb.init(base, new IInitializeListener() {
				@Override
				public void onLetoSandboxReady() {
					Log.d("test", "onLetoSandboxReady");
				}

				@Override
				public void onAppProcessStarted() {
				}

				@Override
				public void onAppProcessReady(String appPkgName) {
					Log.d("test", "app " + appPkgName + " process ready");
				}
			});
		} catch(Throwable e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onCreate() {
		super.onCreate();

		// set multidex
		MultiDex.install(this);

		// set float style
		AppFloatStyle style = new AppFloatStyle();
		style.setFloatIconResId(R.mipmap.demo_app_float_icon);
		style.setPlayButtonBgColor(0xFFFEDF11);
		style.setFloatLeftArrowResId(R.mipmap.demo_left_arrow_yellow);
		style.setFloatRightArrowResId(R.mipmap.demo_right_arrow_yellow);
		style.setMuteOnResId(R.mipmap.demo_switch_on);
		style.setMuteOffResId(R.mipmap.demo_switch_off);
		LSBEngine.setAppFloatStyle(style);

		// init leto
		if(LSBEngine.get().isMainProcess()) {
			//debug 调试日志开启
			LetoTrace.setDebugMode(true);

			//SDK 初始化 指定接入渠道
			Leto.init(this);

			// 初始化下载器
			LetoDownloader.init(this);
		}
	}
}
