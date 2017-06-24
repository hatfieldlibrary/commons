import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'collectionsFilter'
})
export class CollectionsFilterPipe implements PipeTransform {

  transform(collections: any[], value: string): any[] {

    if (!collections) return [];
    let query = value ? value : '.*';
    let regex = new RegExp(query, 'i');
    return collections.filter(it => regex.test(it.title));

  }

}
