import * as graphs from './intergration/index';

const SelectGraph = document.getElementById('select') as HTMLSelectElement;
let firstKey;
const Options = Object.keys(graphs).map((key, index) => {
  const option = document.createElement('option');
  if (index === 0) {
    firstKey = key;
  }
  option.value = key;
  option.textContent = key;
  return option;
});

SelectGraph.replaceChildren(...Options);

SelectGraph.onchange = (e) => {
  //@ts-ignore
  const { value } = e.target;
  console.log(value);
  history.pushState({ value }, '', `?name=${value}`);
  const container = document.getElementById('container');
  container.replaceChildren('');
  graphs[value]();
};
// 初始化
graphs[firstKey]();
