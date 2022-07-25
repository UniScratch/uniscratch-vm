/* eslint-disable camelcase */
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const CryptoJS = require('crypto-js');

const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuMzUgMTAuMDRDMTguNjcgNi41OSAxNS42NCA0IDEyIDQgOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2eiIvPjwvc3ZnPg==';

class Crypto {
    constructor (runtime) {
        this.runtime = runtime;
        this._mode = 'CBC';
        this._padding = 'Pkcs7';
    }
    static get STATE_KEY () {
        return 'crypto';
    }
    _getMode () {
        if (this._mode === 'CFB') {
            return CryptoJS.mode.CFB;
        } else if (this._mode === 'CTR') {
            return CryptoJS.mode.CTR;
        } else if (this._mode === 'OFB') {
            return CryptoJS.mode.OFB;
        } else if (this._mode === 'ECB') {
            return CryptoJS.mode.ECB;
        }
        return CryptoJS.mode.CBC;


    }
    _getPadding () {
        if (this._padding === 'Iso97971') {
            return CryptoJS.pad.Iso97971;
        } else if (this._padding === 'AnsiX923') {
            return CryptoJS.pad.AnsiX923;
        } else if (this._padding === 'Iso10126') {
            return CryptoJS.pad.Iso10126;
        } else if (this._padding === 'ZeroPadding') {
            return CryptoJS.pad.ZeroPadding;
        } else if (this._padding === 'NoPadding') {
            return CryptoJS.pad.NoPadding;
        }
        return CryptoJS.pad.Pkcs7;
    }
    getInfo () {
        return {
            id: 'crypto',
            name: 'Crypto',
            blocks: [
                {
                    opcode: 'setMode',
                    blockType: BlockType.COMMAND,
                    text: '设置模式 [MODE]',
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'mode',
                            defaultValue: 'CBC'
                        }
                    }
                },
                {
                    opcode: 'setPadding',
                    blockType: BlockType.COMMAND,
                    text: '设置填充 [PADDING]',
                    arguments: {
                        PADDING: {
                            type: ArgumentType.STRING,
                            menu: 'padding',
                            defaultValue: 'Pkcs7'
                        }
                    }
                },
                {
                    opcode: 'MD5',
                    blockType: BlockType.REPORTER,
                    text: 'MD5 [Message]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        }
                    }
                },
                {
                    opcode: 'SHA1',
                    blockType: BlockType.REPORTER,
                    text: 'SHA1 [Message]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        }
                    }
                },
                {
                    opcode: 'SHA256',
                    blockType: BlockType.REPORTER,
                    text: 'SHA256 [Message]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        }
                    }
                },
                {
                    opcode: 'SHA512',
                    blockType: BlockType.REPORTER,
                    text: 'SHA512 [Message]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        }
                    }
                },
                {
                    opcode: 'SHA3',
                    blockType: BlockType.REPORTER,
                    text: 'SHA3 [Message] 输出长度 [outputLength]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        outputLength: {
                            type: ArgumentType.NUMBER,
                            menu: 'SHA3outputLength',
                            defaultValue: '512'
                        }
                    }
                },
                {
                    opcode: 'RIPEMD160',
                    blockType: BlockType.REPORTER,
                    text: 'RIPEMD160 [Message]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        }
                    }
                },
                {
                    opcode: 'HmacMD5',
                    blockType: BlockType.REPORTER,
                    text: 'HmacMD5 [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'HmacSHA1',
                    blockType: BlockType.REPORTER,
                    text: 'HmacSHA1 [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'HmacSHA256',
                    blockType: BlockType.REPORTER,
                    text: 'HmacSHA256 [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'HmacSHA512',
                    blockType: BlockType.REPORTER,
                    text: 'HmacSHA512 [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'PBKDF2',
                    blockType: BlockType.REPORTER,
                    text: 'PBKDF2 [Key] 加盐 [Salt] 密钥大小 [keySize] 迭代次数 [iterations]',
                    arguments: {
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        },
                        Salt: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Salt'
                        },
                        keySize: {
                            type: ArgumentType.NUMBER,
                            menu: 'PBKDF2keySize',
                            defaultValue: '512'
                        },
                        iterations: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'AES_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'AES.encrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'AES_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'AES.decrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'DES_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'DES.encrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'DES_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'DES.decrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'TripleDES_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'TripleDES.encrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'TripleDES_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'TripleDES.decrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'Rabbit_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'Rabbit.encrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'Rabbit_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'Rabbit.decrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'RC4_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'RC4.encrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'RC4_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'RC4.decrypt [Message] 密钥 [Key]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        }
                    }
                },
                {
                    opcode: 'RC4Drop_encrypt',
                    blockType: BlockType.REPORTER,
                    text: 'RC4Drop.encrypt [Message] 公钥 [Key] 丢弃 [Drop]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        },
                        Drop: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '768'
                        }
                    }
                },
                {
                    opcode: 'RC4Drop_decrypt',
                    blockType: BlockType.REPORTER,
                    text: 'RC4Drop.decrypt [Message] 公钥 [Key] 丢弃 [Drop]',
                    arguments: {
                        Message: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Message'
                        },
                        Key: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Secret Passphrase'
                        },
                        Drop: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '768'
                        }
                    }
                }
            ],
            menus: {
                mode: ['CBC', 'CFB', 'CTR', 'OFB', 'ECB'],
                padding: ['Pkcs7', 'Iso97971', 'AnsiX923', 'Iso10126', 'ZeroPadding', 'NoPadding'],
                SHA3outputLength: ['512', '384', '256', '224'],
                PBKDF2keySize: ['512', '256', '128']
            }
        };
    }
    setMode (args) {
        this._mode = args.MODE;
    }
    setPadding (args) {
        this._padding = args.PADDING;
    }
    MD5 (args) {
        return CryptoJS.MD5(args.Message, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    SHA1 (args) {
        return CryptoJS.SHA1(args.Message, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    SHA256 (args) {
        return CryptoJS.SHA256(args.Message, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    SHA512 (args) {
        return CryptoJS.SHA512(args.Message, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    SHA3 (args) {
        return CryptoJS.SHA3(args.Message, {outputLength: args.outputLength, mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    RIPEMD160 (args) {
        return CryptoJS.RIPEMD160(args.Message, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    HmacMD5 (args) {
        return CryptoJS.HmacMD5(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    HmacSHA1 (args) {
        return CryptoJS.HmacSHA1(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    HmacSHA256 (args) {
        return CryptoJS.HmacSHA256(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    HmacSHA512 (args) {
        return CryptoJS.HmacSHA512(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    PBKDF2 (args) {
        return CryptoJS.PBKDF2(args.Key, args.Salt, {keySize: args.keySize, iterations: args.iterations, mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Hex);
    }
    AES_encrypt (args) {
        const cipher = CryptoJS.AES.encrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    AES_decrypt (args) {
        return CryptoJS.AES.decrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }
    DES_encrypt (args) {
        const cipher = CryptoJS.DES.encrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    DES_decrypt (args) {
        return CryptoJS.DES.decrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }
    TripleDES_encrypt (args) {
        const cipher = CryptoJS.TripleDES.encrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    TripleDES_decrypt (args) {
        return CryptoJS.TripleDES.decrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }
    Rabbit_encrypt (args) {
        const cipher = CryptoJS.Rabbit.encrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    Rabbit_decrypt (args) {
        return CryptoJS.Rabbit.decrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }
    RC4_encrypt (args) {
        const cipher = CryptoJS.RC4.encrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    RC4_decrypt (args) {
        return CryptoJS.RC4.decrypt(args.Message, args.Key, {mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }
    RC4Drop_encrypt (args) {
        const cipher = CryptoJS.RC4Drop.encrypt(args.Message, args.Key, {drop: args.Drop, mode: this._getMode(), padding: this._getPadding()});
        return cipher.formatter.stringify(cipher);
    }
    RC4Drop_decrypt (args) {
        return CryptoJS.RC4Drop.decrypt(args.Message, args.Key, {drop: args.Drop, mode: this._getMode(), padding: this._getPadding()}).toString(CryptoJS.enc.Utf8);
    }

}
module.exports = Crypto;
