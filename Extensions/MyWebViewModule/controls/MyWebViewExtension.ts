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

export class MyWebViewClass extends IControl {
  private _model: any;
  private _observable: BaseObservable;
  private _targetLabel: any;
  private _StackLayout: any;
  private oRadPieChart: any;
  private oDonutSeries: any;
  private Selectionmode: any;
  private seriesArray: any;

  public initialize(props) {
  	super.initialize(props);
	
	// Initiate saleorder Model    
    if(!this._model){ this._model = new oModel(); };

   // Stack Layout
    this._StackLayout = new StackLayout();
    this._StackLayout.backgroundColor = "#f2efe8";
    
   // Create Label
    this._targetLabel = new Label();
    this._targetLabel.text  = "No Sales Data";
    this._StackLayout.addChild(this._targetLabel);
    
    // Create Pie Chart using External plugin
    this.oRadPieChart = new RadPieChart();
    this.oRadPieChart.row = 0 ;
    this.oDonutSeries = new DonutSeries();
    this.oDonutSeries.seriesName = "myDonutSeries";
    this.Selectionmode = <ChartSeriesSelectionMode> 'None';
    this.oDonutSeries.selectionMode = this.Selectionmode;
    this.oDonutSeries.expandRadius = 0.4;  
    this.oDonutSeries.outerRadiusFactor = 0.6;
    this.oDonutSeries.innerRadiusFactor = 0.8;
    this.oDonutSeries.valueProperty = "Amount";
    this.oDonutSeries.showLabels = true;
    this.seriesArray = new ObservableArray();
    this.seriesArray.push(this.oDonutSeries);
	this.oRadPieChart.series = this.seriesArray;
    this._StackLayout.addChild(this.oRadPieChart);
    
    // Extension Properties
    let extProps = this.definition().data.ExtensionProperties;
	  if (extProps) {
    	  // Resolve SalesData
	      this.valueResolver().resolveValue(extProps.SalesData, this.context, true).then(function(SalesData){
			this._targetLabel.text  = "Sales Orders Revenue";
			this._targetLabel.textAlignment = "center";
			this._targetLabel.fontWeight = "bold";
			SalesData.forEach(result=> {
				 this._model.setSalesOrderHeader( result.SalesOrderId, result.NetAmount );
			});
            this.oDonutSeries.items = this._model.getSalesOrderHeader();
	      }.bind(this));
    	}
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