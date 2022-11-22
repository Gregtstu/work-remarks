import { Pipe, PipeTransform } from '@angular/core';
import {IPost} from "../interfaces/ipost";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IPost[], search:string): IPost[] {
    if(search.length === 0) return products;
    return products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  }

}
