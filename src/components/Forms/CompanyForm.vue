<template>
  <form @submit.prevent="$emit('submit', formData)" class="form-container">
    <div class="form-group">
      <label class="form-label">
        <BuildingIcon class="w-4 h-4" />
        Company Name
      </label>
      <input v-model="formData.name" type="text" required class="form-input" placeholder="e.g., PT. Maju Mundur" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <IndustryIcon class="w-4 h-4" />
        Industry
      </label>
      <input v-model="formData.industry" type="text" required class="form-input"
        placeholder="e.g., Technology, Finance" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <PhoneIcon class="w-4 h-4" />
        Phone
      </label>
      <input v-model="formData.phone" type="tel" class="form-input" placeholder="e.g., +628123456789" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <PhoneIcon class="w-4 h-4" />
        Email
      </label>
      <input v-model="formData.email" type="email" class="form-input" placeholder="example@gmail.com" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <MapPinIcon class="w-4 h-4" />
        Address
      </label>
      <textarea v-model="formData.address" class="form-textarea" rows="2"
        placeholder="e.g., Jl. Sudirman No. 123"></textarea>
    </div>

    <div class="form-group">
      <label class="form-label">
        <GlobeIcon class="w-4 h-4" />
        Website
      </label>
      <input v-model="formData.website" type="url" class="form-input" placeholder="e.g., https://example.com" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <FileTextIcon class="w-4 h-4" />
        Description
      </label>
      <textarea v-model="formData.description" class="form-textarea" rows="3"
        placeholder="Brief description of the company..."></textarea>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { BuildingIcon, PhoneIcon, MapPinIcon, GlobeIcon, FileTextIcon, TagIcon as IndustryIcon } from 'lucide-vue-next'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['submit'])

const formData = reactive({
  name: '',
  industry: '',
  phone: '',
  email: '',
  address: '',
  website: '',
  description: '',
  user_id: null
})

watch(() => props.item, (newItem) => {
  if (newItem) {
    Object.assign(formData, newItem)
  }
}, { immediate: true })
</script>
