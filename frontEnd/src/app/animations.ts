import { trigger, animate, style, group, animateChild, query, stagger, transition, animation } from '@angular/animations';

export const routerAnimations = trigger('routerAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
        query(':enter .anim', style({transform: 'translateX(100%)', opacity: 1}), {optional: true}),
        group([
            query(':enter', [
                style({opacity: 0}),
                animate('0.5s ease-in-out', style({opacity: 1}))
            ], {optional: true}),
            query(':leave', [
                style({opacity: 1}),
                animate('0.5s ease-in-out', style({opacity: 0}))
            ], {optional: true}),
            query(':enter .anim', stagger (400, [
                style({transform: 'translateX(100%)'}),
                animate('1s ease-in-out', 
                style({transform: 'translateX(0)', opacity: 1}))      
            ]), {optional: true})
        ])
    ])
]);