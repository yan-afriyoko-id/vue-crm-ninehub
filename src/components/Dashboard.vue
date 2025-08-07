<template>
    <div class="dashboard-container">
        <!-- Dashboard Header -->
        <div class="dashboard-header">
            <div class="header-content">
                <h1 class="dashboard-title">Dashboard Overview</h1>
                <p class="dashboard-subtitle">Welcome back! Here's what's happening with your CRM today.</p>
            </div>
        </div>
        <br>
        <!-- Charts and Analytics -->
        <div class="analytics-grid">
            <!-- Lead Status Distribution -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Lead Status Distribution</h3>
                    <PieChartIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="chart-container">
                    <div class="status-chart">
                        <div v-for="status in staticData.leadStatusStats" :key="status.name" class="status-bar"
                            :style="{ width: status.percentage + '%' }" :class="getStatusClass(status.name)">
                            <span class="status-label">{{ status.name }} ({{ status.count }})</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Monthly Performance -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Monthly Performance</h3>
                    <BarChartIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="chart-container">
                    <div class="performance-chart">
                        <div v-for="month in staticData.monthlyPerformance" :key="month.name" class="performance-bar">
                            <div class="bar-container">
                                <div class="bar companies-bar" :style="{ height: (month.companies / 20) * 100 + '%' }"
                                    :title="`Companies: ${month.companies}`"></div>
                                <div class="bar contacts-bar" :style="{ height: (month.contacts / 50) * 100 + '%' }"
                                    :title="`Contacts: ${month.contacts}`"></div>
                                <div class="bar leads-bar" :style="{ height: (month.leads / 30) * 100 + '%' }"
                                    :title="`Leads: ${month.leads}`"></div>
                            </div>
                            <span class="month-label">{{ month.name }}</span>
                        </div>
                    </div>
                    <div class="chart-legend">
                        <div class="legend-item">
                            <div class="legend-color companies-color"></div>
                            <span>Companies</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color contacts-color"></div>
                            <span>Contacts</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color leads-color"></div>
                            <span>Leads</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Recent Activities -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Recent Activities</h3>
                    <ActivityIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="activities-list">
                    <div v-for="activity in staticData.recentActivities" :key="activity.id" class="activity-item">
                        <div class="activity-icon" :class="activity.type">
                            <component :is="activity.icon" class="w-4 h-4" />
                        </div>
                        <div class="activity-content">
                            <p class="activity-text">{{ activity.text }}</p>
                            <span class="activity-time">{{ activity.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Top Performing Industries -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Top Industries</h3>
                    <StarIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="industries-list">
                    <div v-for="industry in staticData.topIndustries" :key="industry.name" class="industry-item">
                        <div class="industry-info">
                            <div class="industry-name">{{ industry.name }}</div>
                            <div class="industry-progress">
                                <div class="progress-bar" :style="{ width: industry.percentage + '%' }"></div>
                            </div>
                        </div>
                        <div class="industry-stats">
                            <span class="industry-count">{{ industry.count }} companies</span>
                            <span class="industry-percentage">{{ industry.percentage }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Revenue Breakdown -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Revenue Breakdown</h3>
                    <DollarSignIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="revenue-breakdown">
                    <div v-for="revenue in staticData.revenueBreakdown" :key="revenue.source" class="revenue-item">
                        <div class="revenue-source">
                            <div class="source-icon" :class="revenue.type">
                                <component :is="revenue.icon" class="w-4 h-4" />
                            </div>
                            <div class="source-info">
                                <div class="source-name">{{ revenue.source }}</div>
                                <div class="source-amount">{{ formatCurrency(revenue.amount) }}</div>
                            </div>
                        </div>
                        <div class="revenue-change" :class="revenue.change > 0 ? 'positive' : 'negative'">
                            <component :is="revenue.change > 0 ? TrendingUpIcon : TrendingDownIcon" class="w-3 h-3" />
                            {{ Math.abs(revenue.change) }}%
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <!-- Quick Actions -->
            <div class="analytics-card">
                <div class="card-header">
                    <h3 class="card-title">Quick Actions</h3>
                    <ZapIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="quick-actions">
                    <button @click="handleQuickAction('add-company')" class="quick-action-btn">
                        <PlusIcon class="w-4 h-4" />
                        Add Company
                    </button>
                    <button @click="handleQuickAction('add-contact')" class="quick-action-btn">
                        <UserPlusIcon class="w-4 h-4" />
                        Add Contact
                    </button>
                    <button @click="handleQuickAction('add-lead')" class="quick-action-btn">
                        <TargetIcon class="w-4 h-4" />
                        Add Lead
                    </button>
                    <button @click="handleQuickAction('export-data')" class="quick-action-btn">
                        <DownloadIcon class="w-4 h-4" />
                        Export Data
                    </button>
                    <button @click="handleQuickAction('generate-report')" class="quick-action-btn">
                        <FileTextIcon class="w-4 h-4" />
                        Generate Report
                    </button>
                    <button @click="handleQuickAction('send-email')" class="quick-action-btn">
                        <MailIcon class="w-4 h-4" />
                        Send Email
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
    BuildingIcon,
    UsersIcon,
    BriefcaseIcon,
    DollarSignIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    PieChartIcon,
    BarChartIcon,
    ActivityIcon,
    StarIcon,
    ZapIcon,
    PlusIcon,
    UserPlusIcon,
    TargetIcon,
    DownloadIcon,
    FileTextIcon,
    MailIcon,
    GlobeIcon,

} from 'lucide-vue-next'

const emit = defineEmits(['quick-action'])

const isLoading = ref(false)

// Static data for dashboard
const staticData = reactive({
    totalCompanies: 47,
    totalContacts: 156,
    totalLeads: 89,
    totalRevenue: 2450000000, // 2.45 Billion IDR

    leadStatusStats: [
        { name: 'New', count: 25, percentage: 28 },
        { name: 'Qualified', count: 20, percentage: 22 },
        { name: 'Contacted', count: 18, percentage: 20 },
        { name: 'Converted', count: 15, percentage: 17 },
        { name: 'Lost', count: 11, percentage: 13 }
    ],

    monthlyPerformance: [
        { name: 'Jan', companies: 8, contacts: 25, leads: 15 },
        { name: 'Feb', companies: 12, contacts: 32, leads: 18 },
        { name: 'Mar', companies: 15, contacts: 28, leads: 22 },
        { name: 'Apr', companies: 10, contacts: 35, leads: 20 },
        { name: 'May', companies: 18, contacts: 42, leads: 25 },
        { name: 'Jun', companies: 14, contacts: 38, leads: 19 }
    ],

    recentActivities: [
        {
            id: 1,
            type: 'company',
            icon: BuildingIcon,
            text: 'New company "PT Teknologi Maju" was added to the system',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'contact',
            icon: UsersIcon,
            text: 'Contact "Budi Santoso" from PT Maju Mundur was updated',
            time: '4 hours ago'
        },
        {
            id: 3,
            type: 'lead',
            icon: BriefcaseIcon,
            text: 'Lead "Website Development Project" status changed to Qualified',
            time: '6 hours ago'
        },
        {
            id: 4,
            type: 'company',
            icon: BuildingIcon,
            text: 'Company "CV Digital Solutions" profile was completed',
            time: '8 hours ago'
        },
        {
            id: 5,
            type: 'lead',
            icon: BriefcaseIcon,
            text: 'New lead "Mobile App Development" was created',
            time: '1 day ago'
        }
    ],

    topIndustries: [
        { name: 'Technology', count: 15, percentage: 32 },
        { name: 'Finance', count: 12, percentage: 26 },
        { name: 'Healthcare', count: 8, percentage: 17 },
        { name: 'Education', count: 7, percentage: 15 },
        { name: 'Manufacturing', count: 5, percentage: 10 }
    ],

    revenueBreakdown: [
        {
            source: 'New Clients',
            amount: 980000000,
            change: 15,
            type: 'new',
            icon: UserPlusIcon
        },
        {
            source: 'Existing Clients',
            amount: 850000000,
            change: 8,
            type: 'existing',
            icon: UsersIcon
        },
        {
            source: 'Referrals',
            amount: 420000000,
            change: 22,
            type: 'referral',
            icon: StarIcon
        },
        {
            source: 'Online Marketing',
            amount: 200000000,
            change: -5,
            type: 'marketing',
            icon: GlobeIcon
        }
    ]
})

// Methods
const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value)
}

