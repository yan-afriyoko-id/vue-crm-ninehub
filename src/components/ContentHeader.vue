<template>
  <div class="content-header">
    <div class="header-left">
      <h2 class="header-title">{{ section }}</h2>
      <p class="header-subtitle">Manage your {{ section }} data efficiently</p>
    </div>
    <button
      @click="$emit('add-item')"
      class="add-button"
    >
      <PlusIcon class="w-5 h-5" />
      <span>Add {{ section }}</span>
      <div class="button-glow"></div>
    </button>
  </div>
</template>

<script setup>
import { PlusIcon } from 'lucide-vue-next'

defineProps({
  section: {
    type: String,
    required: true
  }
})

defineEmits(['add-item'])
</script>
