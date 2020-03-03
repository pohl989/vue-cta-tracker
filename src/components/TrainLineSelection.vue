<template>
  <div >
      <div class="train-selection">
        <div
          class="train"
          :style="{'background-color': line.background_color}"
          v-for="line in trainLines"
          :key="line.code"
          :class="{'train--active': selectedTrain === line.code}"
          @click="selectTrain(line.code)"
        >
         <p>
           {{line.name}} Line
          </p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "TrainLineSelection",
  data: function() {
    return {
      selectedTrain: null
    }
  },
  props: {
    trainLines: {
      type: Array, required: true
    }
  },
  methods: {
    selectTrain: function(lineCode) {
      this.selectedTrain = lineCode
    },
    trainSlotName: function(lineCode) {
      return `train-line-${lineCode}`
    }
  }
}
</script>

<style>
.train {
  cursor: pointer;
  height: 8vmin;
  font-size: 4vmin;
  padding: 2vmin;
}
.train--active {
  border: 1px solid black; 
  color: white;
}
</style>