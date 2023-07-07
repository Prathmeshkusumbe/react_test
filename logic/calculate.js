import Big from 'big.js'
import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName){
  if(buttonName==='AC'){
    return {
        total:null,
        next: null,
        operation:null,
        display:0
    };
  }
  if(isNumber(buttonName)){

    if (buttonName === "0" && obj.next === "0") {
      return {display:0};
    }
    if(obj.operation){
      if(obj.next){
          return {next: obj.next + buttonName,display:obj.total + obj.operation + obj.next + buttonName};
      }
      console.log('here');
      return{next: buttonName, display:obj.total + obj.operation + buttonName};
  }

  if(obj.next){
    const next = obj.next === '0' ? buttonName : obj.next + buttonName;
    return{
        next,
        total:null,
        display:next
    }
  }
  return{
      next:buttonName,
      //operation:null,
      total:null,
      display:buttonName
  }
}

  if (buttonName === "%") {
   if (obj.operation && obj.next) {
        const result = operate(obj.total, obj.next, obj.operation);
        return {
        total: Big(result)
            .div(Big("100"))
            .toString(),
        next: null,
        operation: null,
        display:Big(result)
        .div(Big("100"))
        .toString()
        };
    }
    if (obj.next) {
        return {
        next: Big(obj.next)
            .div(Big("100"))
            .toString(),
            display:Big(obj.next)
            .div(Big("100"))
            .toString()
        };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." , display:obj.next};
    }
    return { next: "0." , display:"0."};
  }



  if (buttonName === "=") {
    if (obj.next && obj.operation) {
    return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
        display:operate(obj.total, obj.next, obj.operation)
    };
    } else {
    // '=' with no operation, nothing to do
    return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString(), display:(-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() , display:(-1 * parseFloat(obj.total)).toString()};
    }
    return {};
  }

  if (obj.operation) {

    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
      display:operate(obj.total, obj.next, obj.operation)
    };
  }

  if (!obj.next) {
    return { operation: buttonName , display:obj.total + buttonName};
  }



  return{
      total: obj.next,
      next:null,
      operation:buttonName,
      display:obj.next + buttonName
  }

}
