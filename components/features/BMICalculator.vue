<template>
  <div class="card-body">
    <!--    <div class="card-header py-3 bg-primary text-center">-->
    <!--      <div class="card-title align-items-start flex-column">-->
    <!--        <h3 class="card-label font-weight-bolder text-dark">-->
    <!--          Thông tin cá nhân-->
    <!--        </h3>-->
    <!--      </div>-->
    <!--    </div>-->
    <h3 class="bg-primary jumbotron-cus text-center text-inverse-primary">
      <span>BMI Calculator</span>
    </h3>

    <form role="form">
      <div id="metric">
        <div class="form-group">
          <label for="weight_kg">Weight (kg):</label>
          <input
            id="weight_kg"
            v-model="weightKg"
            type="number"
            placeholder="weight in kg"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="height_cm">Height (cm):</label>
          <input
            id="height_cm"
            v-model="heightCm"
            type="number"
            placeholder="height in cm"
            class="form-control"
          />
        </div>
      </div>
    </form>

    <!-- Calculated BMI is shown here -->
    <div class="well text-center">
      <h3 class="text-muted">Calculated BMI</h3>
      <h2>
        <span
          class="label-cus"
          :class="'label-' + catClass"
          :title="catTitle"
          >{{ bmi }}</span
        >
      </h2>
      <h4 class="text-muted">{{ catTitle }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BMICalculator',
  data() {
    return {
      weightKg: null,
      heightCm: null,
      bmi: Number(0).toPrecision(2),
      catClass: 'secondary',
      catTitle: 'Unknown',
    }
  },

  watch: {
    weightKg(newVal) {
      if (newVal) {
        this.bmi = this.heightCm
          ? Math.round(
              ((newVal * 10000) / (this.heightCm * this.heightCm)) * 10
            ) / 10
          : Number(0).toPrecision(2)
      } else {
        this.bmi = Number(0).toPrecision(2)
      }
    },

    heightCm(newVal) {
      if (newVal) {
        this.bmi = newVal
          ? Math.round(((this.weightKg * 10000) / (newVal * newVal)) * 10) / 10
          : Number(0).toPrecision(2)
      } else {
        this.bmi = Number(0).toPrecision(2)
      }
    },

    bmi(newVal) {
      if (newVal) {
        if (newVal <= 24 && newVal >= 19) {
          this.catClass = 'primary'
          this.catTitle = 'Normal'
        } else if (newVal < 19 && newVal > 0) {
          this.catClass = 'danger'
          this.catTitle = 'Underweight'
        } else if (newVal > 24) {
          this.catClass = 'danger'
          this.catTitle = 'Overweight'
        } else {
          this.catClass = 'secondary'
          this.catTitle = 'Unknown'
        }
      } else {
        this.catClass = 'secondary'
        this.catTitle = 'Unknown'
      }
    },
  },
}
</script>

<style>
.jumbotron-cus {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  border-radius: 0.85rem;
}

.label-cus {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
}

.label-secondary {
  background-color: #6c757d;
}

.label-normal {
  background-color: #999;
}

.label-danger {
  background-color: #dc3545;
}

.label-primary {
  background-color: #00b395;
}
</style>
