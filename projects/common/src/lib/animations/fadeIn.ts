import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({
    opacity: 0,
    transform: 'scale(0.5)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition('void => *', [
    animate('{{ transitionTime }} ease-in')
  ], { params: { transitionTime: '300ms' }}), // default value for transitionTime
  transition('* => void', [
    animate('{{ transitionTime }} ease-out')
  ], { params: { transitionTime: '300ms' }}) // default value for transitionTime
]);
