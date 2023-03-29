import { Graph } from "../../../src/index";
import { Group, Text, Rect, Canvas } from "@antv/g";
import { Category, grid, Navigator } from "@antv/gui";
import { Renderer } from "@antv/g-canvas";
import { createCanvas } from "../../../src/util/canvas";

const container = document.createElement("div");
container.id = "container";
document.querySelector("body").appendChild(container);

const container2 = document.createElement("div");
container2.id = "container2";
document.querySelector("body").appendChild(container2);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    type: "graph",
    data: {
      nodes: [
        { id: "node1", data: { x: 100, y: 200 } },
        { id: "node2", data: { x: 200, y: 250 } },
      ],
      edges: [{ id: "edge1", source: "node1", target: "node2", data: {} }],
    },
    node: {
      labelShape: {
        text: {
          fields: ["id"],
          formatter: (model) => {
            return model.id;
          },
        },
      },
    },
    modes: {
      default: ["brush-select"],
    },
    plugins,
  });
};
describe("plugin", () => {
  test("legend with string config", () => {
    const canvas = new Canvas({
      container,
      width: 1000,
      height: 1000,
      devicePixelRatio: 1,
      renderer: new Renderer(),
    });

    const group = new Group({
      style: {
        zIndex: 1,
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

    canvas.appendChild(
      new Rect({
        style: {
          width: 200,
          height: 200,
          fill: "red",
          zIndex: 0,
        },
      })
    );
    console.log(nav1);
    canvas.appendChild(group);
  });
});

xdescribe("plugin", () => {
  test("minimap with string config", (done) => {
    const graph = createGraph(["minimap"]);
    graph.on("afterlayout", (e) => {
      const viewport = document.getElementsByClassName(
        "g6-minimap-viewport"
      )?.[0];
      expect(viewport).not.toBe(undefined);
      // setTimeout for: minimap viewport debounce update
      setTimeout(() => {
        expect(viewport.style.left).toBe("0px");
        expect(viewport.style.top).toBe("0px");
        expect(viewport.style.width).toBe("200px");
        expect(viewport.style.height).toBe("120px");

        graph.zoom(3);
        graph.translate(50, 250);
        // setTimeout for: 1. zoom an translate are async function; 2. minimap viewport debounce update
        setTimeout(() => {
          expect(viewport.style.left).toBe("99.3658px");
          expect(viewport.style.top).toBe("0px");
          expect(viewport.style.width).toBe("100.634px");
          expect(viewport.style.height).toBe("76.4581px");

          graph.addData("node", [{ id: "node3", data: { x: 50, y: 150 } }]);
          setTimeout(() => {
            expect(viewport.style.left).toBe("117.383px");
            expect(viewport.style.top).toBe("0px");
            expect(viewport.style.width).toBe("82.6175px");
            expect(viewport.style.height).toBe("88.345px");

            graph.updateData("node", [
              { id: "node3", data: { x: 150, y: 50 } },
            ]);

            setTimeout(() => {
              expect(viewport.style.left).toBe("99.7435px");
              expect(viewport.style.top).toBe("28.3537px");
              expect(viewport.style.width).toBe("100.257px");
              expect(viewport.style.height).toBe("69.4723px");

              graph.removeData("node", "node3");
              setTimeout(() => {
                expect(viewport.style.left).toBe("99.3658px");
                expect(viewport.style.top).toBe("0px");
                expect(viewport.style.width).toBe("100.634px");
                expect(viewport.style.height).toBe("76.4581px");

                graph.destroy();
                const viewport2 = document.getElementsByClassName(
                  "g6-minimap-viewport"
                )?.[0];
                expect(viewport2).toBe(undefined);
                done();
              }, 100);
            }, 100);
          }, 100);
        }, 200);
      }, 100);
    });
  });

  test("minimap with object onfig and delegate type", (done) => {
    const graph = createGraph([
      {
        key: "minimap1",
        type: "minimap",
        size: [300, 300],
        mode: "delegate",
        delegateStyle: {
          fill: "#f00",
        },
      },
    ]);

    graph.on("afterlayout", (e) => {
      const viewport = document.getElementsByClassName(
        "g6-minimap-viewport"
      )?.[0];
      setTimeout(() => {
        expect(viewport.style.width).toBe("300px");
        expect(viewport.style.height).toBe("300px");
        const { plugin: minimap } =
          graph.pluginController.pluginMap.get("minimap1");
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(3);
        const node1Delegate = minimapRootGroup.find(
          (ele) => ele.id === "minimap-delegate-node1"
        );
        expect(node1Delegate.nodeName).toBe("rect");
        expect(node1Delegate.style.fill).toBe("#f00");
        const node2Delegate = minimapRootGroup.find(
          (ele) => ele.id === "minimap-delegate-node2"
        );
        expect(node2Delegate.nodeName).toBe("rect");
        expect(node2Delegate.style.fill).toBe("#f00");
        graph.destroy();
        done();
      }, 100);
    });
  });

  test("minimap with object onfig and keyShape type", (done) => {
    const graph = createGraph([
      {
        key: "minimap1",
        type: "minimap",
        mode: "keyShape",
        size: [200, 300],
      },
    ]);

    graph.on("afterlayout", (e) => {
      const viewport = document.getElementsByClassName(
        "g6-minimap-viewport"
      )?.[0];
      setTimeout(() => {
        expect(viewport.style.width).toBe("200px");
        expect(viewport.style.height).toBe("300px");
        const { plugin: minimap } =
          graph.pluginController.pluginMap.get("minimap1");
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(3);
        const node1Delegate = minimapRootGroup.find(
          (ele) => ele.id === "minimap-keyShape-node1"
        );
        expect(node1Delegate.nodeName).toBe("circle");
        const node1KeyShape =
          graph.itemController.itemMap["node1"].shapeMap["keyShape"];
        expect(node1Delegate.style.fill).toBe(node1KeyShape.style.fill);

        const node2Delegate = minimapRootGroup.find(
          (ele) => ele.id === "minimap-keyShape-node2"
        );
        expect(node2Delegate.nodeName).toBe("circle");
        const node2KeyShape =
          graph.itemController.itemMap["node2"].shapeMap["keyShape"];
        expect(node2Delegate.style.fill).toBe(node2KeyShape.style.fill);

        graph.destroy();
        done();
      }, 100);
    });
  });
});

xdescribe("graph plugin related APIs", () => {
  let graph;
  test("add plugins to graph", (done) => {
    graph = createGraph(undefined);
    graph.on("afterlayout", () => {
      let viewport = document.getElementsByClassName(
        "g6-minimap-viewport"
      )?.[0];
      expect(viewport).toBe(undefined);
      graph.addPlugins("minimap");

      // setTimeout for minimap canvas ready
      setTimeout(() => {
        viewport = document.getElementsByClassName("g6-minimap-viewport")?.[0];
        expect(viewport).not.toBe(undefined);

        graph.addPlugins([
          {
            key: "minimap1",
            type: "minimap",
            mode: "delegate",
          },
          {
            key: "minimap2",
            type: "minimap",
            mode: "keyShape",
          },
        ]);

        // setTimeout for minimap canvas ready
        setTimeout(() => {
          const viewports = document.getElementsByClassName(
            "g6-minimap-viewport"
          );
          expect(viewports.length).toBe(3);
          done();
        }, 100);
      }, 100);
    });
  });

  test("update minimap", (done) => {
    graph.updatePlugin({
      key: "minimap2",
      mode: "delegate",
      delegateStyle: {
        fill: "#f00",
      },
    });

    // setTimeout for minimap canvas ready
    setTimeout(() => {
      const viewports = document.getElementsByClassName("g6-minimap-viewport");
      expect(viewports.length).toBe(3);

      const { plugin: minimap } =
        graph.pluginController.pluginMap.get("minimap2");
      expect(minimap).not.toBe(undefined);
      const minimapCanvas = minimap.canvas;
      const minimapRootGroup = minimapCanvas.getRoot();
      const node1Delegate = minimapRootGroup.find(
        (ele) => ele.id === "minimap-delegate-node1"
      );
      expect(node1Delegate.nodeName).toBe("rect");
      expect(node1Delegate.style.fill).toBe("#f00");

      done();
    }, 100);
  });

  test("remove minimap", (done) => {
    graph.removePlugins(["minimap1", "minimap2"]);
    // setTimeout for minimap canvas ready
    setTimeout(() => {
      const viewports = document.getElementsByClassName("g6-minimap-viewport");
      expect(viewports.length).toBe(1);
      graph.destroy();
      done();
    }, 100);
  });
});
