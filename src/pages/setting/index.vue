<template>
    <a-form layout="vertical" class="setting">
        <a-form-item label="隐藏任务栏">
            <a-switch v-model="skipTaskbar">
                <template #checked>隐藏</template>
                <template #unchecked>显示</template>
            </a-switch>
        </a-form-item>
        <a-form-item label="是否置顶">
            <a-switch v-model="alwaysOnTop">
                <template #checked>始终置顶</template>
                <template #unchecked>不置顶</template>
            </a-switch>
        </a-form-item>
        <a-form-item label="宽">
            <a-input-number :min="150" v-model="width" style="width: 150px;">
                <template #suffix>px</template>
            </a-input-number>
            <template #help>
                不能小于150px
            </template>
        </a-form-item>
        <a-form-item label="高">
            <a-input-number :min="182" v-model="height" style="width: 150px;">
                <template #suffix>px</template>
            </a-input-number>
            <template #help>
                不能小于182px
            </template>
        </a-form-item>
        <a-form-item label="背景颜色">
            <color-picker v-model:color="backgroundColor"/>
        </a-form-item>
        <a-form-item label="文字颜色">
            <color-picker v-model:color="color"/>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="save()">保存</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {getByDefault, setValue} from "@/utils/BrowserUtil";
import SettingEnum from "@/enumeration/SettingEnum";
import ColorPicker from "@/components/color-picker/index.vue";
import MessageUtil from "@/utils/MessageUtil";

const skipTaskbar = ref(getByDefault(SettingEnum.SKIP_TASKBAR, false));
const alwaysOnTop = ref(getByDefault(SettingEnum.ALWAYS_ON_TOP, true));
const width = ref(getByDefault(SettingEnum.WIDTH, 200));
const height = ref(getByDefault(SettingEnum.HEIGHT, 232));
const backgroundColor = ref(getByDefault(SettingEnum.BACKGROUND_COLOR, "#FFFAEE"));
const color = ref(getByDefault(SettingEnum.COLOR, "#000000"));


function save() {
    if (width.value < 150) {
        MessageUtil.error("宽度最小为150px");
        return;
    }
    if (height.value < 182) {
        MessageUtil.error("高度最小为182px");
        return;
    }
    setValue(SettingEnum.SKIP_TASKBAR, skipTaskbar.value);
    setValue(SettingEnum.ALWAYS_ON_TOP, alwaysOnTop.value);
    setValue(SettingEnum.WIDTH, width.value);
    setValue(SettingEnum.HEIGHT, height.value);
    setValue(SettingEnum.BACKGROUND_COLOR, backgroundColor.value);
    setValue(SettingEnum.COLOR, color.value);
    MessageUtil.success("保存成功");
}

</script>
<style scoped>
.setting {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 7px;
    overflow: auto;
}
</style>
