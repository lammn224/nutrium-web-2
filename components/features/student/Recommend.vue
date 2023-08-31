<template>
  <div>
    <div v-if="mealCompilation">
      <div class="font-size-lg">
        Hiện tại bạn đang được khuyến nghị nạp lượng calo
        <span class="font-weight-bold">{{ student.rcmCalories }}</span>
        (kcal)/ngày để đáp ứng cho cơ thể có nhu cầu hoạt động thể lực:
        <span class="font-weight-bold">
          {{ ACTIVITY.get(student.activityType) }}</span
        >, tương đương đốt cháy khoảng
        <span class="font-weight-bold">{{
          (
            student.rcmCalories -
            student.rcmCalories / ACTIVITY_TYPE.get(student.activityType)
          ).toFixed(2)
        }}</span>
        (calo/ngày)
        <br />
        <br />
        <div>
          Hôm nay đã lên thực đơn tổng cộng
          <span class="font-weight-bold">{{ mealCompilation.totalPower }}</span>
          (kcal).
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-4">
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Giữ nguyên</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmCalories
                }}</span>
                <span class="font-size-xs">(100%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
        </div>
        <div class="col-8">
          {{ mealCompilation.recommendStable }}
        </div>
      </div>
      <hr class="w-100 d-block" />
      <div class="row">
        <div class="col-4">
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Tăng cân nhẹ</div>
              <div class="text-muted">(0.25kg/tuần)</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmMildWeightGainCalories
                }}</span>
                <span class="font-size-xs">(112%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Tăng cân</div>
              <div class="text-muted">(0.5kg/tuần)</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmWeightGainCalories
                }}</span>
                <span class="font-size-xs">(123%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Tăng cân nhanh</div>
              <div class="text-muted">(1kg/tuần)</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmFastWeightGainCalories
                }}</span>
                <span class="font-size-xs">(147%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div>Với nhu cầu tăng cân:</div>
          <div>
            -
            {{ mealCompilation.recommendMildWeightGain }}
          </div>
          <div>- {{ mealCompilation.recommendWeightGain }}</div>
          <div>
            -
            {{ mealCompilation.recommendFastWeightGain }}
          </div>
        </div>
      </div>

      <hr class="w-100 d-block" />
      <div class="row">
        <div class="col-4">
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Giảm cân nhẹ</div>
              <div class="text-muted">(0.25kg/tuần)</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmMildWeightLossCalories
                }}</span>
                <span class="font-size-xs">(88%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
          <div class="d-flex align-items-center p-2">
            <div class="bg-secondary text-center p-2 w-50">
              <div class="font-weight-bold font-size-lg">Giảm cân</div>
              <div class="text-muted">(0.5kg/tuần)</div>
            </div>
            <div class="triangle-right"></div>
            <div class="bg-primary text-center text-white py-2 w-50">
              <div>
                <span class="font-weight-bold font-size-lg">{{
                  student.rcmWeightLossCalories
                }}</span>
                <span class="font-size-xs">(77%)</span>
              </div>
              <div class="text-white-50">(kcal/ngày)</div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div>Với nhu cầu tăng cân:</div>
          <div>
            -
            {{ mealCompilation.recommendMildWeightLoss }}
          </div>
          <div>- {{ mealCompilation.recommendWeightLoss }}</div>
        </div>
      </div>
    </div>
    <div v-else>Chưa đủ thông tin các bữa ăn để đưa khuyến nghị</div>
  </div>
</template>

<script>
import { ACTIVITY, ACTIVITY_TYPE } from '~/constants/activity-type.constant'

export default {
  name: 'RecommendText',
  props: {
    mealCompilation: {
      type: Object,
      default: null,
    },
    student: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ACTIVITY_TYPE() {
      return ACTIVITY_TYPE
    },
    ACTIVITY() {
      return ACTIVITY
    },
  },
}
</script>

<style scoped>
.triangle-right {
  width: 0;
  height: 0;
  border-left: 10px solid #e4e6ef;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
</style>
