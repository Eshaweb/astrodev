import { Pipe, PipeTransform } from '@angular/core';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';

@Pipe({
  name: 'sortingOrders'
})
export class SortingOrderHistoryPipe implements PipeTransform {

  // transform(orderHistories: OrderHistoryResponse[], path: string[], order: number = 1): OrderHistoryResponse[] {

  //   // Check if is not null
  //   if (!orderHistories || !path || !order) return orderHistories;

  //   return orderHistories.sort((a: OrderHistoryResponse, b: OrderHistoryResponse) => {
  //     // We go for each property followed by path
     
  //       path.forEach(property => {
  //       a = a[property];
  //       b = b[property];
  //     })
  //     // Order * (-1): We change our order
  //     return a > b ? order : order * (- 1);
  //   })
  // }


  static _orderByComparator(a:any, b:any):number{
    
    if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
      //Isn't a number so lowercase the string to properly compare
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a) < parseFloat(b)) return -1;
      if(parseFloat(a) > parseFloat(b)) return 1;
    }
  
    return 0; //equal each other
  }

  //transform(input:any, [config = '+']): any{
    transform(input:any, args:string[]): any{
      if(!Array.isArray(input)) return input;

      if(!Array.isArray(args) || (Array.isArray(args) && args.length == 1)){
          var propertyToCheck:string = !Array.isArray(args) ? args : args[0];
          var desc = propertyToCheck.substr(0, 1) == '-';
          
          //Basic array
          if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
              return !desc ? input.sort() : input.sort().reverse();
          }
          else {
              var property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                  ? propertyToCheck.substr(1)
                  : propertyToCheck;

              return input.sort(function(a:any,b:any){
                  return !desc 
                      ? SortingOrderHistoryPipe._orderByComparator(a[property], b[property]) 
                      : -SortingOrderHistoryPipe._orderByComparator(a[property], b[property]);
              });
          }
      }
      else {
          //Loop over property of the array in order and sort
          return input.sort(function(a:any,b:any){
              for(var i:number = 0; i < args.length; i++){
                  var desc = args[i].substr(0, 1) == '-';
                  var property = args[i].substr(0, 1) == '+' || args[i].substr(0, 1) == '-'
                      ? args[i].substr(1)
                      : args[i];

                  var comparison = !desc 
                      ? SortingOrderHistoryPipe._orderByComparator(a[property], b[property]) 
                      : -SortingOrderHistoryPipe._orderByComparator(a[property], b[property]);
                  
                  //Don't return 0 yet in case of needing to sort by next property
                  if(comparison != 0) return comparison;
              }

              return 0; //equal each other
          });
      }
  }
}
