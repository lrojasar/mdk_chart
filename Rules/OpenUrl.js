
var clientAPI;
var AdvancedWebView = require('nativescript-advanced-webview');
/**
 * Describe this function...
 */
export default function OpenUrl(clientAPI) {
    AdvancedWebView.init();
    var opts = {
        url: 'https://haydukcontigo.hayduk.com.pe/login',
        toolbarColor: '#fff',
        toolbarControlsColor: '#333', // iOS only
        showTitle: false, // Android only
        isClosed: function (res) {
            console.log('closed it', res);
        }
    };

   AdvancedWebView.openAdvancedUrl(opts);
}
