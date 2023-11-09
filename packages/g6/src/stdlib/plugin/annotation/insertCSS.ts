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
        }
        .g6-annotation-header-wapper {
            padding: 4px 8px;
            background-color: #5B8FF9;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            user-select: none;
        }
        .g6-annotation-title {
            cursor: text;
            min-width: 32px;
            user-select: text;
            margin: 0 30px 0 0;
            word-break: break-all;
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
            margin: 16px 0;
            padding: 0 8px;
            width: fit-content;
            cursor: text;
            word-break: break-all;
            min-width: 32px;
            overflow: auto;
        }
        .g6-annotation-title-input-wrapper {
            min-width: 32px;
            margin: 0 10px 0 0;
            flex: 1 1 auto;
        }
        .g6-annotation-title-input, .g6-annotation-content-input {
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            word-break: break-all;
            padding: 4px;
        }
        .g6-annotation-content-input-wrapper {
            min-width: 32px;
            margin: 16px 0;
            padding: 0 8px;
            box-sizing: border-box;
        }
    `);
}