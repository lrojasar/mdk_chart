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

    public initialize(props) {
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
        this.oWebView.src = "https://webhook.site/ea65199a-bcbb-457e-99d8-b6ed8ec905ca";
        this.oWebViewUtils = new WebViewUtils();
        const headers: Map<string, string> = new Map();
        headers.set("Token", "Berear :1234");
        headers.set("X-Custom-Header", "Set at " + new Date().toTimeString());
        headers.set("User-Agent", "My Awesome User-Agent!");
        this._StackLayout.addChild(this.oWebView);
        //this.oWebViewUtils.addHeaders(this.oWebView, headers);
        // Create Pie Chart using External plugin
        this.oWebView.onLoadFinished=function(args: LoadEventData) {
            const webView = args.object as WebView;
            if (!args.error) {
                console.log("Load Finished");
            } else {
                console.log(`EventName: ${args.eventName}`);
            }
        }

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