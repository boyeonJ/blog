const breakpoints = [576, 768, 992, 1200];
//~까지 적용
export const minq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//~부터 적용(none)
export const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);