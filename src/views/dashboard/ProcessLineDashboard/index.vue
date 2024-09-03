<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <Header
        :title="pageTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9', fontSize: '40px' }"
        :right-style="{ color: 'white' }"
      ></Header>
      <div style="position: fixed; left: 15px; top: 75px; z-index: 9999">
        <div class="selector-title">
          <span style="margin-left: 5px"
            >{{ $t('ProcessLineDashboard.center.title1') }}：</span
          >
          <a-select
            v-model="productionGroup"
            size="large"
            :style="{ width: '250px' }"
            @change="handleChangeProGroup"
          >
            <a-option
              v-for="item in productionGroupOptions"
              :key="item.value"
              :value="item.value"
              style="font-size: 20px"
              >{{ item.name }}
            </a-option>
          </a-select>
          <span style="margin-left: 15px; color: #fd2104; font-size: 20px">{{
            errorMsg
          }}</span>
        </div>
      </div>
      <div class="container">
        <template v-if="showPage === 1">
          <a-row class="container-row" :gutter="24">
            <!-- 左边 -->
            <a-col :span="6" class="padding-leftright-0">
              <dv-border-box-12 :color="borderColor" class="page-one-box-1">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.left.title1')
                }}</div>
                <div class="person-box">
                  <div> Supervisor </div>
                  <div> Section Head </div>
                  <div> Manager </div>
                </div>
                <div class="person-box">
                  <div style="background-color: #0a2732">{{
                    leaderInfo.zz
                  }}</div>
                  <div style="background-color: #0a2732">{{
                    leaderInfo.bz
                  }}</div>
                  <div style="background-color: #0a2732">{{
                    leaderInfo.fl
                  }}</div>
                </div>
              </dv-border-box-12>
              <dv-border-box-12 :color="borderColor" class="page-one-box-2">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.right.title1')
                }}</div>
                <dv-active-ring-chart
                  id="groupMember"
                  :config="groupMembers"
                  style="width: 100%; height: 250px"
                />
              </dv-border-box-12>
              <dv-border-box-12 :color="borderColor" class="page-one-box-3">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.left.title2')
                }}</div>
                <div class="box-content">
                  <div class="flex-row">
                    <div class="flex-1">
                      <div class="box-title">Actual PPH month</div>
                      <div class="border-1 flex-center flex-item">
                        <a-statistic
                          :value="dayAndMonthPPHOption.monthPPH"
                          :value-from="0"
                          :precision="1"
                          class="pph-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="box-title">Actual PPH day</div>
                      <div class="border-1 flex-center flex-item">
                        <a-statistic
                          :value="dayAndMonthPPHOption.dayPPH"
                          :value-from="0"
                          :precision="1"
                          class="pph-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-12>
            </a-col>
            <!-- 中间 -->
            <a-col :span="18" style="padding-left: 10px">
              <dv-border-box-12 :color="borderColor" class="page-one-box-4">
                <div class="production-box">
                  <div class="sub">
                    <a-statistic
                      title="Daily Target"
                      :value="productionInfo.workQty"
                      :value-from="0"
                      :value-style="{ color: '#fe7007' }"
                      class="production-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                    <div class="mark"></div>
                  </div>

                  <div class="sub">
                    <a-statistic
                      title="Actual Ouput"
                      :value="productionInfo.labelQty"
                      :value-from="0"
                      :value-style="{ color: '#0AF60A' }"
                      class="production-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                  <div class="sub">
                    <a-statistic
                      title="Daily Rate"
                      :value="productionInfo.percentRate"
                      :value-from="0"
                      :precision="1"
                      :value-style="{
                        color: productionAchievementRateColor,
                      }"
                      class="production-info"
                      animation
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <div class="mark"></div>
                  </div>

                  <div class="sub" style="margin-right: 0">
                    <a-statistic
                      title="RFT %"
                      :value="productionInfo.rft"
                      :value-from="0"
                      :precision="1"
                      :value-style="{ color: dayRFTColor }"
                      class="production-info"
                      animation
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                </div>
              </dv-border-box-12>
              <dv-border-box-12 :color="borderColor" class="page-one-box-5">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title2')
                }}</div>
                <dv-scroll-board
                  :config="productionRate"
                  class="production-rate"
                  style="width: 100%; height: 636px"
                />
              </dv-border-box-12>
            </a-col>
          </a-row>
        </template>
        <template v-else>
          <a-row class="container-row" :gutter="24">
            <!-- 右边 -->
            <a-col :span="16" class="padding-leftright-0">
              <!-- 品质管理 -->
              <dv-border-box-12 :color="borderColor" class="page-two-box-1">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title3')
                }}</div>
                <dv-scroll-board
                  :config="qualityManagement"
                  style="width: 100%; height: 380px"
                  class="quality-info"
                />
              </dv-border-box-12>
              <!-- 品质异常 -->
              <dv-border-box-12 :color="borderColor" class="page-two-box-2">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title4')
                }}</div>
                <dv-scroll-board
                  :config="abnormalQuality"
                  class="quality-info2"
                  style="width: 100%; height: 380px"
                />
              </dv-border-box-12>
            </a-col>
            <!-- 左边 -->
            <a-col :span="8" style="padding-left: 10px">
              <!-- 鞋型日产量 -->
              <dv-border-box-12 :color="borderColor" class="page-two-box-3">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.left.title3')
                }}</div>
                <!-- <VCharts
                  :option="shoeTypeOption"
                  autoresize
                  style="width: 100%; height: 390px"
                ></VCharts> -->
                <dv-scroll-ranking-board
                  :config="shoeTypeOption"
                  class="shoe-type"
                  style="width: 100%; height: 390px"
                />
              </dv-border-box-12>
              <!-- 设备管理 -->
              <dv-border-box-12 :color="borderColor" class="page-two-box-4">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.right.title2')
                }}</div>
                <VCharts
                  :option="deviceOption"
                  autoresize
                  style="width: 100%; height: 390px"
                ></VCharts>
              </dv-border-box-12>
            </a-col>
          </a-row>
        </template>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  import {
    LoadDepartment,
    LoadDeptGroup,
    getEmployeeLeader,
    getProductionLineInfo,
    getHourProductionInfo,
    getCompletionRate,
    getGroupMembers,
    getPPH,
    getEquipmentManagement,
    getProblemTracking,
    getShoesModelYield,
    getQualityManagement,
  } from '@/api/ProcessLineDashboard';

  // 顶部-标题
  const pageTitle = ref<any>('加工线生产看板');
  // 左边-部门领导信息
  const leaderInfo = ref<any>({});
  // 左边-产量信息
  const productionInfo = ref<any>({});
  const productionAchievementRateColor = ref<any>('#FD2104');
  const dayRFTColor = ref<any>('#FD2104');
  // 左边-PPH
  const dayAndMonthPPHOption = ref<any>({ monthPPH: 0, dayPPH: 0 });
  // 左边-鞋型日产量
  const shoeTypeOption = ref<any>({});
  // 中间-生产组别
  const productionGroupOptions = ref<any>([]);
  const productionGroup = ref<any>('');
  const errorMsg = ref<any>('');
  // 中间-每小时生产达成率
  const productionRate = ref<any>({});
  // 中间-当日前五大不良原因
  const qualityManagement = ref<any>({});
  // 中间-品质异常
  const abnormalQuality = ref<any>({});
  // 中间-问题追踪
  const questionTracking = ref<any>({});
  // 中间-未完成度
  const incompleteOption = ref<any>({});
  // 右边-设备管理
  const deviceOption = ref<any>({});
  let devicePercent: any = [];
  let deviceColor: any = [];
  // 右边-组别人员
  const groupMembers = ref<any>({});
  // 刷新数据定时器
  let kanbanTimer: any = 0;
  let pageTimer: any = 0;
  // 刷新频率 5分钟
  const kanbanInterval = 5 * 60 * 1000;
  // 切换页面 2分钟
  const pageInterval = 2 * 60 * 1000;
  // 查询参数
  const queryParam = { departmentCode: '' };
  // 显示第几页面
  const showPage = ref<number>(1);
  // 边框颜色
  const borderColor = ref<any>(['#2E6099', '#0EE4F9']);

  // 公共-停止定时器
  function stopInterval() {
    clearInterval(kanbanTimer);
    clearInterval(pageTimer);
    kanbanTimer = 0;
    pageTimer = 0;
  }

  // 左边-获取生产线基本信息
  // 左边-获取部门领导信息
  const getLeaderInfo = async () => {
    leaderInfo.value = reactive({
      zz: '',
      bz: '',
      fl: '',
    });
    const result = await getEmployeeLeader(queryParam);
    // console.log(result.data);
    if (result.data && result.data.length > 0) {
      const leader = result.data[0];
      const zzName = leader.ZZ_NAME === null ? '' : leader.ZZ_NAME;
      const bzName = leader.BZ_NAME === null ? '' : leader.BZ_NAME;
      const flName = leader.FL_NAME === null ? '' : leader.FL_NAME;
      const zzPhone = leader.ZZ_PHONE === null ? '' : leader.ZZ_PHONE;
      const bzPhone = leader.BZ_PHONE === null ? '' : leader.BZ_PHONE;
      const flPhone = leader.FL_PHONE === null ? '' : leader.FL_PHONE;
      leaderInfo.value.zz = `${zzName} ${zzPhone}`;
      leaderInfo.value.bz = `${bzName} ${bzPhone}`;
      leaderInfo.value.fl = `${flName} ${flPhone}`;
    }
  };

  // 左边-获取产量信息
  const getProductionInfo = async () => {
    productionInfo.value = reactive({
      workQty: 0,
      labelQty: 0,
      percentRate: 0,
      rft: 0,
    });
    const result = await getProductionLineInfo(queryParam);
    // console.log(result);
    if (result.data) {
      // 产量日目标:
      productionInfo.value.workQty = result.data.workQty;
      // 实际日产量
      productionInfo.value.labelQty = result.data.labelQty;
      // 产量达成率
      productionInfo.value.percentRate = result.data.percentRate;
      // 日rft
      productionInfo.value.rft = result.data.rft;
      productionAchievementRateColor.value =
        result.data.percentRate >= 100 ? '#0AF60A' : '#FD2104';
      dayRFTColor.value = result.data.rft >= 100 ? '#0AF60A' : '#FD2104';
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
  };

  // 左边-获取PPH
  const getDayAndMonthPPH = async () => {
    const result = await getPPH(queryParam);
    // console.log(result);
    if (result.data) {
      dayAndMonthPPHOption.value.dayPPH = result.data.day_pph;
      dayAndMonthPPHOption.value.monthPPH = result.data.month_pph;
    }
  };

  // 左边-获取鞋型日产量
  // 左边-鞋型日产量图形初始化
  shoeTypeOption.value = reactive({
    data: [],
    rowNum: [4],
    waitTime: 5000,
    fontSize: 28,
    color: '#0272FC',
    unit: 'pair',
  });

  const getShoeTypeProduction = async () => {
    shoeTypeOption.value.data = [];
    const datas: any = [];
    const result = await getShoesModelYield(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        datas.push({
          name: item.NAME_T,
          value: item.LABEL_QTY,
        });
      });
    }
    shoeTypeOption.value.data = datas;
  };

  // 中间-生产组别
  const getProductionGroup = async () => {
    productionGroupOptions.value = [];
    const userDept = await LoadDepartment();
    if (!userDept.status) {
      errorMsg.value = userDept.msg;
      return;
    }
    // console.log(userDept);
    const result = await LoadDeptGroup();
    const options: any = [];
    if (result.data) {
      let title = '';
      result.data.forEach((item: any) => {
        options.push({
          value: item.DEPARTMENT_CODE,
          name: item.DEPARTMENT_NAME,
        });
        if (userDept.data === item.DEPARTMENT_CODE) {
          title = item.DEPARTMENT_NAME;
        }
      });
      productionGroupOptions.value = options;
      productionGroup.value = userDept.data;
      queryParam.departmentCode = userDept.data;
      if (title) {
        pageTitle.value = `${title}`; // 看板
      }
      loadData();
    }
  };

  // 中间-获取每小时生产达成率
  productionRate.value = reactive({
    header: [
      'Time',
      'Target',
      'Actual',
      'TQC Defect',
      'Product %',
      'RFT %',
      'Working hour',
      'PPH',
      'Line time',
    ],
    data: [],
    index: false,
    columnWidth: [220, 130, 130, 190, 160, 160, 220, 130, 160],
    align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
    rowNum: [10],
    indexHeader: ['No.'],
    waitTime: 3000000000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });

  const getHourProductionRate = async () => {
    productionRate.value.data = [];
    const result = await getHourProductionInfo(queryParam);
    const data: any = [];
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        const targetOutput = `<span style="color:#fe7007">${item.target_output}</span>`;
        const actualOutput = `<span style="color:#0AF60A">${item.actual_output}</span>`;
        const doneColor =
          item.completion_percentage >= 100 ? '#0AF60A' : '#FD2104';
        const doneRate = `<span style="color:${doneColor}">${item.completion_percentage}</span>`;
        const rftColor = item.rft >= 100 ? '#0AF60A' : '#FD2104';
        const rft = `<span style="color:${rftColor}">${item.rft}</span>`;
        data.push([
          `${item.start}~${item.end}`,
          targetOutput,
          actualOutput,
          item.defective_qty,
          doneRate,
          rft,
          item.operator_person_hour,
          item.pph,
          item.stop_line_minutes,
        ]);
      });
    }
    productionRate.value.data = data;
  };

  // 中间-获取品质管理-当日前五大不良原因
  qualityManagement.value = reactive({
    header: ['Inspection items', 'No. defect', 'Defect rate'],
    data: [],
    index: false,
    columnWidth: [770, 230, 230],
    align: ['center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['No.'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 50,
  });

  // 中间-获取品质异常
  abnormalQuality.value = reactive({
    header: [
      'Month',
      '<div style="line-height: 1.2;"><div>Internal</div><div>Batch</div></div>',
      '<div style="line-height: 1.2;"><div>Internal</div><div>Abnormal</div></div>',
      '<div style="line-height: 1.2;"><div>Internal</div><div>Major</div></div>',
      '<div style="color:#32C5E9;line-height: 1.2;"><div>External</div><div>Batch</div></div>',
      '<div style="color:#32C5E9;line-height: 1.2;"><div>External</div><div>Abnormal</div></div>',
      '<div style="color:#32C5E9;line-height: 1.2;"><div>External</div><div>Major</div></div>',
    ],
    data: [],
    index: false,
    // columnWidth: [230, 109, 110],
    align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
    rowNum: [5],
    indexHeader: ['No.'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 75,
  });

  const getQualityManagements = async () => {
    qualityManagement.value.data = [];
    abnormalQuality.value.data = [];
    const fiveReasonData: any = [];
    const abnormalData: any = [];
    const result = await getQualityManagement(queryParam);
    // console.log(result);
    if (result.data) {
      const abnormanQty = result.data.abnormal_qty;
      const fiveReasonsDefects = result.data.five_reasons_defects;
      if (abnormanQty && abnormanQty.length > 0) {
        const colors = ['#FAC858', '#FE7007', '#FD2104'];
        abnormanQty.forEach((item: any) => {
          const insideBatchQty =
            item.batch_qty_inside === 0
              ? ''
              : `<span style="color:${colors[0]}">${item.batch_qty_inside}</span>`;
          const insideBoxesQty =
            item.boxes_qty_inside === 0
              ? ''
              : `<span style="color:${colors[1]}">${item.boxes_qty_inside}</span>`;
          const insideHugeQty =
            item.huge_qty_inside === 0
              ? ''
              : `<span style="color:${colors[2]}">${item.huge_qty_inside}</span>`;
          const outsideBatchQty =
            item.batch_qty_outside === 0
              ? ''
              : `<span style="color:${colors[0]}">${item.batch_qty_outside}</span>`;
          const ousideBoxesQty =
            item.boxes_qty_outside === 0
              ? ''
              : `<span style="color:${colors[1]}">${item.boxes_qty_outside}</span>`;
          const ousideHugeQty =
            item.huge_qty_outside === 0
              ? ''
              : `<span style="color:${colors[2]}">${item.huge_qty_outside}</span>`;
          abnormalData.push([
            item.month,
            insideBatchQty,
            insideBoxesQty,
            insideHugeQty,
            outsideBatchQty,
            ousideBoxesQty,
            ousideHugeQty,
          ]);
        });
      }
      if (fiveReasonsDefects && fiveReasonsDefects.length > 0) {
        fiveReasonsDefects.forEach((item: any) => {
          fiveReasonData.push([item.INSPECTION_NAME, item.NUM, item.RATE]);
        });
      }
    }
    qualityManagement.value.data = fiveReasonData;
    abnormalQuality.value.data = abnormalData;
  };

  // 中间-获取问题追踪
  questionTracking.value = reactive({
    header: ['Question No.', 'Question item', 'Responsible unit', 'Person charge', 'Issue date'],
    data: [],
    index: false,
    columnWidth: [125, 190, 100, 90, 130],
    align: ['center', 'center', 'center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['No.'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });

  // 中间-获取未完成度
  incompleteOption.value = reactive({
    color: ['#FAC858', '#E9E9E9'],
    title: [
      {
        text: '',
        top: '40%',
        textAlign: 'center',
        left: '50%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 28,
        },
      },
      {
        text: 'In complete',
        top: '53%',
        textAlign: 'center',
        left: '50%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 18,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['65%', '85%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        selectedMode: 'single',
        selectedOffset: 5,
        data: [],
      },
    ],
  });

  function getIncompleteData(dayRate: any) {
    const data: any = [];
    data.push({ name: 'Completed', value: dayRate });
    data.push({ name: 'Close', value: 100 - dayRate });
    incompleteOption.value.title[0].text = `${dayRate} %`;
    incompleteOption.value.series[0].data = data;
  }

  const getQuestionTracking = async () => {
    questionTracking.value.data = [];
    const data: any = [];
    const result = await getProblemTracking(queryParam);
    // console.log(result);
    if (result.data) {
      const questionData = result.data.dt;
      if (questionData && questionData.length > 0) {
        questionData.forEach((item: any) => {
          data.push([
            item.QID,
            item.TXT,
            item.PLANT_NAME,
            item.UNIT_OWNER_NAME,
            item.ASK_DATE,
          ]);
        });
      }
      if (result.data.rate != null) {
        getIncompleteData(result.data.rate);
      }
    }
    questionTracking.value.data = data;
  };

  // 右边-获取组别人员
  groupMembers.value = reactive({
    radius: '85%',
    activeRadius: '90%',
    showOriginValue: true,
    digitalFlopStyle: { fontSize: 32 },
    data: [],
  });

  const getGroupMemberInfo = async () => {
    groupMembers.value.data = [];
    const result = await getGroupMembers(queryParam);
    // console.log(result);
    if (result.data) {
      const skillWorkers = result.data.skill_workers;
      const jockeyWorks = result.data.jockey_works;
      const waterSpider = result.data.water_spider;
      if (skillWorkers >= 0 && jockeyWorks >= 0 && waterSpider >= 0) {
        const data: any = [];
        data.push({ name: 'Skill Worker', value: result.data.skill_workers });
        data.push({ name: 'Operator', value: result.data.jockey_works });
        data.push({ name: 'Material No.', value: result.data.water_spider });
        groupMembers.value.data = data;

        console.log(data);
      }
      else {
        console.log("Data not found");
      }
      
    }
    // console.log('Data Group Member: ',result.data);
  };

  // 右边-获取设备管理
  deviceOption.value = reactive({
    grid: {
      top: '2%',
      bottom: '2%',
      right: '13%',
      left: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: [],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 36,
      },
      splitLine: {
        lineStyle: {
          color: '#353A46',
        },
      },
    },
    series: [
      {
        data: [],
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        barWidth: '60%',
        barGap: '-100%',
        silent: true,
        itemStyle: {
          normal: {
            color: 'rgb(38,57,73)',
            barBorderRadius: 20,
          },
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 36,
          color: '#ffffff',
          formatter: (a: any) => {
            return `${devicePercent[a.dataIndex]}%`;
          },
        },
      },
      {
        data: [],
        type: 'bar',
        barWidth: '60%',
        emphasis: {
          disabled: true,
          focus: 'none',
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color(params: any) {
              return deviceColor[params.dataIndex];
            },
          },
        },
        label: {
          show: true,
          fontSize: 36,
          color: '#ffffff',
          position: 'inside',
        },
      },
    ],
  });

  const getDevices = async () => {
    devicePercent = [];
    deviceColor = [];
    deviceOption.value.yAxis.data = [];
    deviceOption.value.series[0].data = [];
    deviceOption.value.series[1].data = [];
    const result = await getEquipmentManagement(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      const deviceName: any = [];
      const deviceSum: any = [];
      const deviceValue: any = [];
      let data: any = [];
      data = result.data;
      data.reverse();
      data.forEach((item: any) => {
        deviceName.push(item.DEVICE_NAME);
        deviceValue.push(item.NUM);
        deviceSum.push(item.TOTAL);
        devicePercent.push(item.RATE);
        switch (item.DEVICE_NAME) {
          case 'In use':
          case 'Borrow':
            deviceColor.push('#0272FC');
            break;
          case 'Maintenance':
          case 'Waiting repair':
            deviceColor.push('#EC808D');
            break;
          case 'Idle':
            deviceColor.push('#7F7F7F');
            break;
          case 'Reject':
            deviceColor.push('#B50B24');
            break;
          default:
            deviceColor.push('#0272FC');
            break;
        }
      });
      deviceOption.value.yAxis.data = deviceName;
      deviceOption.value.series[0].data = deviceSum;
      deviceOption.value.series[1].data = deviceValue;
    }
  };

  // 加载数据
  function loadData() {
    getLeaderInfo();
    getProductionInfo();
    getDayAndMonthPPH();
    getShoeTypeProduction();
    getHourProductionRate();
    getQualityManagements();
    // getQuestionTracking();
    getGroupMemberInfo();
    getDevices();
    kanbanTimer = setInterval(() => {
      getProductionInfo();
      getDayAndMonthPPH();
      getShoeTypeProduction();
      getHourProductionRate();
      getQualityManagements();
      // getQuestionTracking();
      getGroupMemberInfo();
      getDevices();
    }, kanbanInterval);
    pageTimer = setInterval(() => {
      showPage.value = showPage.value === 1 ? 2 : 1;
    }, pageInterval);
  }

  // 组件事件
  // 中间-生产组别选择事件
  function handleChangeProGroup(val: any) {
    queryParam.departmentCode = productionGroup.value;
    const obj = productionGroupOptions.value.find((item: any) => {
      return item.value === productionGroup.value;
    });
    pageTitle.value = `${obj.name}`;
    stopInterval();
    loadData();
  }

  onMounted(() => {
    getProductionGroup();
  });

  onBeforeUnmount(() => {
    stopInterval();
  });
</script>

<style lang="less" scoped>
  .full {
    background-color: black;
    background-size: cover;
  }

  .container {
    position: fixed;
    top: 125px;
    width: 1920px;
    height: 985px;
    background-color: black;
    padding-left: 11px;
    padding-right: 15px;
  }

  .container-row {
    height: 985px;
    padding: 0 !important;
    margin: 0 !important;
  }

  :deep(.header-center-decoration) {
    margin-top: 36px !important;
  }

  :deep(.header-left-decoration) {
    margin-top: 15px !important;
  }

  :deep(.header-right-decoration) {
    margin-top: 15px !important;
  }

  :deep(.hd-right-time) {
    font-size: 30px !important;
  }

  .flex-1 {
    flex: 1;
  }

  .vertical-line {
    position: relative;
    padding-left: 12px;
    margin-bottom: 15px;
    color: #0ee4f9;
    font-size: 32px;
    font-weight: bold;
  }

  .vertical-line:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: #0ee4f9;
    border-radius: 5px;
  }

  .padding-15 {
    padding: 15px;
  }

  .padding-leftright-0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .page-one-box-1 {
    margin-bottom: 15px;
    width: 476px;
    height: 208px;
    padding: 15px;
  }

  .page-one-box-2 {
    margin-bottom: 15px;
    width: 476px;
    height: 335px;
    padding: 15px;
    :deep(.dv-digital-flop) {
      height: 60px !important;
    }

    :deep(.active-ring-name) {
      height: 36px !important;
    }
  }

  .page-one-box-3 {
    margin-bottom: 15px;
    width: 476px;
    height: 370px;
    padding: 15px;
    .box-content {
      height: 285px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .box-title {
      color: #0bf8fe;
      font-size: 36px;
      text-align: center;
      margin-bottom: 18px;
    }

    .border-1 {
      width: 200px;
      height: 200px;
      background: url(@/assets/images/circle1.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .page-one-box-4 {
    margin-bottom: 15px;
    width: 1408px;
    height: 208px;
    padding: 15px;
  }

  .page-one-box-5 {
    margin-bottom: 15px;
    width: 1408px;
    height: 720px;
    padding: 15px;
  }

  .page-two-box-1 {
    margin-bottom: 15px;
    width: 1263px;
    height: 465px;
    padding: 15px;
  }

  .page-two-box-2 {
    margin-bottom: 15px;
    width: 1263px;
    height: 465px;
    padding: 15px;
  }

  .page-two-box-3 {
    margin-bottom: 15px;
    width: 626px;
    height: 465px;
    padding: 15px;
  }

  .page-two-box-4 {
    margin-bottom: 15px;
    width: 626px;
    height: 465px;
    padding: 15px;
  }

  .shoe-type {
    :deep(.rank) {
      display: none;
    }
    :deep(.inside-column) {
      border-radius: 5px !important;
      margin-bottom: 0 !important;
      height: 22px !important;
    }

    :deep(.ranking-column) {
      border-bottom: 0;
      border-radius: 5px;
      background-color: #263949;
    }

    :deep(.info-name) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-item {
    margin-left: 10px;
    margin-right: 10px;
  }

  .border-title {
    color: #0efff8;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .border-value {
    font-size: 36px;
    color: white;
    text-align: center;
    font-weight: bold;
  }

  .selector-title {
    color: white;
    font-size: 30px;
    display: flex;
    :deep(.arco-select-view-value) {
      font-size: 20px !important;
    }
  }

  .person-box {
    display: flex;
    flex-direction: row;
    width: auto;
    color: white;
    text-align: center;
    height: auto;
    line-height: 63px;
    font-size: 40px;

    div {
      flex: 1;
      background-color: #0c244d;
      font-size: 50%;
    }
  }

  .production-box {
    display: flex;
    flex-direction: row;
    width: 97.5%;
    color: white;
    margin-top: 10px;
    padding-left: 6px;
    padding-right: 6px;
    .sub {
      flex: 1;
      text-align: center;
      background: #0d2742;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      border: 1px solid #0e94eb;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .production-info {
    line-height: 1.5;
    :deep(.arco-statistic-title) {
      color: #0efff8;
      font-size: 38px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    :deep(.arco-statistic-value) {
      font-weight: bold;
    }

    :deep(.arco-statistic-value-integer),
    :deep(.arco-statistic-value-decimal) {
      font-size: 58px;
    }

    :deep(.arco-statistic-suffix) {
      font-size: 38px;
    }
  }

  .pph-info {
    :deep(.arco-statistic-title) {
      color: #0efff8;
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    :deep(.arco-statistic-value) {
      text-align: center;
      font-weight: bold;
      color: #ffffff;
    }

    :deep(.arco-statistic-value-integer),
    :deep(.arco-statistic-value-decimal) {
      font-size: 48px;
    }
  }

  .mark {
    background: #f2f2f2;
    width: 3.5rem;
    height: 3rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    line-height: 1.1;
    text-align: center;
    position: absolute;
    top: -1.85rem;
    right: -2.1rem;
    transform: rotate(45deg);
  }

  .production-rate {
    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
    }
    :deep(.ceil) {
      padding: 0 2px;
      font-size: 34px;
    }
  }

  .quality-info {
    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.ceil) {
      padding: 0 2px;
      font-size: 34px;
    }
  }

  .quality-info2 {
    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.ceil) {
      padding: 0 2px;
      font-size: 33px;
    }
  }

  .abnormal-quality {
    height: 205px;
    overflow-y: hidden;
    :deep(.arco-table-th) {
      font-size: 13px;
    }

    :deep(.arco-table-cell) {
      padding: 1px 2px;
    }
  }

  .tracking-info {
    :deep(.header-item) {
      padding: 0 2px;
    }

    :deep(.ceil) {
      padding: 0 2px;
    }
  }

  .order-info {
    :deep(.header-item) {
      padding: 0 2px;
    }

    :deep(.ceil) {
      padding: 0 2px;
      color: red;
    }
  }
</style>
