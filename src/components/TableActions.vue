<template>
  <div class="action-buttons">
    <button 
      @click="$emit('edit')" 
      class="action-button edit-button"
      title="Edit"
    >
      <EditIcon class="w-4 h-4" />
    </button>
    <button 
      @click="$emit('delete')" 
      class="action-button delete-button"
      title="Delete"
    >
      <TrashIcon class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import { EditIcon, TrashIcon } from 'lucide-vue-next'

defineEmits(['edit', 'delete'])
</script>
