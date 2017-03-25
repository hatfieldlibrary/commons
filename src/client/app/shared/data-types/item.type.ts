/**
 * Created by mspalti on 3/23/17.
 */

export class ItemType {
  collection: {
    id: string;
    title: string;
    url: string;
    desc: string;
    browseType: string;
    image: string;
    dates: string;
    ctype: string;
    repoType: string;
    restricted: boolean;
    published: boolean;
    createdAt: string;
    updatedAt: string;
  };
  categories: {
    id: number;
    title: string;
    linkLabel: string;
    url: string;
    secondaryUrl: string;
    description: string;
    areaId: string;
    createdAt: string;
    updatedAt: string;
  };
  itemTypes: [
    {
    id: number;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
  }]
}
