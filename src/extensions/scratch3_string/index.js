/* eslint-disable max-len */
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuMzUgMTAuMDRDMTguNjcgNi41OSAxNS42NCA0IDEyIDQgOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2eiIvPjwvc3ZnPg==';
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMTA3LjEgNTYuNWgtNi45VjM3LjhjMC01LTQuNC05LjQtOS40LTkuNEg3Mi4xdi03LjVDNzEuNSAxNCA2NS45IDkgNTkuNiA5Yy02LjkgMC0xMS45IDUtMTEuOSAxMS45djYuOUgyOWMtNS42IDAtMTAgNC40LTEwIDEwdjE4LjFoNi45QzMyLjggNTUuOSAzOSA2MS41IDM5IDY5YzAgNi45LTUuNiAxMy4xLTEzLjEgMTMuMUgxOXYxOC4xYzAgNC40IDQuNCA4LjggOS40IDguOGgxOC4xdi02LjljMC02LjkgNS42LTEzLjEgMTMuMS0xMy4xIDYuOSAwIDEzLjEgNS42IDEzLjEgMTMuMXY2LjloMTguMWM1IDAgOS40LTQuNCA5LjQtOS40VjgwLjloNi45YzYuOSAwIDExLjktNSAxMS45LTExLjkgMC03LjUtNS0xMi41LTExLjktMTIuNXpNNjUuNyA4Mi4zaC01LjVjLTEwLjIgMC0xNC43LTUuMi0xNS4xLTUuN2w2LjgtNi42Yy4xLjEgMi40IDIuNiA4LjMgMi42aDEuM2MzIDAgNi4yLS40IDYuMi0yLjEgMC0xLjktNS4yLTIuOC03LjctMy4xLTMuMS0uNC02LjMtLjktOS4xLTIuMi0xLjgtLjktMy4zLTIuMS00LjMtMy42LTEuMi0xLjctMS44LTMuNy0xLjgtNS45IDAtNy4yIDcuMy0xMS45IDE3LjktMTEuOWgxLjhjNi4yIDAgMTEuMyAyLjUgMTUuNCA3LjJsLTYuNyA2LjVjLTIuMi0yLjctNC45LTMuOS04LjUtMy45aC0uNGMtMS45IDAtNi4yLS40LTYuMiAyLjEgMCAxLjggNC45IDIuNiA3LjQgMi45IDMuMS40IDYuNSAxIDkuMiAyLjIgMS44LjkgMy4zIDIuMSA0LjQgMy43IDEuMSAxLjcgMS44IDMuOCAxLjggNi4xIDAgOS45LTExLjMgMTEuNy0xNS4yIDExLjd6IiBmaWxsPSIjZmZmIi8+PC9zdmc+';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class StringUnit {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        // this.runtime.on('PROJECT_START', this._init.bind(this));
    }
    static get STATE_KEY () {
        return 'StringUnit';
    }
    getInfo () {
        return {
            id: 'string',
            name: '字符串处理',
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'GetASCII',
                    blockType: BlockType.REPORTER,
                    text: '获取字符 [CH] 的ASCII',
                    arguments: {
                        CH: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'GetChar',
                    blockType: BlockType.REPORTER,
                    text: '获取ASCII [CODE] 的字符',
                    arguments: {
                        CODE: {
                            type: ArgumentType.STRING,
                            defaultValue: '65'
                        }
                    }
                },
                {
                    opcode: 'GetStrStart',
                    blockType: BlockType.REPORTER,
                    text: '获取字符串 [ONE] 在字符串 [TWO] 的位置',
                    arguments: {
                        ONE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UniScratch'
                        },
                        TWO: {
                            type: ArgumentType.STRING,
                            defaultValue: 'I love UniScratch!'
                        }
                    }
                },
                {
                    opcode: 'ReplaceStr',
                    blockType: BlockType.REPORTER,
                    text: '将 [ONE] 中的字符串 [TWO] 替换为 [THREE]',
                    arguments: {
                        ONE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UniScratch Team'
                        },
                        TWO: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Team'
                        },
                        THREE: {
                            type: ArgumentType.STRING,
                            defaultValue: '团队'
                        }
                    }
                }
            ]
        };
    }
    GetASCII (args) {
        const char = args.CH;
        if (char.length === 1) {
            return char.charCodeAt();
        }
        return '错误：参数必须是 1 个字符';
    }
    GetChar (args) {
        const code = args.CODE;
        const char = String.fromCharCode(code);
        return char;
    }
    GetStrStart (args) {
        const longstr = args.TWO;
        try {
            const position = longstr.search(args.ONE);
            return position;
        } catch (err) {
            return '错误：无进一步信息';
        }
    }
    ReplaceStr (args) {
        const longstr = args.ONE;
        try {
            const str = longstr.replace(args.TWO, args.THREE);
            return str;
        } catch (err) {
            return '错误：无进一步信息';
        }
    }
}
module.exports = StringUnit;

// extensions.register(new StringUnitForUniscratch());
