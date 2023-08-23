<template>
    <a-layout class="main">
        <a-layout-sider collapsed style="z-index: 50">
            <a-menu style="width: 200px;height: 100%;" breakpoint="xl" v-model:selected-keys="selectedKeys">
                <a-menu-item key="/home">
                    <template #icon>
                        <icon-home/>
                    </template>
                    主页
                </a-menu-item>
                <a-menu-item key="/rule">
                    <template #icon>
                        <icon-list/>
                    </template>
                    规则
                </a-menu-item>
                <a-menu-item key="/setting">
                    <template #icon>
                        <icon-settings/>
                    </template>
                    设置
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content class="container">
            <router-view/>
        </a-layout-content>
    </a-layout>
</template>
<script lang="ts" setup>
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useGlobalStore} from "@/store/GlobalStore";

const route = useRoute();
const router = useRouter();
const selectedKeys = ref(['/home']);

watch(() => selectedKeys.value, value => router.push(value[0]));
watch(() => route.path, value => {
    if (selectedKeys.value[0] !== value) {
        selectedKeys.value = [route.path];
    }
})


if (useGlobalStore().isDark) {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark');
} else {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
}

</script>
<style scoped lang="less">
.main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg-1);
    color: var(--color-text-1);

    & > .container {
        position: relative;
        height: 100%;
        width: 100%;
    }
}
</style>
