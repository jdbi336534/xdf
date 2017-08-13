<template>
    <Steps :current="2" direction="vertical">
        <Step title="已完成" content="基础汇报"></Step>
        <Step title="已完成" content="四折标课情况"></Step>
        <Step title="进行中" content="教研情况"></Step>
        <Step v-if="false" title="待进行" content="KPI情况统计"></Step>
    </Steps>
</template>
<script>
    export default {
        
    }
</script>
