import { ChartType, Plugin } from "chart.js";


declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType = ChartType> {
    annotations?: {
      type: string;
      padding: number;
      content: string;
      yValue: number;
      xValue: number;
      height: number;
      width: number;
      backgroundColor: string;
    };
  }
}