import {renderHeader} from './modules/header.js';
import {renderFooter} from './modules/footer.js';
import {renderToggleMenu} from './modules/toggleMenu.js';
import {toggleEven} from './modules/toggleMenu.js';


document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderToggleMenu();

    toggleEven();
});

