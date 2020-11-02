package com.fast_track_5_react_native;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; 
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
 RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
    return "fast_track_5_react_native";
  }
}
