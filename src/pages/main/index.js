import Swiper from '../../lib/swiper/swiper-bundle.esm.browser.min.js';
import {getByDefault} from "../../global/utils.js";
import {SETTING} from "../../global/constant.js";


const swiper = new Swiper(".swiper-container", {
    grabCursor: true,
    direction: 'vertical',

    simulateTouch: false,

    speed: 800,
    mousewheel: true,

    pagination: {
        el: ".swiper-pagination"
    },
});

// 暗黑模式
document.body.setAttribute('mode', utools.isDarkColors() ? 'dark' : 'light');

// 设置的颜色
document.body.style.backgroundColor = getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE")
document.body.style.color = getByDefault(SETTING.COLOR, "#000000");
const title = document.getElementById('title')
title.style.backgroundColor = getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE")
title.style.color = getByDefault(SETTING.COLOR, "#000000");
