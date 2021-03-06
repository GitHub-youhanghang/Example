function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}


/*dom*/
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


  // 判断obj是否有此class
  function hasClass(obj,cls){  //class位于单词边界
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
   }

      //给 obj添加class
  function addClass(obj,cls){ 
    if(!this.hasClass(obj,cls)){ 
       obj.className += cls;
    }
  }
  //移除obj对应的class
  function removeClass(obj,cls){ 
    if(hasClass(obj,cls)){ 
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
         obj.className = obj.className.replace(reg,'');
    }
  }



//获取元素的兄弟节点
function siblings(o) { //参数o就是想取谁的兄弟节点，就把那个元素传进去
    var a = []; //定义一个数组，用来存储o的兄弟元素
    //previousSibling返回位于相同节点树层级的前一个元素
    var p = o.previousSibling;
    while (p) { //先取o的前面的兄弟元素 判断有没有上一个兄弟元素，如果有则往下执行，p表示previousSibling
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling //最后把上一个节点赋给p
    }
    a.reverse(); //把顺序反转一下，这样元素的顺序就是按先后的了
    //nextSibling返回位于相同节点树层级的下一个节点
    var n = o.nextSibling; //再取o下面的兄弟元素
    while (n) { //判断有没有下一个兄弟结点，n是nextSibling的意思
        if (n.nodeType === 1) { //判断是否是元素节点
            a.push(n);
        }
        n = n.nextSibling;
    }
    return a //最后按从老大到老小的顺序，把这一组元素返回
}


function getClassName(ParentId, NewClassName) {
    var AllClassElem = ParentId.getElementsByTagName("*");
    var AllClass = [];
    var i = 0;
    for (var i = 0; i < AllClassElem.length; i++) {
        if (AllClassElem[i].className == NewClassName) {
            AllClass.push(AllClassElem[i]);
        }
    }
    return AllClass;
}
//用法：
// var PElementId=document.getElementById("bar");
// var  buttons = getClassName(PElementId,"sco");
//取id="bar"下class="sco"的元素；

/**
 * 获取指定类名的元素对象集合
 * @param {Object} node 父节点
 * @param {String} classname 指定类名 
 * @return {[Object]}目标对象集合
 */

   function getElementsByClassName(className){ 
    var classArr = [];
    var tags = document.getElementsByTagName('*');
    for(var item in tags){ 
      if(tags[item].nodeType == 1){ 
        if(tags[item].getAttribute('class') == className){ 
          classArr.push(tags[item]);
        }
      }
    }
    return classArr; //返回
  }
// function getElementsByClassName(node, classname) {
//     //如果浏览器支持则直接使用
//     if (node.getElementsByClassName) {
//         return node.getElementsByClassName(classname);
//     } else {
//         return (function getElementsByClassName(searchClass, node) {
//             if (node == null)
//                 node = document;
//             var classElements = [],
//                 els = node.getElementsByTagName("*"),
//                 elsLen = els.length,
//                 pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"),
//                 i, j;

//             for (i = 0, j = 0; i < elsLen; i++) {
//                 if (pattern.test(els[i].className)) {
//                     classElements[j] = els[i];
//                     j++;
//                 }
//             }
//             return classElements;
//         })(classname, node);
//     }
// }

/**
 * 获取下一个元素结点
 * @param {Object} node  兄结点
 * @return {Object || null}下一个元素结点或未获取到
 */
function getNextElement(node) {
    var sibNode = node.nextSibling;
    if (sibNode.nodeType == 1) {
        return node;
    }
    if (sibNode.nextSibling) {
        //递归调用
        return getNextElement(node.nextSibling);
    }
    return null;
}

//获得偏移量 有点问题没搞明白，先别用
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

