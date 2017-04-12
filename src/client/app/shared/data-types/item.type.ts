/**
 * Created by mspalti on 3/23/17.
 */

export interface ItemTypesInterface {
  id: number,
  name: string,
  icon: string
}

export class ItemType {
  collection: {
    id: number;
    title: string;
    image: string;
    url: string;
    desc: string;
    dates: string;
    items: string;
    linkOptions: string;
    searchOptions: string;
    assetType: string;
    restricted: boolean;
    published: boolean;
  };
  category: {
    id: number;
    title: string;
    linkLabel: string;
    url: string;
    secondaryUrl:string;
    description: string;
    areaId: string;
  };
  itemTypes: ItemTypesInterface[];
  subjects: number[];

}
