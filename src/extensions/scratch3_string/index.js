const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuMzUgMTAuMDRDMTguNjcgNi41OSAxNS42NCA0IDEyIDQgOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2eiIvPjwvc3ZnPg==';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class StringUnit {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        //this.runtime.on('PROJECT_START', this._init.bind(this));
    }
    static get STATE_KEY() {
        return 'StringUnit';
    }
    getInfo() {
        return {
            id: 'string',
            name: '字符串处理模块',
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
                            defaultValue: '我叫UniScratch，我喜欢生草！'
                        },
                        TWO: {
                            type: ArgumentType.STRING,
                            defaultValue: '我'
                        },
                        THREE: {
                            type: ArgumentType.STRING,
                            defaultValue: '没有人'
                        }
                    }
                }
            ]
        };
    }
    GetASCII(args) {
        var char = args.CH;
        if (char.length == 1) {
            var ascii = char.charCodeAt();
        } else {
            return 'ERROR: Argument must be char!';
        }
        return ascii;
    }
    GetChar(args) {
        var code = args.CODE;
        var char = String.fromCharCode(code);
        return char;
    }
    GetStrStart(args) {
        var longstr = args.TWO;
        try {
            var position = longstr.search(args.ONE);
        } catch (err) {
            return 'ERROR: No further information.';
        }
        return position;
    }
    ReplaceStr(args) {
        var longstr = args.ONE;
        try {
            var str = longstr.replace(args.TWO, args.THREE);
        } catch (err) {
            return 'ERROR: No further information.'
        }
        return str;
    }
}
module.exports = StringUnit;

//extensions.register(new StringUnitForUniscratch());