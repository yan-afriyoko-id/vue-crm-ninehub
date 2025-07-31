<template>
  <form @submit.prevent="$emit('submit', formData)" class="form-container">
    <div class="form-group">
      <label class="form-label">
        <UserIcon class="w-4 h-4" />
        First Name
      </label>
      <input v-model="formData.first_name" type="text" required class="form-input" placeholder="e.g., Budi" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <UserIcon class="w-4 h-4" />
        Last Name
      </label>
      <input v-model="formData.last_name" type="text" class="form-input" placeholder="e.g., Santoso" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <MailIcon class="w-4 h-4" />
        Email
      </label>
      <input v-model="formData.email" type="email" required class="form-input" placeholder="e.g., budi@example.com" />
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
        <BriefcaseIcon class="w-4 h-4" />
        Title
      </label>
      <input v-model="formData.job_title" type="text" class="form-input" placeholder="e.g., Marketing Manager" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <BuildingIcon class="w-4 h-4" />
        Company
      </label>
      <select v-model="formData.company_id" required class="form-select">
        <option value="">Select Company</option>
        <option v-for="company in companies" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { UserIcon, MailIcon, PhoneIcon, BriefcaseIcon, BuildingIcon } from 'lucide-vue-next'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  companies: {
    type: Array,
    required: true
  }
})

defineEmits(['submit'])

const formData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  job_title: '',
  company_id: ''
})

watch(() => props.item, (newItem) => {
  if (newItem) {
    Object.assign(formData, newItem)
  }
}, { immediate: true })
</script>
