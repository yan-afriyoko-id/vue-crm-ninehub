<template>
  <div class="main-content">
    <div class="content-wrapper">
      <div v-if="activeSection !== 'dashboard'">
        <ContentHeader :section="activeSection" @add-item="$emit('open-modal', 'create')" />
      </div>
      <div class="table-container">
        <Dashboard v-if="activeSection === 'dashboard'" @quick-action="handleQuickAction" />

        <CompanyTable v-if="activeSection === 'companies'" :data="companies"
          @edit-item="$emit('open-modal', 'edit', $event)" @delete-item="$emit('delete-item', $event)" />

        <ContactTable v-if="activeSection === 'contacts'" :data="contacts" :companies="companies"
          @edit-item="$emit('open-modal', 'edit', $event)" @delete-item="$emit('delete-item', $event)" />

        <LeadTable v-if="activeSection === 'leads'" :data="leads" :contacts="contacts" :companies="companies"
          @edit-item="$emit('open-modal', 'edit', $event)" @delete-item="$emit('delete-item', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ContentHeader from './ContentHeader.vue'
import CompanyTable from './tables/CompanyTable.vue'
import ContactTable from './tables/ContactTable.vue'
import LeadTable from './tables/LeadTable.vue'
import Dashboard from './Dashboard.vue'

defineProps({
  activeSection: {
    type: String,
    required: true
  },
  companies: {
    type: Array,
    required: true
  },
  contacts: {
    type: Array,
    required: true
  },
  leads: {
    type: Array,
    required: true
  }
})

defineEmits(['open-modal', 'delete-item'])
</script>
