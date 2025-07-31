<template>
  <div class="app-container">
    <Sidebar 
      :active-section="activeSection" 
      :user="currentUser"
      @section-changed="handleSectionChange"
    />
    
    <MainContent 
      :active-section="activeSection"
      :companies="companies"
      :contacts="contacts"
      :leads="leads"
      @open-modal="handleOpenModal"
      @delete-item="handleDeleteItem"
    />
    
    <FormModal
      v-if="showModal"
      :show="showModal"
      :mode="modalMode"
      :section="activeSection"
      :item="currentItem"
      :companies="companies"
      :contacts="contacts"
      @close="handleCloseModal"
      @save="handleSaveItem"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import FormModal from './components/FormModal.vue'
import api from './services/api'
import './assets/main.css'

const currentUser = ref({
  id: 2,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator',
  avatar: 'A'
})

const activeSection = ref('companies') 
const showModal = ref(false)
const modalMode = ref('create')
const currentItem = reactive({})

// Data
const companies = ref([])
const contacts = ref([])
const leads = ref([])

const fetchData = async () => {
  try {
    const [companiesRes, contactsRes, leadsRes] = await Promise.all([
      api.companies.getAll(),
      api.contacts.getAll(),
      api.leads.getAll(),
    ]);
    
    if (companiesRes.status >= 200 && companiesRes.status < 300) {
      companies.value = companiesRes.data || [];
    }
    if (contactsRes.status >= 200 && contactsRes.status < 300) {
      contacts.value = contactsRes.data || [];
    }
    if (leadsRes.status >= 200 && leadsRes.status < 300) {
      leads.value = leadsRes.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    alert('Failed to load data. Please check your connection and try again.');
  }
};

onMounted(() => {
  fetchData();
})

const handleSectionChange = (section) => {
  activeSection.value = section
}

const handleOpenModal = (mode, item = null) => {
  modalMode.value = mode
  showModal.value = true
  
  Object.keys(currentItem).forEach(key => delete currentItem[key])
  if (mode === 'edit' && item) {
    Object.assign(currentItem, { ...item })
  } else {
    if (activeSection.value === 'companies' && currentUser.value) {
      currentItem.user_id = currentUser.value.id;
    }
  }
}

const handleCloseModal = () => {
  showModal.value = false
  Object.keys(currentItem).forEach(key => delete currentItem[key])
}

const handleSaveItem = async (itemData) => {
  try {
    let response;
    if (modalMode.value === 'create') {
      response = await api[activeSection.value].create(itemData);
    } else {
      response = await api[activeSection.value].update(itemData.id, itemData);
    }
    
    if (response.status >= 200 && response.status < 300) {
      await fetchData(); 
      handleCloseModal();
      alert('Item saved successfully!');
    } else {
      console.error('Failed to save item:', response.message);
      alert(`Failed to save item: ${response.message}`);
    }
  } catch (error) {
    console.error('API error during save:', error);
    alert('An error occurred while saving. Please try again.');
  }
}

const handleDeleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      const response = await api[activeSection.value].delete(id);
      if (response.status >= 200 && response.status < 300) {
        await fetchData(); 
        alert('Item deleted successfully!');
      } else {
        console.error('Failed to delete item:', response.message);
        alert(`Failed to delete item: ${response.message}`);
      }
    } catch (error) {
      console.error('API error during delete:', error);
      alert('An error occurred while deleting. Please try again.');
    }
  }
}
</script>
