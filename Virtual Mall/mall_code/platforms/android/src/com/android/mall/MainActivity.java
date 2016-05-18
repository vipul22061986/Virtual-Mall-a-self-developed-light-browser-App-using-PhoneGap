/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.android.mall;

import java.util.ArrayList;

import android.database.Cursor;
import android.os.Bundle;
import android.provider.Browser;
import android.util.Log;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @SuppressWarnings("deprecation")
	@Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);
        loadUrl("file:///android_asset/www/main.html");
        
        String[] proj = new String[] { Browser.BookmarkColumns.TITLE, Browser.BookmarkColumns.URL };
        String sel = Browser.BookmarkColumns.BOOKMARK + " = 0"; // 0 = history, 1 = bookmark
        Cursor mCur = getContentResolver().query(Browser.BOOKMARKS_URI, proj, sel, null, null);
        mCur.moveToFirst();
        ArrayList<String> array = new ArrayList<String>();
        @SuppressWarnings("unused")
        String title = "";
        @SuppressWarnings("unused")
        String url = "";
        if (mCur.moveToFirst() && mCur.getCount() > 0) {
        	boolean cont = true;
        	while (mCur.isAfterLast() == false && cont) {
        		title = mCur.getString(mCur.getColumnIndex(Browser.BookmarkColumns.TITLE));
        		url = mCur.getString(mCur.getColumnIndex(Browser.BookmarkColumns.URL));
        		// Do something with title and url

        		Log.v("titleIdx", mCur
        				.getString(Browser.HISTORY_PROJECTION_TITLE_INDEX));
        		Log.v("urlIdx", mCur
        				.getString(Browser.HISTORY_PROJECTION_URL_INDEX));

        		array.add(title + " : " + url);

        		mCur.moveToNext();
        	}
        }      

        if (array.size() > 0) {
        	for (String string : array) {
        		Log.v("result ", string);
        	}
        }
    }
}
