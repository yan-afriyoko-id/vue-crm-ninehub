<template>
  <div class="table-wrapper">
    <div class="table-container">
      <table class="data-table">
        <thead class="table-header">
          <tr>
            <th class="table-th">ID</th>
            <th class="table-th">Name</th>
            <th class="table-th">Industry</th>
            <th class="table-th">Phone</th>
            <th class="table-th">Email</th>
            <th class="table-th">Address</th>
            <th class="table-th">Website</th>
            <th class="table-th">User</th>
            <th class="table-th">Description</th>
            <th class="table-th">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr 
            v-for="(company, index) in data" 
            :key="company.id"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="table-row"
          >
            <td class="table-td">
              <div class="id-badge">{{ company.id }}</div>
            </td>
            <td class="table-td">
              <div class="name-cell">
                <div class="name-icon">
                  <BuildingIcon class="w-4 h-4" />
                </div>
                <span class="name-text">{{ company.name }}</span>
              </div>
            </td>
            <td class="table-td">{{ company.industry }}</td>
            <td class="table-td">{{ company.phone }}</td>
            <td class="table-td">{{ company.email }}</td>
            <td class="table-td">{{ company.address }}</td>
            <td class="table-td">
              <a :href="company.website" target="_blank" class="text-blue-600 hover:underline">{{ company.website }}</a>
            </td>
            <td class="table-td">{{ company.user.name }}</td> 
            <td class="table-td">{{ company.description }}</td>
            <td class="table-td">
              <TableActions
                @edit="$emit('edit-item', company)"
                @delete="$emit('delete-item', company.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { BuildingIcon } from 'lucide-vue-next'
import TableActions from '../TableActions.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

defineEmits(['edit-item', 'delete-item'])
</script>
