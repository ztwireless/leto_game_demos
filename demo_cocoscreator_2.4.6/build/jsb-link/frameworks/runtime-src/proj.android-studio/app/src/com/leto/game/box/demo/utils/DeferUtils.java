package com.leto.game.box.demo.utils;

import org.jdeferred2.Promise;
import org.jdeferred2.impl.DefaultDeferredManager;

import java.util.concurrent.Callable;

public class DeferUtils {
	private static DefaultDeferredManager _dm = new DefaultDeferredManager();

	public static <T> Promise<T, Throwable, Void> defer(Callable<T> run) {
		return _dm.when(run);
	}
}
