<template>
  <div class="table-wrapper">
    <div class="table-container">
      <table class="data-table">
        <thead class="table-header">
          <tr>
            <th class="table-th">ID</th>
            <th class="table-th">Name</th>
            <th class="table-th">Email</th>
            <th class="table-th">Phone</th>
            <th class="table-th">Source</th>
            <th class="table-th">Status</th>
            <th class="table-th">Potential Value</th>
            <th class="table-th">Notes</th>
            <th class="table-th">Contact</th>
            <th class="table-th">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(lead, index) in data" :key="lead.id" :style="{ animationDelay: `${index * 0.1}s` }"
            class="table-row">
            <td class="table-td">
              <div class="id-badge">{{ lead.id }}</div>
            </td>
            <td class="table-td">
              <div class="name-cell">
                <div class="name-icon">
                  <BriefcaseIcon class="w-4 h-4" />
                </div>
                <span class="name-text">{{ lead.name }}</span>
              </div>
            </td>
            <td class="table-td">
              <div class="email-cell">
                <MailIcon class="w-4 h-4 text-slate-400" />
                <span class="email-text">{{ lead.email }}</span>
              </div>
            </td>
            <td class="table-td">{{ lead.phone }}</td>
            <td class="table-td">{{ lead.source }}</td>
            <td class="table-td">
              <StatusBadge :status="lead.status" />
            </td>
            <td class="table-td">
              <span class="potential-value-text">{{ formatCurrency(lead.potential_value) }}</span>
            </td>
            <td class="table-td">
              <span class="contact-name-text">{{ lead.notes }}</span>
            </td>
            <td class="table-td">
              <span class="company-name-text">{{ lead.contact.full_name }}</span>
            </td>
            <td class="table-td">
              <TableActions @edit="$emit('edit-item', lead)" @delete="$emit('delete-item', lead.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { MailIcon, BriefcaseIcon } from 'lucide-vue-next'
import TableActions from '../TableActions.vue'
import StatusBadge from '../StatusBadge.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  contacts: {
    type: Array,
    required: true
  },
  companies: {
    type: Array,
    required: true
  }
})

defineEmits(['edit-item', 'delete-item'])

const getContactName = (contactId) => {
  const contact = props.contacts.find(c => c.id === contactId);
  return contact ? `${contact.first_name} ${contact.last_name}` : 'N/A';
};

const getCompanyNameFromContact = (contactId) => {
  const contact = props.contacts.find(c => c.id === contactId);
  if (contact) {
    const company = props.companies.find(c => c.id === contact.company_id);
    return company ? company.name : 'N/A';
  }
  return 'N/A';
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};
</script>

<style scoped>
/* Add to main.css */
.potential-value-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
}

.contact-name-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
}
</style>
