package com.leto.game.box.demo.lsb;

import android.app.Activity;
import android.widget.Toast;

import com.game.sdk.HuosdkManager;
import com.game.sdk.domain.CustomPayParam;
import com.game.sdk.domain.LoginErrorMsg;
import com.game.sdk.domain.LogincallBack;
import com.game.sdk.domain.PaymentCallbackInfo;
import com.game.sdk.domain.PaymentErrorMsg;
import com.game.sdk.domain.RoleInfo;
import com.game.sdk.domain.SubmitRoleInfoCallBack;
import com.game.sdk.listener.OnInitSdkListener;
import com.game.sdk.listener.OnLoginListener;
import com.game.sdk.listener.OnLogoutListener;
import com.game.sdk.listener.OnPaymentListener;
import com.leto.game.box.demo.utils.MainHandler;
import com.leto.sandbox.engine.LSBEngine;
import com.leto.sandbox.engine.listener.ISdkRequestHandler;
import com.leto.sandbox.sdk.huo.HuoOrderInfo;
import com.leto.sandbox.sdk.huo.HuoRoleInfo;

import java.lang.ref.WeakReference;

public class LSBSdkRequestHandler implements ISdkRequestHandler {
	private WeakReference<Activity> _act;

	// singleton
	private static LSBSdkRequestHandler _inst = null;

	// huo sdk
	private HuosdkManager _huoSdk;

	// huo role info last set
	private RoleInfo _huoRoleInfo;

	// pending pay param
	private CustomPayParam _payParams;

	public static void create(Activity act) {
		if(_inst == null) {
			_inst = new LSBSdkRequestHandler(act);
		} else if(_inst._act.get() != act) {
			_inst._act = new WeakReference<>(act);
		}
	}

	public static LSBSdkRequestHandler get() {
		return _inst;
	}

	private LSBSdkRequestHandler(Activity act) {
		_act = new WeakReference<>(act);
	}

	public void init() {
		MainHandler.runOnUIThread(() -> initHuoSDK());
	}

	private Activity getActivity() {
		return _act.get();
	}

	private void initHuoSDK() {
		Activity act = getActivity();
		if(act != null) {
			// get singleton and init
			_huoSdk = HuosdkManager.getInstance();
			_huoSdk.initSdk(act, new OnInitSdkListener() {
				@Override
				public void initSuccess(String code, String msg) {
//					showToast("HuoSDK初始化成功: " + msg);
				}

				@Override
				public void initError(String code, String msg) {
					showToast("HuoSDK初始化失败, err: " + msg);
				}
			});

			// add login listener
			_huoSdk.addLoginListener(new OnLoginListener() {
				@Override
				public void loginSuccess(LogincallBack cbLogin) {
					showToast("登陆成功 memId=" +
						cbLogin.mem_id + "  token=" + cbLogin.user_token);

					// notify
					MainHandler.runOnUIThread(() -> LSBEngine.get().notifyHuoSignInSuccess(ModelConverter.toHuoUserInfo(cbLogin)));
				}

				@Override
				public void loginError(LoginErrorMsg loginErrorMsg) {
					showToast(" code=" + loginErrorMsg.code + "  msg=" + loginErrorMsg.msg);

					// notify
					if(loginErrorMsg.code == -2) {
						MainHandler.runOnUIThread(() -> LSBEngine.get().notifyHuoSignInCancelled());
					} else {
						MainHandler.runOnUIThread(() -> LSBEngine.get().notifyHuoSignInFailed(loginErrorMsg.msg));
					}
				}
			});

			// add logout listener
			_huoSdk.addLogoutListener(new OnLogoutListener() {
				@Override
				public void logoutSuccess(int type, String code, String msg) {
					showToast("登出成功，类型type="+type+" code="+code+" msg="+msg);
				}

				@Override
				public void logoutError(int type, String code, String msg) {
					showToast("登出失败，类型type="+type+" code="+code+" msg="+msg);
				}
			});

			_huoSdk.addPaymentListener(new OnPaymentListener() {
				@Override
				public void paymentSuccess(PaymentCallbackInfo callbackInfo) {
					showToast("充值金额数：" + callbackInfo.money + " 消息提示：" + callbackInfo.msg);

					// notify
					MainHandler.runOnUIThread(() -> LSBEngine.get().notifyHuoPaySuccess(_payParams.getCp_order_id(), _payParams.getExt()));
				}

				@Override
				public void paymentError(PaymentErrorMsg errorMsg) {
					showToast("充值失败：code:" +
						errorMsg.code + "  ErrorMsg:" + errorMsg.msg +
						"  预充值的金额：" + errorMsg.money);

					if(errorMsg.code == -2) {
						MainHandler.runOnUIThread(() ->LSBEngine.get().notifyHuoPayCancelled(_payParams.getCp_order_id()));
					} else {
						MainHandler.runOnUIThread(() -> LSBEngine.get().notifyHuoPayFailed(_payParams.getCp_order_id(), errorMsg.msg));
					}
				}
			});
		}
	}

	@Override
	public void handleHuoSignIn(String gameId) {
		Activity act = getActivity();
		if(act != null) {
			_huoSdk.showLogin(gameId, true);
		}
	}

	@Override
	public void handleHuoPay(String gameId, HuoOrderInfo info) {
		_payParams = ModelConverter.toCustomPayParam(info);
		_payParams.setRoleinfo(_huoRoleInfo);
		MainHandler.runOnUIThread(() -> _huoSdk.showPay(gameId, _payParams));
	}

	@Override
	public void handleSetHuoRoleInfo(String gameId, HuoRoleInfo info) {
		_huoRoleInfo = ModelConverter.toRoleInfo(info);
		_huoSdk.setRoleInfo(gameId, _huoRoleInfo, new SubmitRoleInfoCallBack() {
			@Override
			public void submitSuccess() {
				showToast("角色信息提交成功");
			}

			@Override
			public void submitFail(String s) {
				showToast("角色信息提交失败: " + s);
			}
		});
	}

	private void showToast(String msg) {
		// get activity
		Activity act = getActivity();
		if(act == null) {
			return;
		}

		// show toast
		act.runOnUiThread(() -> Toast.makeText(act, msg, Toast.LENGTH_SHORT).show());
	}
}
