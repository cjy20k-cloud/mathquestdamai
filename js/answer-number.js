/* Read equivalent numeric notation without evaluating JavaScript or stripping units. */
(function(root){
 'use strict';
 function read(raw){
  if(typeof raw==='number')return Number.isFinite(raw)?raw:NaN;
  let s=String(raw??'').trim().replace(/\u2212/g,'-').replace(/[\u2044\u2215]/g,'/');
  if(!s)return NaN;
  const decimal='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?';
  if(s.includes(',')){
   if(!/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(s))return NaN;
   s=s.replace(/,/g,'');
  }
  let value;
  const mixed=s.match(/^([+-]?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if(mixed){const den=Number(mixed[4]);if(!den)return NaN;value=(Number(mixed[2])+Number(mixed[3])/den)*(mixed[1]==='-'?-1:1);}
  else if(new RegExp('^'+decimal+'$').test(s))value=Number(s);
  else {const fraction=s.match(new RegExp('^('+decimal+')\\s*/\\s*('+decimal+')$'));if(!fraction||Number(fraction[2])===0)return NaN;value=Number(fraction[1])/Number(fraction[2]);}
  return Number.isFinite(value)?value:NaN;
 }
 if(typeof module==='object'&&module.exports)module.exports=read;
 root.MRAnswerNumber=read;
})(typeof window==='object'?window:globalThis);
