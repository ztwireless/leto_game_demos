package com.leto.game.box.demo.utils;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

public class AppUtils {
	public static String getAppVersionName(Context _context) {
		String versionName = "1.0";
		try {
			versionName = _context.getPackageManager().getPackageInfo(_context.getPackageName(), 0).versionName;
		} catch(PackageManager.NameNotFoundException var2) {
			var2.printStackTrace();
		}

		return versionName;
	}

	public static int getAppVersionCode(Context _context) {
		int version = 1;

		try {
			version = _context.getPackageManager().getPackageInfo(_context.getPackageName(), 0).versionCode;
		} catch(PackageManager.NameNotFoundException var2) {
			var2.printStackTrace();
		}

		return version;
	}

	public static String getMetaStringValue(Context context, String key) {
		String value = "";
		Object obj;
		try {
			ApplicationInfo appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
			if(null != appInfo.metaData) {
				try {
					obj = appInfo.metaData.get(key);
				} catch(Throwable e) {
					obj = null;
				}

				// if value is pure number, getString won't return string! so check it
				// and re-get int
				// 另外, 长数字字符串获取后会变成科学计数法, 所以在长数字字符串前面可以追加一个前缀
				// 返回时将自动去掉这个前缀
				if(null != obj) {
					value = String.valueOf(obj);
					if(value.startsWith("__MGC_META_PREFIX_")) {
						value = value.substring("__MGC_META_PREFIX_".length());
					}
				}
			}
		} catch(Throwable e) {
			e.printStackTrace();
		}

		return value;
	}
}
