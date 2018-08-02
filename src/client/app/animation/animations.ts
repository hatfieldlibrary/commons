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


import {animate, state, style, transition, trigger} from '@angular/animations';
/**
 * Created by mspalti on 5/17/17.
 */
export const slideInDownAnimation =
  trigger('leftToRightAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
        width: '100%'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
        width: '100%'
      }),
      animate('0.3s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(0)',
        width: '100%'
      }))
    ])
  ]);

export const slideInLeftAnimation =
  trigger('rightToLeftAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
        width: '100%'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(100%)',
        width: '100%'
      }),
      animate('0.3s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(0)',
        width: '100%'
      }))
    ])
  ]);

export const slideUpDownAnimation =
  trigger('bottomToTopAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateY(0)',
        width: '100%'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(100%)',
        width: '100%'
      }),
      animate('0.3s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)',
        width: '100%'
      }))
    ])
  ]);

export const fadeIn =
  trigger(
    'openClose',
    [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms', style({opacity: 0}))
      ])
    ]);



export const imageFadeIn =
  trigger(
    'imageShow',
    [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 0})
      ])
    ]);

