<iframe src="https://codesandbox.io/embed/2gv4rt?view=split&module=%2Fsrc%2Fapp%2Fapp.component.ts&hidenavigation=1&theme=light"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="G6 Angular"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

**app.component.html**

```html
<div>
  <h1>{{ title }}</h1>
  <div #container></div>
</div>
```

**app.component.ts**

```ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Graph } from '@antv/g6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Use G6 in Angular';

  @ViewChild('container') container: ElementRef;

  ngAfterViewInit() {
    const graph = new Graph({
      container: this.container.nativeElement,
      width: 500,
      height: 500,
      data: {
        nodes: [
          {
            id: 'node-1',
            style: { x: 50, y: 100 },
          },
          {
            id: 'node-2',
            style: { x: 150, y: 100 },
          },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    graph.render();
  }
}
```
