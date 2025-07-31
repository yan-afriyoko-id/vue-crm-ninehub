<template>
  <div class="status-badge" :class="badgeClasses">
    <div class="status-indicator"></div>
    <span class="status-text">{{ status }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClasses = computed(() => {
  const classes = {
    'Baru': 'status-baru',
    'Terkualifikasi': 'status-terkualifikasi',
    'Tidak Terkualifikasi': 'status-tidak-terkualifikasi',
    'Konversi': 'status-konversi'
  }
  return classes[props.status] || 'status-default'
})
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
}

/* Status: Baru */
.status-baru {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
}

.status-baru .status-indicator {
  background: #3b82f6;
}

/* Status: Terkualifikasi */
.status-terkualifikasi {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #16a34a;
}

.status-terkualifikasi .status-indicator {
  background: #22c55e;
}

/* Status: Tidak Terkualifikasi */
.status-tidak-terkualifikasi {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
}

.status-tidak-terkualifikasi .status-indicator {
  background: #ef4444;
}

/* Status: Konversi */
.status-konversi {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}

.status-konversi .status-indicator {
  background: #10b981;
}

/* Default fallback */
.status-default {
  background: #f3f4f6;
  color: #6b7280;
}

.status-default .status-indicator {
  background: #9ca3af;
}
</style>
