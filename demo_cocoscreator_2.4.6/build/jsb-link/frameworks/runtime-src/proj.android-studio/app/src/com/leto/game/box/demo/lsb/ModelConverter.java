package com.leto.game.box.demo.lsb;

import com.game.sdk.domain.CustomPayParam;
import com.game.sdk.domain.LogincallBack;
import com.game.sdk.domain.RoleInfo;
import com.leto.sandbox.sdk.huo.HuoOrderInfo;
import com.leto.sandbox.sdk.huo.HuoRoleInfo;
import com.leto.sandbox.sdk.huo.HuoUserInfo;

public class ModelConverter {
	public static HuoUserInfo toHuoUserInfo(LogincallBack cb) {
		HuoUserInfo info = new HuoUserInfo();
		info.setUserToken(cb.user_token);
		info.setMemId(cb.mem_id);
		return info;
	}

	public static CustomPayParam toCustomPayParam(HuoOrderInfo info) {
		CustomPayParam param = new CustomPayParam();
		param.setCp_order_id(info.getCpOrderId());
		param.setProduct_price(info.getProductPrice());
		param.setProduct_count(info.getProductCount());
		param.setProduct_id(info.getProductId());
		param.setProduct_name(info.getProductName());
		param.setProduct_desc(info.getProductDesc());
		param.setExchange_rate(info.getExchangeRate());
		param.setCurrency_name(info.getCurrencyName());
		param.setExt(info.getExt());
		return param;
	}

	public static RoleInfo toRoleInfo(HuoRoleInfo info) {
		RoleInfo roleInfo = new RoleInfo();
		roleInfo.setRole_type(info.getRoleType());
		roleInfo.setServer_id(info.getServerId());
		roleInfo.setServer_name(info.getServerName());
		roleInfo.setRole_id(info.getRoleId());
		roleInfo.setRole_name(info.getRoleName());
		roleInfo.setParty_name(info.getPartyName());
		roleInfo.setRole_level(info.getRoleLevel());
		roleInfo.setRole_vip(info.getRoleVip());
		roleInfo.setRole_balence(info.getRoleBalance());
		roleInfo.setRolelevel_ctime(info.getRoleLevelCreateTime());
		roleInfo.setRolelevel_mtime(info.getRoleLevelModifyTime());
		return roleInfo;
	}
}
