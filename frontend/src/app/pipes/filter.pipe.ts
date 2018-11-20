import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../model/member';

@Pipe({
  name: 'filterMembers'
})

export class FilterMembersPipe implements PipeTransform 
{
  transform(items: Member[], searchText: string): Member[] 
  {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
          return it.name.toLowerCase().includes(searchText);
        });
   }
}