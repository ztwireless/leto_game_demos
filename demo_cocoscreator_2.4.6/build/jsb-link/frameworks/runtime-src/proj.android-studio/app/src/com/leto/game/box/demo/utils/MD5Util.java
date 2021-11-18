package com.leto.game.box.demo.utils;

import android.util.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {

	private static final String[] a = { "0", "1", "2", "3", "4", "5", "6", "7",
			"8", "9", "a", "b", "c", "d", "e", "f" };

	public static String md5(byte[] str) {
		String result = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(str);
			byte b[] = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			result = buf.toString();  //md5 32bit
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return result;
	}

	public static String byteArrayToHexString(byte[] paramArrayOfByte) {
		StringBuffer localStringBuffer = new StringBuffer();
		for (int i = 0; i < paramArrayOfByte.length; i++) {
			int j;
			if ((j = j = paramArrayOfByte[i]) < 0)
				j += 256;
			int k = j / 16;
			j %= 16;
			localStringBuffer.append(a[k] + a[j]);
		}
		return localStringBuffer.toString();
	}

	public static byte[] hexStringtoByteArray(String paramString) {
		if (paramString.length() % 2 != 0)
			return null;
		byte[] arrayOfByte = new byte[paramString.length() / 2];
		for (int i = 0; i < paramString.length() - 1; i += 2) {
			char c = paramString.charAt(i + 1);
			int j = Character.toLowerCase(j = paramString.charAt(i));
			c = Character.toLowerCase(c);
			if (j <= 57)
				j -= 48;
			else
				j = j - 97 + 10;
			j <<= 4;
			if (c <= '9')
				j += c - '0';
			else
				j += c - 'a' + 10;
			if (j > 127)
				j -= 256;
			j = (byte) j;
			arrayOfByte[(i / 2)] = (byte) j;
		}
		return arrayOfByte;
	}

	public static String encode(String paramString) {
		String str = null;
		try {
			str = new String(paramString);
			str = byteArrayToHexString((MessageDigest.getInstance("MD5"))
					.digest(str.getBytes()));
		} catch (Exception localException) {
		}
		return str;
	}

	public static String encodeBase64String(byte[] paramString) {
		paramString = Base64.decode(paramString, 0);
		try {
			MessageDigest localMessageDigest = null;
			return byteArrayToHexString((localMessageDigest = MessageDigest
					.getInstance("MD5")).digest(paramString));
		} catch (Exception localException) {
		}
		return null;
	}

	public static String digest(String str) {
		MessageDigest messageDigest = null;

		try {
			messageDigest = MessageDigest.getInstance("MD5");

			messageDigest.reset();

			messageDigest.update(str.getBytes("UTF-8"));

			byte[] byteArray = messageDigest.digest();

			StringBuffer md5StrBuff = new StringBuffer();

			for (int i = 0; i < byteArray.length; i++) {
				if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
					md5StrBuff.append("0").append(
							Integer.toHexString(0xFF & byteArray[i]));
				else
					md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
			}
			return md5StrBuff.toString();
		} catch (Exception e) {
			return "";
		}
	}
}
