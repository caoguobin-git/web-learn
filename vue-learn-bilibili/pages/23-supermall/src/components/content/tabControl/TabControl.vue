<template>
  <div class="tab-control">
    <div @click="itemClick(index)" :class="{active:currentIndex=== index }" class="tab-control-item"
         v-for="(item,index) in titles">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    isActive() {
      return true;
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('changeTabControl',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 40px;
  font-size: 14px;
  background: #fff;
}

.tab-control-item {
  flex: 1;
  font-weight: 600;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
  padding: 5px;
}
</style>
