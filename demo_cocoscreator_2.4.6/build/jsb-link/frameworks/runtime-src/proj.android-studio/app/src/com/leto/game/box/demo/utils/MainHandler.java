package com.leto.game.box.demo.utils;

import android.os.Handler;
import android.os.Looper;

public class MainHandler extends Handler {
    private static volatile MainHandler instance;

    public static MainHandler getInstance() {
        if (null == instance) {
            synchronized (MainHandler.class) {
                if (null == instance) {
                    instance = new MainHandler();
                }
            }
        }
        return instance;
    }

    private MainHandler() {
        super(Looper.getMainLooper());
    }

    public static void runOnUIThread(Runnable r) {
        runOnUIThread(r, 0);
    }

    public static void runOnUIThread(Runnable r, int delayMillis) {
        MainHandler.getInstance().postDelayed(r, (long) delayMillis);
    }

    public static void removeUITask(Runnable r) {
        MainHandler.getInstance().removeCallbacks(r);
    }
}