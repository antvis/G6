import{o as e}from"./src.RzVD1Zqa.js";var t={error:`&#10060;`,overload:`&#9889;`,running:`&#9989;`},n={error:`#f5222d`,overload:`#faad14`,running:`#52c41a`};new e({container:`container`,data:{nodes:[{id:`node-1`,data:{location:`East`,status:`error`,ip:`192.168.1.2`}},{id:`node-2`,data:{location:`West`,status:`overload`,ip:`192.168.1.3`}},{id:`node-3`,data:{location:`South`,status:`running`,ip:`192.168.1.4`}}]},node:{type:`html`,style:{size:[240,80],dx:-120,dy:-40,innerHTML:e=>{let{data:{location:r,status:i,ip:a}}=e,o=n[i];return`
<div 
  style="
    width:100%; 
    height: 100%; 
    background: ${o}bb; 
    border: 1px solid ${o};
    color: #fff;
    user-select: none;
    display: flex; 
    padding: 10px;
    "
>
  <div style="display: flex;flex-direction: column;flex: 1;">
    <div style="font-weight: bold;">
      ${r} Node
    </div>
    <div>
      status: ${i} ${t[i]}
    </div>
  </div>
  <div>
    <span style="border: 1px solid white; padding: 2px;">
      ${a}
    </span>
  </div>
</div>`}}},layout:{type:`grid`},behaviors:[`drag-element`,`zoom-canvas`]}).render();