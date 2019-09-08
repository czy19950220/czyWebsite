<template>
  <section>
    <figure class="chart-radar">
      <v-chart
        class="chart-radar"
        :options="scoreRadar"
        :init-options="initOptions"
        autoresize
      />
    </figure>
    <p>
      <select v-model="metricIndex">
        <option
          v-for="(metric, index) in metrics"
          :value="index"
          :key="index">{{ metric }}
        </option>
      </select>
      <button
        @click="increase(1)"
        :disabled="isMax"
      >Increase
      </button>
      <button
        @click="increase(-1)"
        :disabled="isMin"
      >Decrease
      </button>
      <input
        id="async"
        type="checkbox"
        v-model="asyncCount"
      >
      <label for="async">Async</label>
    </p>
  </section>
</template>

<script>
  import qs from 'qs'

  export default {
    name: "RadarChart",
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true})
      return {
        options,
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
        asyncCount: false,
        metricIndex: 0,
      }
    },
    computed: {
      scoreRadar() {
        return this.$store.getters.scoreRadar
      },
      metrics() {
        return this.$store.state.scores.map(({name}) => name)
      },
      isMax() {
        let {value, max} = this.$store.state.scores[this.metricIndex]
        return value === max
      },
      isMin() {
        return this.$store.state.scores[this.metricIndex].value === 0
      }
    },
    methods: {
      increase(amount) {
        if (!this.asyncCount) {
          this.$store.commit('increment', {amount, index: this.metricIndex})
        } else {
          this.$store.dispatch('asyncIncrement', {amount, index: this.metricIndex, delay: 500})
        }
      },

    }
  }
</script>

<style scoped>
  .chart-radar {
    height: 75vw;
    width: 100%;
    max-height: 800px;
  }
  figure{
    margin: 0px;
  }
</style>
