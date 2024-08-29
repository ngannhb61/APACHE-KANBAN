<template>
  <div class="kanban-header">
    <div class="hd-l">
      <svg width="480" height="70" class="header-left-decoration">
        <polyline
          stroke-width="3"
          fill="transparent"
          points="0, 0 30, 35"
          :stroke="lineColor"
        />
        <polyline
          stroke-width="3"
          fill="transparent"
          points="20, 0 50, 35 480, 35"
          :stroke="lineColor"
        />
      </svg>
    </div>
    <div class="hd-c">
      <svg width="960" height="70" class="header-center-decoration">
        <polyline
          fill="transparent"
          stroke-width="3"
          points="0,14 172.79999999999998,14 192,28 240,28 259.20000000000005,42 691.1999999999999,42 720,28 768,28 787.1999999999999,14 960,14"
          :stroke="lineColor"
        >
          <animate
            v-if="isAnimate"
            attributeName="stroke-dasharray"
            attributeType="XML"
            from="0, 488.45447822437023, 0, 488.45447822437023"
            to="0, 0, 976.9089564487405, 0"
            :dur="dur"
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4,1,0.49,0.98"
            repeatCount="indefinite"
          />
        </polyline>
        <polyline
          v-if="isAnimate"
          fill="transparent"
          stroke-width="3"
          points="288,56 672,56"
          :stroke="lineColor"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from="0, 192, 0, 192"
            to="0, 0, 384, 0"
            :dur="dur"
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".4,1,.49,.98"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>
    </div>
    <div class="hd-r">
      <svg width="480" height="70" class="header-right-decoration">
        <polyline
          stroke-width="3"
          fill="transparent"
          points="480, 0 450, 35"
          :stroke="lineColor"
        />
        <polyline
          stroke-width="3"
          fill="transparent"
          points="460, 0 430, 35 0, 35"
          :stroke="lineColor"
        />
      </svg>
    </div>
    <div class="hd-left" :style="leftStyle">
      <template v-if="showBackButton">
        <a-button @click="$emit('onBackbuttonClick')">返回</a-button>
      </template>
      <template v-else>
        <a-link v-if="showHome" @click="toHome">
          <img
            src="@/assets/images/back.png"
            style="width: 30px; height: 33px"
          />
        </a-link>
      </template>
    </div>
    <div class="hd-center" :style="centerStyle">{{ title }}</div>
    <div class="hd-right" :style="rightStyle">
      <div class="hd-right-time">
        <template v-if="showTime">
          <span>{{ datetime }}</span>
        </template>
        <template v-else>{{ rightTitle }}</template>
      </div>
      <div class="hd-right-full">
        <a-link @click="toggleFullScreen">
          <img
            src="@/assets/images/full.png"
            style="width: 30px; height: 33px"
          />
        </a-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import router from '@/router';
  import { formatNowDate } from '@/utils/date';
  import { getUrlParam } from '@/utils/util';

  const emit = defineEmits(['onBackbuttonClick']);

  const props = defineProps({
    showTime: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    isAnimate: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      default: '@/assets/images/logo.png',
    },
    title: {
      type: String,
      default: '',
    },
    rightTitle: {
      type: String,
      default: '',
    },
    leftStyle: {
      type: Object,
      default() {
        return { color: '#52FFFF' };
      },
    },
    centerStyle: {
      type: Object,
      default() {
        return { color: '#52FFFF' };
      },
    },
    rightStyle: {
      type: Object,
      default() {
        return { color: '#52FFFF' };
      },
    },
    lineColor: {
      type: String,
      default: 'rgba(82,255,255, 1)',
    },
    duration: {
      type: Number,
      default: 2.6,
    },
  });

  // 星期几的中文表示
  const weekDays = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  const datetime = ref('');
  const showHome = ref(true);
  let timeId: any = 0;

  const logoStyleObj = computed(() => ({
    backgroundImage: `url("${props.logoUrl}")`,
  }));

  const dur = computed(() => `${props.duration}s`);

  function getTimes() {
    const weekDayName = weekDays[new Date().getDay()];
    return formatNowDate(`yyyy年MM月dd日 ${weekDayName} HH:mm:ss`);
  }

  function exitFullScreen() {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function fullScreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }

  function toHome() {
    console.log('跳转主页面');
    exitFullScreen();
    // window.location.href = '/#/homePage/workplace';
    router.push({
      name: 'Workplace',
    });
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      exitFullScreen();
    } else {
      fullScreen();
    }
  }

  function updateTime() {
    datetime.value = getTimes();
  }

  function stopInterval() {
    clearInterval(timeId);
    timeId = 0;
  }

  onMounted(() => {
    // 在MES系统打开时，url增加hidden_home=1参数不显示返回主页按钮
    const hiddenHome = getUrlParam(window.location.href, 'hidden_home');
    if (hiddenHome === '1') {
      showHome.value = false;
    }
    if (props.showTime) {
      updateTime();
      timeId = setInterval(updateTime, 1000);
    }
    fullScreen();
  });

  onBeforeUnmount(() => {
    stopInterval();
  });
</script>

<style scoped lang="less">
  .kanban-header {
    display: flex;
    position: absolute;
    z-index: 2000;
    // height: 80px;
    width: 100%;
    pointer-events: auto;
    cursor: default;
    background: linear-gradient(
      to bottom,
      rgba(9, 12, 9, 1),
      rgba(9, 12, 9, 0.85),
      rgba(9, 12, 9, 0.7),
      rgba(9, 12, 9, 0.55),
      rgba(9, 12, 9, 0.4),
      rgba(9, 12, 9, 0)
    );
  }

  .hd-l,
  .hd-r {
    position: relative;
    flex: 1;
    background: transparent;
  }

  .hd-c {
    position: relative;
    flex: 2;
    background: transparent;
    text-align: center;
  }

  .header-center-decoration {
    margin-top: 31px;
  }

  .header-left-decoration {
    position: absolute;
    left: 0;
    margin-top: 10px;
  }

  .header-right-decoration {
    position: absolute;
    right: 0;
    margin-top: 10px;
  }

  .hd-center {
    position: absolute;
    font-size: 32px;
    font-weight: bold;
    left: 0;
    top: 16px;
    width: 100%;
    text-align: center;
    letter-spacing: 8px;
  }

  .hd-logo {
    border: none;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 40px;
    width: 40px;
    position: absolute;
    left: 50px;
    top: 4px;
    z-index: 100;
  }

  .hd-left {
    position: absolute;
    z-index: 1000;
    left: 55px;
    top: 5px;
    color: #eada28;
    font-weight: 600;
    font-size: 18px;
  }

  .hd-right {
    position: absolute;
    z-index: 100;
    top: 5px;
    right: 55px;
    font-weight: 600;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }

  .hd-right-time {
    float: left;
    font-weight: 600;
    font-size: 18px;
  }

  .hd-right-full {
    float: left;
    margin-left: 10px;
  }

  :deep(.arco-link:active) {
    background-color: red;
  }

  :deep(.arco-link:hover) {
    background-color: red;
  }
</style>
