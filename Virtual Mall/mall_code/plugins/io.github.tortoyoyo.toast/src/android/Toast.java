package io.github.tortoyoyo.toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

public class Toast extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equals("create")) { 
			if (!args.getString(1).equals("null")) {
				executeToast(args.getString(0), args.getInt(1), callbackContext);
				return true;
			} else {
				callbackContext.error("Valor duration não inserido");
			}
		}

		return false;

	}

	private void executeToast(String menssage, int duration,
			CallbackContext call) {
		try {
			if (duration <= 1 && duration >= 0) {
				cordova.getActivity().runOnUiThread(
						new RunnableToast(menssage, duration));
				call.success("Toast Executado");
			} else {
				call.error("Valor duration deve ser 0 ou 1");
			}
		} catch (Exception e) {
			call.error("Erro: " + e.getMessage());
		}

	}

	class RunnableToast implements Runnable {
		private String message;
		private int length;

		public RunnableToast(String message, int length) {
			this.message = message;
			this.length = length;
		}

		@Override
		public void run() {
			android.widget.Toast.makeText(
					cordova.getActivity().getBaseContext(), message, length)
					.show();
		}
	}

}
