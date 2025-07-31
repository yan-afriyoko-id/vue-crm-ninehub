<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" style="max-height: 100vh;" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          {{ mode === 'create' ? 'Add New' : 'Edit' }} {{ section }}
        </h3>
        <button @click="$emit('close')" class="close-button">
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
        <CompanyForm v-if="section === 'companies'" :item="item" @submit="emit('save', $event)" />

        <ContactForm v-if="section === 'contacts'" :item="item" :companies="companies" @submit="emit('save', $event)" />

        <LeadForm v-if="section === 'leads'" :item="item" :contacts="contacts" @submit="emit('save', $event)" />
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" type="button" class="cancel-button">
          Cancel
        </button>
        <button @click="handleSubmit" type="button" class="save-button">
          <SaveIcon class="w-4 h-4" />
          {{ mode === 'create' ? 'Create' : 'Update' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon, SaveIcon } from 'lucide-vue-next'
import CompanyForm from './Forms/CompanyForm.vue'
import ContactForm from './Forms/ContactForm.vue'
import LeadForm from './Forms/LeadForm.vue'


const props = defineProps({
  show: Boolean,
  mode: String,
  section: String,
  item: Object,
  companies: { type: Array, default: () => [] },
  contacts: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'save'])

const handleOverlayClick = () => {
  emit('close')
}

const handleSubmit = () => {
  const form = document.querySelector('.modal-body form');
  if (form && form.checkValidity()) {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  } else {
    form.reportValidity();
  }
}

</script>
