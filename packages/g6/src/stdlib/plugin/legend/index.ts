import { Category, Navigator } from "@antv/gui";
import { Canvas, Group, Rect, DisplayObject, Text } from "@antv/g";
import { isString, isNil, each, debounce } from "@antv/util";
import { createDom, modifyCSS } from "@antv/dom-util";
import { IGraph } from "../../../types";
import { ShapeStyle } from "../../../types/item";
import { Plugin as Base, IPluginBaseConfig } from "../../../types/plugin";
import { createCanvas } from "../../../util/canvas";
import { IG6GraphEvent } from "../../../types/event";

interface LegendConfig extends IPluginBaseConfig {
  container?: HTMLDivElement | null;
}

export default class Legend extends Base {
  private legend: Category;

  constructor(options?: LegendConfig) {
    super(options);
  }

  public getDefaultCfgs(): LegendConfig {
    return {
      container: null,
    };
  }

  public getEvents() {
    return {
      afterrender: this.updateLegend,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  private updateLegend() {
    if (!this.legend) {
      this.legend = this.createLegend();
    }
  }

  private createLegend() {
    // const { graph } = this;
    // const canvas = graph.canvas;

    const container = document.getElementById("container2");
    const canvas = createCanvas("canvas", container, 500, 500);

    const items1 = [
      { name: "事例一", color: "#4982f8" },
      { name: "事例二", color: "#41d59c" },
      { name: "事例三", color: "#516587" },
      { name: "事例四", color: "#f9b41b" },
      { name: "事例五", color: "#624ef7" },
    ];
    const colors = ["#5781f0", "#70d2a0", "#556484", "#efb745", "#5f4fee"];
    // const legend = new Category({
    //   style: {
    //     x: 10,
    //     y: 10,
    //     data: [
    //       {
    //         label: "Middle East",
    //       },
    //       {
    //         label: "South Asia",
    //       },
    //       {
    //         label: "East Asia",
    //       },
    //       {
    //         label: "Europe(and colonial offshoots)",
    //       },
    //       {
    //         label: "Sub-Saharan Africa",
    //       },
    //       {
    //         label: "pre-colonial Americas",
    //       },
    //       {
    //         label: "the Steppes",
    //       },
    //     ],
    //     layout: "flex",
    //     gridRow: 2,
    //     gridCol: 4,
    //     height: 300,
    //     width: 500,
    //     titleText: "Legend Title",
    //     itemMarkerFill: (_: any, i: number) => colors[i % colors.length],
    //   },
    // });
    // console.log("legend", legend);
    // canvas.appendChild(legend);
    // console.log("cnavas", canvas.getRoot());

    const group = new Group({
      style: {
        width: 810,
        height: 350,
      },
    });

    const createPageViews = (
      count: number,
      [w, h]: [number, number],
      formatter = (str: any) => `page - ${str}`
    ) => {
      return new Array(count).fill(0).map((_, index) => {
        const g = new Group();
        const rect = new Rect({
          style: {
            width: w,
            height: h,
            stroke: "red",
            fill: "#f7f7f7",
          },
        });
        rect.appendChild(
          new Text({
            style: {
              text: formatter(index + 1),
              x: w / 2,
              y: h / 2,
              textAlign: "center",
            },
          })
        );
        g.appendChild(rect);
        return g;
      });
    };

    const createNav = (args = {}, size = 5) => {
      const nav = new Navigator({
        style: {
          pageWidth: 100,
          pageHeight: 100,
          loop: true,
          ...args,
        },
      });
      createPageViews(size, [100, 100]).forEach((page) => {
        nav.getContainer().appendChild(page);
      });
      group.appendChild(nav);
      return nav;
    };

    const nav1 = createNav({ x: 100, y: 100 });

    return group;
  }

  public destroy() {}
}
