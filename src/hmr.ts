import {applyPolyfill} from 'custom-elements-hmr-polyfill'

applyPolyfill()

//  reset the root to trigger rerender after the HMR event
// if (document.body) {
//     requestAnimationFrame(() => {
//         document.body.innerHTML = '';
//         document.body.innerHTML = '<app-root></app-root>';
//     });
// }