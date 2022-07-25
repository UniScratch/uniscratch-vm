const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuMzUgMTAuMDRDMTguNjcgNi41OSAxNS42NCA0IDEyIDQgOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2eiIvPjwvc3ZnPg==';
const menuIconURI = blockIconURI//'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA6kAAAJFCAMAAAAI8EHMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQCw8EbG9EvH9Ca88hO28WrR9pbe+Znf+XLT903I9WHO9ozb+GDO9oba+JHd+V7N9iG68krH9Ifa+Ce88kTF9GXP9o7c+DvC81/N9hK28UzI9ILY+A208Qey8B+68jPA8z/E9DjB8zK/84/c+HrW9wqz8VDJ9YXZ+JTe+ZLd+Zff+VPK9VjL9Rm48VnM9Sq98gay8Ivb+DG/83XU95Pe+Q608QOx8B258hG18SS78iC68jXA85Xe+Yja+Ci88hi38TrC843c+C6+80fG9GjQ9im98m7S9pDd+GPP9hq48ha38S2+82bQ9nbV90PF9HDT92TP9njV9yy+8x658jnC84TZ+H3X94HY+FzN9V3N9SO78n7X9z3D9IDY+DC/84rb+EnH9HTU93PU92fQ9nvW93HT91vM9UDE9BS28WzR9lbL9X/X9yu983fV91HJ9VrM9U7I9W3S9ona+FTK9TTA83zW9zbB80LE9GLO9kXF9FLJ9XnV9wuz8WnR9giy8DfB8yW78oPZ+GvR9gy08TzD9Bu48hy58pjf+VfL9UjG9AGw8A+18U/I9aDi+ajk+rjp+9fz/fj9/////9jz/dDw/Mvv/M/w/M3w/Nr0/er4/r/r+7rq+xC18fz+/9nz/fv+/+76/uv5/sXt/K3m+hW38ank+vP7/v3+/+P2/cTt/KLi+vL7/u/6/rvq+z7D9Kzl+r7r+/b8/gmz8cju/OL2/fX8/uH2/QWy8L3r++35/gSx8CK78t30/fn9/8nu/LLn+vr9/9Hx/EHE9J/h+Zvg+bPn+1XK9en4/rHn+srv/MHs+9Px/KXj+tXy/d/1/W/S97np+6rl+qvl+rfp+7Xo+8zv/Ob3/p3h+ff9//7//wKx8Jzg+Z7h+dv0/eX3/aPi+qbj+rbo+8Ls+6Hi+ef4/tby/Zrg+cDr+/D6/sPs+y+/88fu/NTy/OT3/fH7/he38bTo+6fk+q7m+tLx/OD1/ez5/uj4/rzq+/T8/q/m+rDn+tz0/d71/c7w/KTj+gAAALaUYOsAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAABcRAAAXEQHKJvM/AAAZs0lEQVR4Xu3du27q2N/GceJifAWWtVt7S5QUKLU738CuqKiD+4kU6fVF0HEBSP921SBRUO6aZgpLiMoSF/GuE2DAEJNwsMP3M6OJQzLZyYyf/NbZLQD19599CwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAfby8TH7ZSwC15bnS/w3IK1BzXt+Vf0uDiX0FQP289Lvyn5OXgdv/17wCoH5e+gP99tdL3/1PX7Va/02Cf/+lPQzUyEvfs1eTft9E9T8ZWslGGEANDLaB/OW5ExXV/37LkE4mgXyzKbIAHmywramtX64nm7yTF7dvBpcm8mKb1V+//mWAGHiYXU2VSe3KLAYyn6/mhRfX2wwIT7qqQSyjLNmXANzPXk2VSQ28/m/7vppufTFFNfjd//1vMFFTOr9/q/SSV+CuBv13ezV5d2Vog/7vwL4g87h5R1Zelc//fv123d8v8uql7/4evDBADNzJrvU76bvBa2EsWBn0VSzV+gib54nn9lV4X/r9wW81RNz/LfNKYIEb8/qDgeyXTiaDriqpxdaw9N4f6BTuCu2LuZSBlh/45cnKqvLKhA5wW54sizJq3b5rQimTaz6gvXq6grb6djhY9Vh161cGWr7ya6AzOhkU0w3g+nS7djJ4995N1dxPqnxXN389d1NTX7tdFVqZ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';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class HttpUnit {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
  }
  static get STATE_KEY () {
        return 'Scratch.HttpUnit';
    }
  getInfo() {
    return {
      id: 'HttpUnit',
      name: formatMessage({
                id: 'HttpUnit',
                default: 'Http模块',
                description:'允许您发送Http请求'
            }),/*'Http模块',*/
      blockIconURI : blockIconURI,
      menuIconURI : menuIconURI,
      blocks: [
        {
            opcode: 'SendGet',
            blockType: BlockType.REPORTER,
            text: 'GET [URL] 并返回',
            arguments: {
                URL: {
                    type: ArgumentType.STRING,
                    defaultValue: 'https://bbs.hydrog.org/'
                }
            }
        },
        {
            opcode: 'SendPost',
            blockType: BlockType.REPORTER,
            text: 'POST [URL] 以JSON参数 [JSONS] 并返回',
            arguments: {
                URL: {
                    type: ArgumentType.STRING,
                    defaultValue: 'https://bbs.hydrog.org/'
                },
                JSONS: {
                    type: ArgumentType.STRING,
                    defaultValue: "{'name':'value'}"
                }
            }
        },
        
      ]
    };
  }
  SendGet(args) {
    var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', args.URL, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var back = httpRequest.responseText;
                window.back = back;
            }
        };
    return back;
  }
  SendPost(args){
      var httpRequest = new XMLHttpRequest();
      httpRequest.open('POST',args.URL, true); 
      httpRequest.setRequestHeader("Content-type","application/json"); 
      httpRequest.send(JSON.stringify(args.JSONS));//发送请求 将json写入send中
      var back;
      httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
               back = httpRequest.responseText;//获取到服务端返回的数据
               window.back = back;
          }else{
               back = "ERROR : REQUEST FAILED";
               window.back = back;
          }
     };
     return back;
  }
}
module.exports = HttpUnit;

//Scratch.extensions.register(new StringUnitForUniscratch());
