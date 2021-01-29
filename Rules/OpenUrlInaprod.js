
var clientAPI;
var InAppBrowser = require('nativescript-inappbrowser');

/**
 * Describe this function...
 */
export default async function OpenUrlInaprod(clientAPI) {

    const Dialogs = clientAPI.nativescript.uiDialogsModule;
    const Utils = clientAPI.nativescript.utilsModule;
     const url = 'https://www.google.com'
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          hasBackButton: true,
          browserPackage: '',
          showInRecents: false
        });
        Dialogs.alert({
          title: 'Response',
          message: JSON.stringify(result),
          okButtonText: 'Ok'
        });
      }
      else {
        Utils.openUrl(url);
      }
}
