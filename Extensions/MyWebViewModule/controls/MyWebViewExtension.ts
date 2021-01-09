import * as app from 'tns-core-modules/application';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';
import { Color } from 'tns-core-modules/color';
import { IControl } from 'mdk-core/controls/IControl';
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { oModel } from './main-model';
import { Page } from 'tns-core-modules/ui/page';
import { RadPieChart, DonutSeries, ChartSeriesSelectionMode } from 'nativescript-ui-chart';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { WebViewUtils } from 'nativescript-webview-utils';
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
import { HtmlView } from "tns-core-modules/ui/html-view";
import { InAppBrowser } from 'nativescript-inappbrowser';
import { Utils, Dialogs } from '@nativescript/core';
export class MyWebViewClass extends IControl {
    private _model: any;
    private _observable: BaseObservable;
    private _targetLabel: any;
    private _StackLayout: any;
    private oRadPieChart: any;
    private oDonutSeries: any;
    private Selectionmode: any;
    private seriesArray: any;
    private oWebView: any;
    private oWebViewUtils: any;
    private oInAppBrowser: any;
    private oDiaglogs: any;
    private headers: Map<string, string> = new Map();
    public async initialize(props) {
        super.initialize(props);

        // Initiate saleorder Model    
        if (!this._model) { this._model = new oModel(); };

        // Stack Layout
        this._StackLayout = new StackLayout();
        this._StackLayout.backgroundColor = "#f2efe8";

        // Create Label
        this._targetLabel = new Label();
        this._targetLabel.text = "Demo";
        this._StackLayout.addChild(this._targetLabel);

        this.oWebView = new WebView();

        this.oWebViewUtils = new WebViewUtils();
        //const headers: Map<string, string> = new Map();
        this.headers.set("Token", "Berear :1234");
        this.headers.set("X-Custom-Header", "Set at " + new Date().toTimeString());
        this.oWebView.onLoadStarted = function (args) {
            this.oWebViewUtils.addHeaders(this.oWebView, this.headers);
        }
        this.oWebView.onLoadFinished = function (args) {
            this.oWebViewUtils.addHeaders(this.oWebView, this.headers);
        }
        this.oWebView.src = "https://web.facebook.com/";
        this._StackLayout.addChild(this.oWebView);
        // Create Pie Chart using External plugin
        /*getString(this.oWebView.src).then((r: any) => {
            var rr = r;
        }, (e) => {
            var re = "";
        });
        request({
            url: this.oWebView.src,
            method: "GET",
            headers: { "Token": "Bearear : 018347912378491723498273948" }
        }).then((response) => {
            const result = response;

        }, (e) => {
            var resutl = "";
        });*/
        const myHtmlView = new HtmlView();

        myHtmlView.html = `<span>
        <h1><font color=\"blue\">NativeScript HtmlView</font></h1></br>
        <h3>This component accept simple HTML strings</h3></span>`;
        this._StackLayout.addChild(myHtmlView);
        this.oInAppBrowser = new InAppBrowser();
        const result = await this.oInAppBrowser.open(this.oWebView.src, {
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
            headers: {
                'my-custom-header': 'my custom header value'
            },
            hasBackButton: true,
            browserPackage: '',
            showInRecents: false
        });
        // Extension Properties
        let extProps = this.definition().data.ExtensionProperties;
        if (extProps) {
            // Resolve SalesData
            this.valueResolver().resolveValue(extProps.SalesData, this.context, true).then(function (SalesData) {
                this._targetLabel.text = "App";
                this._targetLabel.textAlignment = "center";
                this._targetLabel.fontWeight = "bold";
                SalesData.forEach(result => {
                    this._model.setSalesOrderHeader(result.SalesOrderId, result.NetAmount);
                });
                this.oDonutSeries.items = this._model.getSalesOrderHeader();
            }.bind(this));
        }
    }
    public webViewLoaded(args) {
        const webView: WebView = <WebView>args.object;
    }
    public view() {
        return this._StackLayout; // Return View
    }

    public viewIsNative() {
        return true;
    }

    // Abstract Method
    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;

    }

    // Abstract Method
    public setValue(value: any, notify: boolean): Promise<any> {
        return Promise.resolve();
    }

    public setContainer(container: IControl) {
        // do nothing
    }
}