/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
    secondaryUrl: string;
    description: string;
    areaId: string;
  };
  itemTypes: ItemTypesInterface[];
  subjects: number[];

}
