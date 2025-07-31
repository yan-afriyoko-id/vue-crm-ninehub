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
            <th class="table-th">Title</th>
            <th class="table-th">Company</th>
            <th class="table-th">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(contact, index) in data" :key="contact.id" :style="{ animationDelay: `${index * 0.1}s` }"
            class="table-row">
            <td class="table-td">
              <div class="id-badge">{{ contact.id }}</div>
            </td>
            <td class="table-td">
              <div class="user-cell">
                <div class="user-avatar">
                  {{ contact.first_name.charAt(0).toUpperCase() }}
                </div>
                <span class="user-name">{{ contact.full_name }} </span>
              </div>
            </td>
            <td class="table-td">
              <div class="email-cell">
                <MailIcon class="w-4 h-4 text-slate-400" />
                <span class="email-text">{{ contact.email }}</span>
              </div>
            </td>
            <td class="table-td">{{ contact.phone }}</td>
            <td class="table-td">{{ contact.job_title }}</td>
            <td class="table-td">
              <span class="company-name-text">{{ contact.company.name }}</span>
            </td>
            <td class="table-td">
              <TableActions @edit="$emit('edit-item', contact)" @delete="$emit('delete-item', contact.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { MailIcon } from 'lucide-vue-next'
import TableActions from '../TableActions.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  companies: {
    type: Array,
    required: true
  }
})

defineEmits(['edit-item', 'delete-item'])

const getCompanyName = (companyId) => {
  const company = props.companies.find(c => c.id === companyId);
  return company ? company.name : 'N/A';
};
</script>

<style scoped>
/* Add to main.css */
.company-name-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
</style>
