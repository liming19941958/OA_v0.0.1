<template>
        <div class="mebubar">
            <a-menu
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    :mode="mode"
                    :theme="theme"
                    :inline-collapsed="$store.state.collapsed">
                <a-menu-item key="1">
                    <a-icon type="mail" />
                   <span>首页</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="calendar" />
                    <span>租户管理</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="calendar" />
                    <span>访客管理</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <a-icon type="calendar" />
                    <span>放行条管理</span>
                </a-menu-item>
                <a-menu-item key="5">
                    <a-icon type="calendar" />
                    <span>设备维修</span>
                </a-menu-item>
                <a-menu-item key="6">
                    <a-icon type="calendar" />
                    <span>缴费管理</span>
                </a-menu-item>
                <a-menu-item key="7">
                    <a-icon type="calendar" />
                    <span>缴费查询</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="appstore" />
                        <span>设备维保</span>
                    </span>
                    <a-menu-item key="8">
                        巡检参数
                    </a-menu-item>
                    <a-menu-item key="9">
                        保养参数
                    </a-menu-item>
                    <a-menu-item key="10">
                        巡保模块
                    </a-menu-item>
                    <a-menu-item key="11">
                        设备台账
                    </a-menu-item>
                    <a-menu-item key="12">
                        巡保任务
                    </a-menu-item>
                    <a-menu-item key="13">
                        图片管理
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="14">
                    <a-icon type="calendar" />
                    <span>缴费查询</span>
                </a-menu-item>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="setting" /><span>Navigation Four</span></span>
                    <a-menu-item key="7">
                        Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                        Option 8
                    </a-menu-item>
                    <a-menu-item key="9">
                        Option 9
                    </a-menu-item>
                    <a-menu-item key="10">
                        Option 10
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </div>
</template>

<script>
    export default {
        name: "tab",
        data(){
            return {
                mode: 'inline',
                theme: 'dark',

            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .mebubar{
        height: 100%;
        background-color: rgb(0,12,23);

    }
</style>
