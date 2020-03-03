<template>
  <div>
    <h5>
      {{arrival.stop_destination}}
      {{arrival.destination}}
    </h5>
    <p>
      {{ arrival.departure_time}}
    </p>
    <p>
      {{arrival.arrival_time}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TrainArrival',
  props: {
    arrival: {type: Object}
  }
}
</script>

<style>

</style>