//获得视口大小
function getViewport() {
    if (document.compatMode == "BackCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

//元素在页面中相对于视口的位置
function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect) {
        if (typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}
//原生js实现jquery函数animate()动画效果的简单实例   
//注意，在ie下运行的时候，例如想让宽度有动画效果，如果css没有指定宽度，那么该方法运行不了，谷歌可以
function animate(obj, json, interval, sp, fn) {
  clearInterval(obj.timer);
  //var k = 0;
  //var j = 0;
  function getStyle(obj, arr) {
    if(obj.currentStyle){
      return obj.currentStyle[arr];  //针对ie
    } else {
      return document.defaultView.getComputedStyle(obj, null)[arr]; 
    }
  }
  obj.timer = setInterval(function(){
    //j ++;
    var flag = true;
    for(var arr in json) {
      var icur = 0;
      //k++;
      if(arr == "opacity") {
        icur = Math.round(parseFloat(getStyle(obj, arr))*100);
      } else {
        icur = parseInt(getStyle(obj, arr));
      }
      var speed = (json[arr] - icur) * sp;
      speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
      if(icur != json[arr]){
        flag = false;
      } 
      if(arr == "opacity"){
        obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
        obj.style.opacity = (icur + speed)/100;
      }else {
        obj.style[arr] = icur + speed + "px";
      }
      //console.log(j + "," + arr +":"+ flag);
    }

    if(flag){
      clearInterval(obj.timer);
      //console.log(j + ":" + flag); 
      //console.log("k = " + k);
      //console.log("j = " + j);
      //console.log("DONE");
      if(fn){
        fn();
      }
    }
  },interval);
}

// 调用方式：
// <script>
//   var move = document.getElementById("move").getElementsByTagName("li");
//   for(var i = 0; i < move.length; i ++){
//     move[i].onmouseover = function(){
//       var _this = this;
//       animate(_this, {width: 500, height: 200},10, 0.01, function(){
//         animate(_this, {width: 300, height: 200},10, 0.01);
//       });

//     }
//   }








// function animate(obj,json,fn){
//         function getStyle(obj,attr){
//         if(obj.currentStyle){
//             return obj.currentStyle[attr];
//         }else
//         {
//             return getComputedStyle(obj,false)[attr];
//         }

//         }

//         var flag=true;
//         clearInterval(obj.timer);
//         obj.timer=setInterval(function(){
//             for(var attr in json){
//                 var icur=0;
//                 if(attr=='opacity'){
//                     icur=Math.round(parseFloat(getStyle(obj,attr))*100);
//                 }else{
//                     icur=parseInt(getStyle(obj,attr));
//                 }
//                 var speed=(json[attr]-icur)/8;
//                 speed=speed<0?Math.floor(speed):Math.ceil(speed);
//                 if(icur!=json[attr]){
//                     flag=false;
//                 }else if(icur==json[attr]){
//                     flag=true;
//                     //这里是必须要判断的，这样，第一个值达到目标，flag被改为了true，
//                     //for循环第二个值时，如果未达标，依然会再次把flag设为flase.
//                 }
//                 if(attr=='opacity'){
//                     obj.style[attr]=(icur+speed)/100;
//                 }else{
//                     obj.style[attr]=icur+speed+'px';
//                 }
//                 if(flag){
//                     clearInterval(obj.timer);
//                 if(fn){
//                     fn();
//                 }
//             }
//         }
//     },20)
//     }

// </script>
//   不错的JS验证~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 用途：校验ip地址的格式 
// 输入：strIP：ip地址 
// 返回：如果通过验证返回true,否则返回false； 


function isIP(strIP) {
    if (isNull(strIP)) return false;
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
    if (re.test(strIP)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}

/* 
用途：检查输入字符串是否为空或者全部都是空格 
输入：str 
返回： 
如果全是空返回true,否则返回false 
*/
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}


/* 
用途：检查输入对象的值是否符合整数格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isInteger(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
}

/* 
用途：检查输入手机号码是否正确 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkMobile(s) {
    var regu = /^[1][3][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}


/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isNumber(s) {
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}

/* 
用途：检查输入字符串是否是带小数的数字格式,可以是负数 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isDecimal(str) {
    if (isInteger(str)) return true;
    var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
    if (re.test(str)) {
        if (RegExp.$1 == 0 && RegExp.$2 == 0) return false;
        return true;
    } else {
        return false;
    }
}

/* 
用途：检查输入对象的值是否符合端口号格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isPort(str) {
    return (isNumber(str) && str < 65536);
}

/* 
用途：检查输入对象的值是否符合E-Mail格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isEmail(str) {
    var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(str)) return true;
    return false;
}

/* 
用途：检查输入字符串是否符合金额格式 
格式定义为带小数的正数，小数点后最多三位 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isMoney(s) {
    var regu = "^[0-9]+[\.][0-9]{0,3}$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由英文字母和数字和下划线组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isNumberOr_Letter(s) { //判断是否是数字或字母 

    var regu = "^[0-9a-zA-Z\_]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isNumberOrLetter(s) { //判断是否是数字或字母 

    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/* 
用途：检查输入字符串是否只由汉字、字母、数字组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function isChinaOrNumbOrLett(s) { //判断是否是汉字、字母、数字组成 

    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}

/* 
用途：判断是否是日期 
输入：date：日期；fmt：日期格式 
返回：如果通过验证返回true,否则返回false 
*/
function isDate(date, fmt) {
    if (fmt == null) fmt = "yyyyMMdd";
    var yIndex = fmt.indexOf("yyyy");
    if (yIndex == -1) return false;
    var year = date.substring(yIndex, yIndex + 4);
    var mIndex = fmt.indexOf("MM");
    if (mIndex == -1) return false;
    var month = date.substring(mIndex, mIndex + 2);
    var dIndex = fmt.indexOf("dd");
    if (dIndex == -1) return false;
    var day = date.substring(dIndex, dIndex + 2);
    if (!isNumber(year) || year > "2100" || year < "1900") return false;
    if (!isNumber(month) || month > "12" || month < "01") return false;
    if (day > getMaxDay(year, month) || day < "01") return false;
    return true;
}

function getMaxDay(year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11)
        return "30";
    if (month == 2)
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
            return "29";
        else
            return "28";
    return "31";
}

/* 
用途：字符1是否以字符串2结束 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isLastMatch(str1, str2) {
    var index = str1.lastIndexOf(str2);
    if (str1.length == index + str2.length) return true;
    return false;
}


/* 
用途：字符1是否以字符串2开始 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isFirstMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == 0) return true;
    return false;
}

/* 
用途：字符1是包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/
function isMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == -1) return false;
    return true;
}


/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkTwoDate(startDate, endDate) {
    if (!isDate(startDate)) {
        alert("起始日期不正确!");
        return false;
    } else if (!isDate(endDate)) {
        alert("终止日期不正确!");
        return false;
    } else if (startDate > endDate) {
        alert("起始日期不能大于终止日期!");
        return false;
    }
    return true;
}

/* 
用途：检查输入的Email信箱格式是否正确 
输入： 
strEmail：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkEmail(strEmail) {
    //var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (emailReg.test(strEmail)) {
        return true;
    } else {
        alert("您输入的Email地址格式不正确！");
        return false;
    }
}

/* 
用途：检查输入的电话号码格式是否正确 
输入： 
strPhone：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkPhone(strPhone) {
    var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
    var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
    var prompt = "您输入的电话号码不正确!"
    if (strPhone.length > 9) {
        if (phoneRegWithArea.test(strPhone)) {
            return true;
        } else {
            alert(prompt);
            return false;
        }
    } else {
        if (phoneRegNoArea.test(strPhone)) {
            return true;
        } else {
            alert(prompt);
            return false;
        }


    }
}


/* 
用途：检查复选框被选中的数目 
输入： 
checkboxID：字符串 
返回： 
返回该复选框中被选中的数目 

*/

function checkSelect(checkboxID) {
    var check = 0;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                check += 1;
            }




        }
    } else {
        if (document.all(checkboxID).checked)
            check = 1;
    }
    return check;
}

