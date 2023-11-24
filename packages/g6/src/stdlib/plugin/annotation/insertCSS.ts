import insertCss from 'insert-css';
export function insertCSS() {
  typeof document !== 'undefined' &&
    insertCss(`
        .g6-annotation-container {
            background-color: rgba(255, 255, 255, 0.3);
            padding: 8px;
        }
        .g6-annotation-wrapper {
            background-color: #fff;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.85);
            display: flex;
            flex-direction: column;
            border-radius: 2px;
            position: absolute;
            /* font-family reference ant-design: ttps://ant.design/docs/spec/font */
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
        }
        .g6-annotation-wrapper-hide {
            display: none;
        }
        .g6-annotation-wrapper-move {
            background-color: rgba(255,255,255, 0.8);
            z-index: 10;
        }
        .g6-annotation-wrapper-collapsed .g6-annotation-header-wrapper {
            border-radius: inherit;
        }
        .g6-annotation-wrapper-collapsed .g6-annotation-content {
            display: none;
        }
        .g6-annotation-wrapper-collapsed .g6-annotation-content-input-wrapper {
            display: none;
        }
        
        .g6-annotation-wrapper-move .g6-annotation-header-wrapper {
            background-color: rgb(91,143,249, 0.8);
        }

        .g6-annotation-header-wrapper {
            padding: 4px;
            background-color: rgb(91,143,249);
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            user-select: none;
            border-radius: 2px 2px 0 0;
        }
        .g6-annotation-title {
            cursor: text;
            user-select: text;
            margin: 0 10px 0 0;
            word-break: break-all;
            padding: 0 4px;
            min-height: 1em;
        }
        .g6-annotation-header-btns {
            display: inline-flex;
            align-items: center;
            column-gap: 2px;
        }
        .g6-annotation-collapse, .g6-annotation-expand, .g6-annotation-close {
            cursor: pointer;
            margin: 0;
            width: 1em;
            text-align: center;
        }
        .g6-annotation-content {
            margin: 12px 4px;
            padding: 0 4px;
            cursor: text;
            word-break: break-all;
            overflow: auto;
            white-space: pre-wrap;
            font-size: 14px;
            flex: 1 1 auto;
        }

        .g6-annotation-wrapper-editable .g6-annotation-title:focus, .g6-annotation-wrapper-editable .g6-annotation-content:focus {
            outline: 2px dashed #ccc;
        }

        .g6-annotation-title-input-wrapper {
            margin: 0 10px 0 0;
            flex: 1 1 auto;
            display: inline-flex;
        }
        .g6-annotation-content-input-wrapper {
            margin: 12px 0;
            padding: 0 4px;
            box-sizing: border-box;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
        }
        .g6-annotation-input {
            border: 1px solid #d9d9d9;
            font-size: 14px;
            box-sizing: border-box;
            word-break: break-all;
            font-family: inherit;
        }
        .g6-annotation-input:placeholder {
            color: #95999e;
        }
        .g6-annotation-title-input, .g6-annotation-content-input {
            min-width: 32px;
            width: 100%;
            padding: 0 3px;
            flex: 1 1 auto;
            max-width: 100%;
        }
    `);
}
