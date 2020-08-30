import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
// box-shadow: 3px 0px 36px rgba(182, 179, 179, 0.31);
// transform: scale(1.05);
export let animHover = trigger('animHover', [
  state(
    'true',
    style({
        'box-shadow': '3px 0px 36px rgba(182, 179, 179, 0.31)',
        transform: 'scale(1.05)',
    })
  ),
  state(
    'false',
    style({
        'box-shadow': '*',
        transform: 'scale(1)',
    })
  ),
  transition('* <=> *', animate('100ms')),
]);