function getTotalBytes(varField) {
    if (varField == null)
        return -1;

    var totalCount = 0;
    for (i = 0; i < varField.value.length; i++) {
        if (varField.value.charCodeAt(i) > 127)
            totalCount += 2;
        else
            totalCount++;
    }
    return totalCount;
}

function getFirstSelectedValue(checkboxID) {
    var value = null;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                value = document.all(checkboxID).item(i).value;
                break;
            }
        }
    } else {
        if (document.all(checkboxID).checked)
            value = document.all(checkboxID).value;
    }
    return value;
}


function getFirstSelectedIndex(checkboxID) {
    var value = -2;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                value = i;
                break;
            }
        }
    } else {
        if (document.all(checkboxID).checked)
            value = -1;
    }
    return value;
}

function selectAll(checkboxID, status) {

    if (document.all(checkboxID) == null)
        return;

    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {

            document.all(checkboxID).item(i).checked = status;
        }
    } else {
        document.all(checkboxID).checked = status;
    }
}

function selectInverse(checkboxID) {
    if (document.all(checkboxID) == null)
        return;

    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            document.all(checkboxID).item(i).checked = !document.all(checkboxID).item(i).checked;
        }
    } else {
        document.all(checkboxID).checked = !document.all(checkboxID).checked;
    }
}

function checkDate(value) {
    if (value == '') return true;
    if (value.length != 8 || !isNumber(value)) return false;
    var year = value.substring(0, 4);
    if (year > "2100" || year < "1900")
        return false;

    var month = value.substring(4, 6);
    if (month > "12" || month < "01") return false;

    var day = value.substring(6, 8);
    if (day > getMaxDay(year, month) || day < "01") return false;

    return true;
}

/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确或都为空 
且结束日期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：  结束日期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkPeriod(startDate, endDate) {
    if (!checkDate(startDate)) {
        alert("起始日期不正确!");
        return false;
    } else if (!checkDate(endDate)) {
        alert("终止日期不正确!");
        return false;
    } else if (startDate > endDate) {
        alert("起始日期不能大于终止日期!");
        return false;
    }
    return true;
}

/* 
用途：检查证券代码是否正确 
输入： 
secCode:证券代码 
返回： 
如果通过验证返回true,否则返回false 

*/
function checkSecCode(secCode) {
    if (secCode.length != 6) {
        alert("证券代码长度应该为6位");
        return false;
    }

    if (!isNumber(secCode)) {
        alert("证券代码只能包含数字");


        return false;
    }
    return true;
}

/**************************************************** 
function:cTrim(sInputString,iType) 
description:字符串去空格的函数 
parameters:iType：1=去掉字符串左边的空格 

2=去掉字符串左边的空格 
0=去掉字符串左边和右边的空格 
return value:去掉空格的字符串 
****************************************************/
function cTrim(sInputString, iType) {
    var sTmpStr = ' ';
    var i = -1;

    if (iType == 0 || iType == 1) {
        while (sTmpStr == ' ') {
            ++i;
            sTmpStr = sInputString.substr(i, 1);
        }
        sInputString = sInputString.substring(i);
    }

    if (iType == 0 || iType == 2) {
        sTmpStr = ' ';
        i = sInputString.length;
        while (sTmpStr == ' ') {
            --i;
            sTmpStr = sInputString.substr(i, 1);
        }
        sInputString = sInputString.substring(0, i + 1);
    }
    return sInputString;
}
