import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, properties: string[]): any[] {
    if (!items) return [];
    if (!searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      for (const property of properties) {
        if (item[property].toLowerCase().includes(searchTerm)) {
          return true;
        }
      }

      return false;
    });
  }
}
