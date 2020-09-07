import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
} from '@angular/animations';

export let animHover = trigger('animHover', [
  state(
    'true',
    style({
      'box-shadow': '3px 0px 36px rgba(182, 179, 179, 0.31)',
      transform: 'scale(1.01)',
    })
  ),
  state(
    'false',
    style({
      'box-shadow': '*',
      transform: 'scale(1)',
    })
  ),
  transition('* <=> *', [
    // query('.card', animate('1000ms', style({ background: 'red' }))),
    // query('*', style({ background: 'red' })),
    animate('100ms'),
  ]),
]);

export const routeAnim = trigger('routeAnim', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter , :leave', [style({ position: 'absolute', width: '100%' })], {
      optional: true,
    }),
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(':leave', animate('100ms ease-out', style({ opacity: 0 })), {
      optional: true,
    }),
    query(':enter', animate('200ms ease-out', style({ opacity: 1 })), {
      optional: true,
    }),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);

// export const routeAnim = trigger('routeAnim', [
//   transition('* <=> *', [
//     style({ height: '100vh', position: 'relative', overflow: 'hidden' }),
//     query(':enter , :leave', [style({ position: 'absolute', width: '100%' })], {
//       optional: true,
//     }),
//     query(':enter', style({ transform: 'translateX(100%)' }), {
//       optional: true,
//     }),
//     group([
//       query(
//         ':leave',
//         animate('500ms ease-out', style({ transform: 'translateX(-100%)' })),
//         {
//           optional: true,
//         }
//       ),
//       query(
//         ':enter',
//         animate('500ms ease-out', style({ transform: 'translateX(0)' })),
//         {
//           optional: true,
//         }
//       ),
//     ]),
//   ]),
// ]);
