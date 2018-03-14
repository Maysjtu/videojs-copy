import window from 'global/window'
/**
 * A safe getComputedStyle with an IE8 fallback.
 *
 * This is needed because in Firefox, if the player is loaded in an iframe with
 * `display:none`, then `getComputedStyle` returns `null`, so, we do a null-check to
 * make sure  that the player doesn't break in these cases.
 *
 * let style = window.getComputedStyle(element, [pseudoElt]);
 * element   用于获取计算样式的Element
 * pseudoElt 可选 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
 * 返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
 * eg:
 *  function getTheStyle(){
    let elem = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("height");
    document.getElementById("output").innerHTML = theCSSprop;
   }
 */

/**
 * Element.currentStyle 是一个与 window.getComputedStyle方法功能相同的属性。这个属性实现在旧版本的IE浏览器中.
 */
export default function computedStyle(el, prop){
    if(!el||!prop) { return ''; }
    if(typeof window.getComputedStyle === 'function') {
        const cs = window.getComputedStyle(el);
        return cs?cs[prop]:'';
    }
    return el.currentStyle[prop]||'';
}