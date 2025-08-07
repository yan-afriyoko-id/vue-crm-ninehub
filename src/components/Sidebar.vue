<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 class="logo-text">CRM Dashboard</h1>
      </div>
    </div>

    <nav class="sidebar-nav">
      <SidebarItem v-for="(item, index) in menuItems" :key="item.id" :item="item" :is-active="activeSection === item.id"
        :style="{ animationDelay: `${index * 0.1}s` }" @click="$emit('section-changed', item.id)" />
    </nav>

    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">
          {{ user?.avatar || user?.name?.charAt(0)?.toUpperCase() || 'U' }}
        </div>
        <div class="user-info">
          <p class="user-name">{{ user?.name || 'User' }}</p>
          <p class="user-role">{{ user?.role || 'Role' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BuildingIcon, UsersIcon, BriefcaseIcon, HomeIcon } from 'lucide-vue-next'
import SidebarItem from './SidebarItem.vue'

defineProps({
  activeSection: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['section-changed'])

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'companies', label: 'Companies', icon: BuildingIcon },
  { id: 'contacts', label: 'Contacts', icon: UsersIcon },
  { id: 'leads', label: 'Leads', icon: BriefcaseIcon }
]
</script>
