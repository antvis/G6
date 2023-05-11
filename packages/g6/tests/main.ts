import * as graphs from './intergration/index';

const SelectGraph = document.getElementById('select') as HTMLSelectElement;
const Options = Object.keys(graphs).map((key) => {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key;
  return option;
});

SelectGraph.replaceChildren(...Options);

SelectGraph.onchange = (e) => {
  //@ts-ignore
  const { value } = e.target;
  history.pushState({ value }, '', `?name=${value}`);
  const container = document.getElementById('container');
  container?.replaceChildren('');
  graphs[value]();
};

// 初始化
const params = new URL(location.href).searchParams;
const initialExampleName = params.get('name');
SelectGraph.value = initialExampleName || Options[0].value;
graphs[SelectGraph.value]();