const getStatusClass = (status) => {
    const classes = {
        'New': 'status-new',
        'Qualified': 'status-qualified',
        'Contacted': 'status-contacted',
        'Lost': 'status-lost',
        'Converted': 'status-converted'
    }
    return classes[status] || 'status-default'
}

const refreshData = async () => {
    isLoading.value = true

    // Simulate API call delay
    setTimeout(() => {
        // Simulate data refresh by slightly modifying numbers
        staticData.totalCompanies += Math.floor(Math.random() * 3) - 1
        staticData.totalContacts += Math.floor(Math.random() * 5) - 2
        staticData.totalLeads += Math.floor(Math.random() * 4) - 1
        staticData.totalRevenue += (Math.floor(Math.random() * 100000000) - 50000000)

        isLoading.value = false
    }, 1500)
}

const handleQuickAction = (action) => {
    const actions = {
        'add-company': () => {
            emit('quick-action', 'companies', 'create')
        },
        'add-contact': () => {
            emit('quick-action', 'contacts', 'create')
        },
        'add-lead': () => {
            emit('quick-action', 'leads', 'create')
        },
        'export-data': () => {
            alert('Export functionality will be implemented soon!')
        },
        'generate-report': () => {
            alert('Report generation feature coming soon!')
        },
        'send-email': () => {
            alert('Email campaign feature coming soon!')
        }
    }

    if (actions[action]) {
        actions[action]()
    }
}
</script>
