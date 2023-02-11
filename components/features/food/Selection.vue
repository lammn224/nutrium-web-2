<template>
  <div class="form-group m-form__group mt-4">
    <b-input-group>
      <template #prepend>
        <b-input-group-text>
          <i class="flaticon-search"></i>
        </b-input-group-text>
      </template>
      <b-form-input
        v-model="search"
        placeholder="Tìm kiếm..."
        debounce="500"
      ></b-form-input>
    </b-input-group>

    <perfect-scrollbar class="mt-4" style="height: 200px; margin-top: 20px">
      <b-form-group label="" label-size="lg">
        <b-form-checkbox-group v-model="foodChecked" size="lg">
          <div class="row container-fluid">
            <div
              v-for="item in filteredList"
              :key="item._id"
              class="col-md-6 mb-1"
            >
              <b-form-checkbox :value="item._id">
                {{ item.name }}
              </b-form-checkbox>
            </div>
          </div>
        </b-form-checkbox-group>
      </b-form-group>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'FoodSelection',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    foodList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // foodList: [],
      foodChecked: [],
      search: '',
    }
  },
  computed: {
    filteredList() {
      return this.foodList.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  watch: {
    foodChecked(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.foodChecked = newVal
    },
  },
  created() {
    this.foodChecked = this.value
  },
  // mounted() {
  //   this.loadData()
  // },
  // methods: {
  //   async loadData() {
  //     try {
  //       const { data } = await this.$axios.get('/foods/all')
  //       this.foodList = data
  //     } catch (e) {}
  //   },
  // },
}
</script>
