<template>
  <FontAwesomeIcon :icon="icon" />
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  name: "TheIcon",
  components: { FontAwesomeIcon },
  props: { icon: {type: String, required: true}}
}
</script>

<style>

</style>