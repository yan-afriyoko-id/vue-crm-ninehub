<template>
  <form @submit.prevent="$emit('submit', formData)" class="form-container">
    <div class="form-group">
      <label class="form-label">
        <UserIcon class="w-4 h-4" />
        Lead Name
      </label>
      <input v-model="formData.name" type="text" required class="form-input" placeholder="e.g., Proyek Website Baru" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <MailIcon class="w-4 h-4" />
        Email
      </label>
      <input v-model="formData.email" type="email" class="form-input" placeholder="e.g., lead@example.com" />
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
        <GlobeIcon class="w-4 h-4" />
        Source
      </label>
      <select v-model="formData.source" required class="form-select">
        <option value="">Select Source</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Cold Call">Cold Call</option>
        <option value="Event">Event</option>
        <option value="Social Media">Social Media</option>
        <option value="Instagram Ads">Instagram Ads</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">
        <CheckCircleIcon class="w-4 h-4" />
        Status
      </label>
      <select v-model="formData.status" required class="form-select">
        <option value="">Select Status</option>
        <option value="Baru">Baru</option>
        <option value="Terkualifikasi">Terkualifikasi</option>
        <option value="Tidak Terkualifikasi">Tidak Terkualifikasi</option>
        <option value="Konversi">Konversi</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">
        <DollarSignIcon class="w-4 h-4" />
        Potential Value (IDR)
      </label>
      <input v-model.number="formData.potential_value" type="number" min="0" class="form-input"
        placeholder="e.g., 15000000" />
    </div>

    <div class="form-group">
      <label class="form-label">
        <UsersIcon class="w-4 h-4" />
        Related Contact
      </label>
      <select v-model="formData.contact_id" class="form-select">
        <option value="">Select Contact (Optional)</option>
        <option v-for="contact in contacts" :key="contact.id" :value="contact.id">
          {{ contact.full_name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">
        <FileTextIcon class="w-4 h-4" />
        Notes
      </label>
      <textarea v-model="formData.notes" class="form-textarea" rows="3"
        placeholder="Add any relevant notes..."></textarea>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import {
  UserIcon, MailIcon, PhoneIcon, GlobeIcon,
  CheckCircleIcon, DollarSignIcon, UsersIcon, FileTextIcon
} from 'lucide-vue-next'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  contacts: {
    type: Array,
    required: true
  }
})

defineEmits(['submit'])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  source: '',
  status: '',
  potential_value: 0,
  notes: '',
  contact_id: ''
})

watch(() => props.item, (newItem) => {
  if (newItem) {
    Object.assign(formData, newItem)
  }
}, { immediate: true })


</script>
