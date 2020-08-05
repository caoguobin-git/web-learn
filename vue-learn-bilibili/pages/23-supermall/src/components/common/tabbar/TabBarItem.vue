<template>
  <div @click="itemClick" class="tab-bar-item">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  data() {
    return {}
  },
  methods: {
    itemClick() {
      if (!this.isActive){
        this.$router.replace(this.path);
      }
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {color: 'black'}
    }
  }
}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  padding-top: 3px;
  border-radius: 10px;
}

.tab-bar-item img {
  height: 22px;
  width: 22px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}

</style>
