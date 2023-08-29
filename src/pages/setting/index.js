import {createApp} from "../../lib/vue@3.3.4@prod.js";
import {SETTING} from '../../global/constant.js';
import {getByDefault, setValue} from "../../global/utils.js";


createApp({
    data: () => ({
        skipTaskbar: getByDefault(SETTING.SKIP_TASKBAR, false),
        alwaysOnTop: getByDefault(SETTING.ALWAYS_ON_TOP, true),
        width: getByDefault(SETTING.WIDTH, 200),
        height: getByDefault(SETTING.HEIGHT, 232),
        backgroundColor:  getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE"),
        color:  getByDefault(SETTING.COLOR, "#000000"),
    }),
    watch: {
        skipTaskbar(newValue) {
            setValue(SETTING.SKIP_TASKBAR, newValue);
        },
        alwaysOnTop(newValue) {
            setValue(SETTING.ALWAYS_ON_TOP, newValue);
        },
    },
    methods: {
        save() {
            if (this.width < 150) {
                layer.alert('宽度最小为150px', {
                    skin: 'layui-layer-win10', // 2.8+
                    shade: 0.01,
                    btn: ['确定', '取消']
                })
                return;
            }
            if (this.height < 182) {
                layer.alert('高度最小为182px', {
                    skin: 'layui-layer-win10', // 2.8+
                    shade: 0.01,
                    btn: ['确定', '取消']
                })
                return;
            }
            setValue(SETTING.SKIP_TASKBAR, this.skipTaskbar);
            setValue(SETTING.ALWAYS_ON_TOP, this.alwaysOnTop);
            setValue(SETTING.WIDTH, this.width);
            setValue(SETTING.HEIGHT, this.height);
            setValue(SETTING.BACKGROUND_COLOR, this.backgroundColor);
            setValue(SETTING.COLOR, this.color);
            layer.msg("保存成功");
        }
    }
}).mount('#app')
