<template>
  <div class="sidebar-item-container">
    <button
      @click="$emit('click')"
      :class="[
        'sidebar-item',
        isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
      ]"
    >
      <div class="sidebar-item-icon">
        <component :is="item.icon" class="w-5 h-5" />
      </div>
      <span class="sidebar-item-text">{{ item.label }}</span>
      <div v-if="isActive" class="sidebar-item-indicator"></div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>
