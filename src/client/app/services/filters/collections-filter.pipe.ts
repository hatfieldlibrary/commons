import {OnDestroy, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'collectionsFilter'
})
export class CollectionsFilterPipe implements PipeTransform, OnDestroy {

  collections: any[];

  ngOnDestroy(): void {
    this.collections = null;
  }

  transform(input: any[], value: string): any[] {
    this.collections = input;
    if (!this.collections) { return []; }
    const query = value ? value : '.*';
    const regex = new RegExp(query, 'i');
    return this.collections.filter(it => regex.test(it.title));

  }

}
