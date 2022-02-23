const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuMzUgMTAuMDRDMTguNjcgNi41OSAxNS42NCA0IDEyIDQgOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2eiIvPjwvc3ZnPg==';
const menuIconURI = blockIconURI;//'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA6kAAAJFCAMAAAAI8EHMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ8UExURabTb6vVdrrdkMvlq9frvefz1+724+735PX67u/35er03ebz1t7vydXqvM3mrsLhnLHZgajUcrDYgMPhntDos9zux+z24fL56/X67/n89fv9+Pz++v7+/f3+/PD45+/35On02+Lx0Nvtxc/nscHgm7PahNPpuOPx0vf78f///+Px0dTqusfjpbncja/XfbfbisHgmtLpt+DwzfH46fb78NnswrDYf6zWeKzWebTahtTque324ufz2cTin6nVdbXah9jswPr99+HwzrjcjKjUc/L46vr9+P7//ufz2KfUca/YftDosuj02rrdj7LZgtXqu/T57dvtxPn89rvdkarVdrzek+z24MzmrN7vyr7fl/T67dHota7XfdbrvMnkp6vVd8nkqPP57Mrlqr7fluLx0anUdLPZg73elO73487nsObz19frv/f788TioKfTcKvWd6/XfrvdkLXbiK7Xe93uycbjos7nsdHotNrtw+by1vz9+en03Ojz2bbbivj89N/vzMbjo8Dgmb7flcXiodLptrncjt/vy8jkpvD35r/fl+r13b/gmODvzK3Xe63Weuv13+v13rbbicjkpbPZhMfjpM/nsqrVdfb78cPhndjrv9brvbTaher13rfci+/35tnswfH46MXjorLZg9Ppt8vlqsLhneTy1Pj78////t3uyM3mr+Xy1bbbiPr899rtxPz9+tzuxv3++7HYgOHwz6nVdN/vyq7XfPf78vP567vekbzeku324dfrvszmrcbjpMrlqfL56rjcjb/fmPv9+abTcNHptdrsw+DvzeTy073flc7nr8vmq/b68Pb677fbi/j89f3+/fL46fb68QAAAIZF1TUAAADUdFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////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';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class StringUnit{
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        //this.runtime.on('PROJECT_START', this._init.bind(this));
    }
    static get STATE_KEY () {
        return 'Scratch.StringUnit';
    }
    getInfo(){
        return{
            id:'StringUnit',
            name:'字符串处理模块',
            blocks:[
                {
                    opcode: 'GetASCII',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取字符 [CH] 的ASCII',
                    arguments: {
                        CH: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'GetChar',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取ASCII [CODE] 的字符',
                    arguments: {
                        ASCII: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '65'
                        }
                    }
                },
                {
                    opcode: 'GetStrStart',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取字符串 [ONE] 在字符串 [TWO] 的位置',
                    arguments: {
                        ONE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'UniScratch'
                        },
                        TWO: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'I love UniScratch!'
                        }
                    }
                },
                {
                    opcode: 'ReplaceStr',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [ONE] 中的字符串 [TWO] 替换为 [THREE]',
                    arguments: {
                        ONE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '我叫UniScratch，我喜欢生草！'
                        },
                        TWO: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '我'
                        },
                        THREE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '没有人'
                        }
                    }
                },
                {
                    opcode: 'GenMD5',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '生成字符串 [STR] 的MD5指纹',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '我叫字符串'
                        }
                    }
                }
            ]
        };
    }
    GetASCII(args){
        var char=arg.CH;
        if(char.length== 1){
            var ascii = char.charCodeAt();
        }else{
            return 'ERROR: Argument must be char!';
        }
        return ascii;
    }
    GetChar(args){
        var code = arg.CODE;
        var char=string.fromCharCode(code);
        return char;
    }
    GetStrStart(args){
        var longstr=arg.TWO;
        try{
            var position = longstr.search(arg.ONE);
        }catch(err){
            return 'ERROR: No further information.';
        }
        return position;
    }
    ReplaceStr(args){
        var longstr = arg.ONE;
        try{
            var str= longstr.replace(arg.TWO,arg.THREE);
        }catch(err){
            return 'ERROR: No further information.'
        }
        return str;
    }
    GenMD5(args){
        /*
        * JavaScript MD5
        * https://github.com/blueimp/JavaScript-MD5
        *
        * Copyright 2011, Sebastian Tschan
        * https://blueimp.net
        *
        * Licensed under the MIT license:
        * https://opensource.org/licenses/MIT
        *
        * Based on
        * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
        * Digest Algorithm, as defined in RFC 1321.
        * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
        * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
        * Distributed under the BSD License
        * See http://pajhome.org.uk/crypt/md5 for more info.
        */

        /* global define */


        (function($)
        {
            'use strict'

            /*
            * Add integers, wrapping at 2^32. This uses 16-bit operations internally
            * to work around bugs in some JS interpreters.
            */
            function safeAdd(x, y)
            {
                var lsw = (x & 0xffff) + (y & 0xffff)
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
                return (msw << 16) | (lsw & 0xffff)
            }

            /*
            * Bitwise rotate a 32-bit number to the left.
            */
            function bitRotateLeft(num, cnt)
            {
                return (num << cnt) | (num >>> (32 - cnt))
            }

            /*
            * These functions implement the four basic operations the algorithm uses.
            */
            function md5cmn(q, a, b, x, s, t)
            {
                return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
            }

            function md5ff(a, b, c, d, x, s, t)
            {
                return md5cmn((b & c) | (~b & d), a, b, x, s, t)
            }

            function md5gg(a, b, c, d, x, s, t)
            {
                return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
            }

            function md5hh(a, b, c, d, x, s, t)
            {
                return md5cmn(b ^ c ^ d, a, b, x, s, t)
            }

            function md5ii(a, b, c, d, x, s, t)
            {
                return md5cmn(c ^ (b | ~d), a, b, x, s, t)
            }

            /*
            * Calculate the MD5 of an array of little-endian words, and a bit length.
            */
            function binlMD5(x, len)
            {
                /* append padding */
                x[len >> 5] |= 0x80 << (len % 32)
                x[((len + 64) >>> 9 << 4) + 14] = len

                var i
                var olda
                var oldb
                var oldc
                var oldd
                var a = 1732584193
                var b = -271733879
                var c = -1732584194
                var d = 271733878

                for (i = 0; i < x.length; i += 16)
                {
                    olda = a
                    oldb = b
                    oldc = c
                    oldd = d

                    a = md5ff(a, b, c, d, x[i], 7, - 680876936)
                    d = md5ff(d, a, b, c, x[i + 1], 12, - 389564586)
                    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
                    b = md5ff(b, c, d, a, x[i + 3], 22, - 1044525330)
                    a = md5ff(a, b, c, d, x[i + 4], 7, - 176418897)
                    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
                    c = md5ff(c, d, a, b, x[i + 6], 17, - 1473231341)
                    b = md5ff(b, c, d, a, x[i + 7], 22, - 45705983)
                    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
                    d = md5ff(d, a, b, c, x[i + 9], 12, - 1958414417)
                    c = md5ff(c, d, a, b, x[i + 10], 17, - 42063)
                    b = md5ff(b, c, d, a, x[i + 11], 22, - 1990404162)
                    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
                    d = md5ff(d, a, b, c, x[i + 13], 12, - 40341101)
                    c = md5ff(c, d, a, b, x[i + 14], 17, - 1502002290)
                    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

                    a = md5gg(a, b, c, d, x[i + 1], 5, - 165796510)
                    d = md5gg(d, a, b, c, x[i + 6], 9, - 1069501632)
                    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
                    b = md5gg(b, c, d, a, x[i], 20, - 373897302)
                    a = md5gg(a, b, c, d, x[i + 5], 5, - 701558691)
                    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
                    c = md5gg(c, d, a, b, x[i + 15], 14, - 660478335)
                    b = md5gg(b, c, d, a, x[i + 4], 20, - 405537848)
                    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
                    d = md5gg(d, a, b, c, x[i + 14], 9, - 1019803690)
                    c = md5gg(c, d, a, b, x[i + 3], 14, - 187363961)
                    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
                    a = md5gg(a, b, c, d, x[i + 13], 5, - 1444681467)
                    d = md5gg(d, a, b, c, x[i + 2], 9, - 51403784)
                    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
                    b = md5gg(b, c, d, a, x[i + 12], 20, - 1926607734)

                    a = md5hh(a, b, c, d, x[i + 5], 4, - 378558)
                    d = md5hh(d, a, b, c, x[i + 8], 11, - 2022574463)
                    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
                    b = md5hh(b, c, d, a, x[i + 14], 23, - 35309556)
                    a = md5hh(a, b, c, d, x[i + 1], 4, - 1530992060)
                    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
                    c = md5hh(c, d, a, b, x[i + 7], 16, - 155497632)
                    b = md5hh(b, c, d, a, x[i + 10], 23, - 1094730640)
                    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
                    d = md5hh(d, a, b, c, x[i], 11, - 358537222)
                    c = md5hh(c, d, a, b, x[i + 3], 16, - 722521979)
                    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
                    a = md5hh(a, b, c, d, x[i + 9], 4, - 640364487)
                    d = md5hh(d, a, b, c, x[i + 12], 11, - 421815835)
                    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
                    b = md5hh(b, c, d, a, x[i + 2], 23, - 995338651)

                    a = md5ii(a, b, c, d, x[i], 6, - 198630844)
                    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
                    c = md5ii(c, d, a, b, x[i + 14], 15, - 1416354905)
                    b = md5ii(b, c, d, a, x[i + 5], 21, - 57434055)
                    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
                    d = md5ii(d, a, b, c, x[i + 3], 10, - 1894986606)
                    c = md5ii(c, d, a, b, x[i + 10], 15, - 1051523)
                    b = md5ii(b, c, d, a, x[i + 1], 21, - 2054922799)
                    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
                    d = md5ii(d, a, b, c, x[i + 15], 10, - 30611744)
                    c = md5ii(c, d, a, b, x[i + 6], 15, - 1560198380)
                    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
                    a = md5ii(a, b, c, d, x[i + 4], 6, - 145523070)
                    d = md5ii(d, a, b, c, x[i + 11], 10, - 1120210379)
                    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
                    b = md5ii(b, c, d, a, x[i + 9], 21, - 343485551)

                    a = safeAdd(a, olda)
                    b = safeAdd(b, oldb)
                    c = safeAdd(c, oldc)
                    d = safeAdd(d, oldd)
                }
                return [a, b, c, d]
            }

            /*
            * Convert an array of little-endian words to a string
            */
            function binl2rstr(input)
            {
                var i
                var output = '';
                var length32 = input.length * 32;
                for (i = 0; i < length32; i += 8)
                {
                    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
                }
                return output
            }

            /*
            * Convert a raw string to an array of little-endian words
            * Characters >255 have their high-byte silently ignored.
            */
            function rstr2binl(input)
            {
                var i
                var output = []
                output[(input.length >> 2) - 1] = undefined
                for (i = 0; i < output.length; i += 1)
                {
                    output[i] = 0
                }
                var length8 = input.length * 8
                for (i = 0; i < length8; i += 8)
                {
                    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
                }
                return output
            }

            /*
            * Calculate the MD5 of a raw string
            */
            function rstrMD5(s)
            {
                return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
            }

            /*
            * Calculate the HMAC-MD5, of a key and some data (raw strings)
            */
            function rstrHMACMD5(key, data)
            {
                var i
                var bkey = rstr2binl(key)
                var ipad = []
                var opad = []
                var hash
                ipad[15] = opad[15] = undefined
                if (bkey.length > 16)
                {
                    bkey = binlMD5(bkey, key.length * 8)
                }
                for (i = 0; i < 16; i += 1)
                {
                    ipad[i] = bkey[i] ^ 0x36363636
                    opad[i] = bkey[i] ^ 0x5c5c5c5c
                }
                hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
                return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
            }

            /*
            * Convert a raw string to a hex string
            */
            function rstr2hex(input)
            {
                var hexTab = '0123456789abcdef'
                var output = ''
                var x
                var i
                for (i = 0; i < input.length; i += 1)
                {
                    x = input.charCodeAt(i)
                    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
                }
                return output
            }

            /*
            * Encode a string as utf-8
            */
            function str2rstrUTF8(input)
            {
                return unescape(encodeURIComponent(input))
            }

            /*
            * Take string arguments and return either raw or hex encoded strings
            */
            function rawMD5(s)
            {
                return rstrMD5(str2rstrUTF8(s))
            }

            function hexMD5(s)
            {
                return rstr2hex(rawMD5(s))
            }

            function rawHMACMD5(k, d)
            {
                return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
            }

            function hexHMACMD5(k, d)
            {
                return rstr2hex(rawHMACMD5(k, d))
            }

            function md5(string, key, raw)
            {
                if (!key)
                {
                    if (!raw)
                    {
                        return hexMD5(string)
                    }
                    return rawMD5(string)
                }
                if (!raw)
                {
                    return hexHMACMD5(key, string)
                }
                return rawHMACMD5(key, string)
            }

            if (typeof define === 'function' && define.amd)
            {
                define(function()
                {
                    return md5
                })
            }
            else if (typeof module === 'object' && module.exports)
            {
                module.exports = md5
            }
            else
            {
                $.md5 = md5
            }
        })(this)
        
        return  md5(arg.STR);
        
    }
}
module.exports = StringUnit;

//Scratch.extensions.register(new StringUnitForUniscratch());