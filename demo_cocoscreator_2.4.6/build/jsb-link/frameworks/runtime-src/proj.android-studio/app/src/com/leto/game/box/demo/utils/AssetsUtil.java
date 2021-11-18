package com.leto.game.box.demo.utils;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class AssetsUtil {
    public static final String TAG = AssetsUtil.class.getSimpleName();

    public static boolean hasAssetDir(Context context, String path) {
        AssetManager manager = context.getAssets();
        try{
            String[] files = manager.list(path);
            if (files.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public static void copyDirFromAssets(Context context, String oldPath, String newPath) {
        try {
            String[] files = context.getAssets().list(oldPath);
            for(String file : files) {
                String filePath = oldPath + "/" + file;
                String dstPath = newPath + "/" + file;
                String[] subFiles = context.getAssets().list(filePath);
                if(subFiles.length > 0) { // it is a sub dir
                    copyDirFromAssets(context, filePath, dstPath);
                } else {
                    InputStream is = context.getAssets().open(filePath);
                    File newFile = new File(dstPath);
                    if (!newFile.getParentFile().exists()) {
                        newFile.getParentFile().mkdirs();
                    }
                    byte[] buffer = new byte[4096];
                    int byteCount = 0;
                    FileOutputStream fos = new FileOutputStream(newFile);
                    while ((byteCount = is.read(buffer)) != -1) {//循环从输入流读取 buffer字节
                        fos.write(buffer, 0, byteCount);//将读取的输入流写入到输出流
                    }
                    fos.flush();//刷新缓冲区
                    is.close();
                    fos.close();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * copy one file from asset to other place
     */
    public static boolean copyFileFromAssets(Context context, String oldPath, String newPath) {
        try {
            InputStream is = context.getAssets().open(oldPath);
            File newFile = new File(newPath);
            if (!newFile.getParentFile().exists()) {
                newFile.getParentFile().mkdirs();
            }
            FileOutputStream fos = new FileOutputStream(newFile);
            byte[] buffer = new byte[1024];
            int byteCount = 0;
            while ((byteCount = is.read(buffer)) != -1) {//循环从输入流读取 buffer字节
                fos.write(buffer, 0, byteCount);//将读取的输入流写入到输出流
            }
            fos.flush();//刷新缓冲区
            is.close();
            fos.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static String readStringFromAsset(Context context, String fileName) {
        InputStream is = null;
        try {
            is = context.getAssets().open(fileName);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int byteCount = 0;
            while ((byteCount = is.read(buffer)) != -1) {
                baos.write(buffer, 0, byteCount);
            }
            return new String(baos.toByteArray(), "utf8");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            IOUtil.closeAll(is);
        }
    }
}
