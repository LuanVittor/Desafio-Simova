<template>
    <div class="employee-details">
        <button class="back-button" @click="goBack">Voltar para o Painel</button>
        <div class="employee-header">
            <div class="employee-info">
                <h1>{{ employee.name }}</h1>
                <p><strong>Nome:</strong> {{ employee.name }}</p>
                <p><strong>ID:</strong> {{ employee.code }}</p>
                <p><strong>Status:</strong> {{ employee.active ? 'Ativo' : 'Inativo' }}</p>
                <p><strong>Quantidade de Boletins:</strong> {{ filteredBulletins.length }}</p>
            </div>
            <img :src="employee.image" alt="Employee Image" class="employee-image"/>
        </div>
        <BulletinFilters @filter="applyFilter" />
        <div v-if="!filteredBulletins.length" class="no-bulletins">
            <p>Não há boletins disponíveis para este funcionário.</p>
        </div>
        <div v-else v-for="bulletin in filteredBulletins" :key="bulletin.id" class="bulletin">
            <h2>Boletim {{ bulletin.id }}</h2>
            <p>{{ formatDate(bulletin.startDate) }} - {{ formatDate(bulletin.endDate) }}</p>
            <ul>
                <li v-for="appointment in bulletin.appointments" :key="appointment.id">
                    <span class="activity-color" :style="{ backgroundColor: getActivityColor(appointment.activityId) }"></span>
                    {{ formatDate(appointment.date) }} - {{ getActivityDescription(appointment.activityId) }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { format } from 'date-fns';
import BulletinFilters from './BulletinFilters.vue';
import { Employee, Bulletin, Activity } from '@/types';

export default defineComponent({
    components: {
        BulletinFilters
    },
    data() {
        return {
            employee: {} as Employee,
            bulletins: [] as Bulletin[],
            filteredBulletins: [] as Bulletin[],
            activities: [] as Activity[],
            startDate: '',
            endDate: ''
        };
    },
    methods: {
        getActivityDescription(activityId: number): string {
            const activity = this.activities.find(act => act.id === activityId);
            return activity ? activity.description : 'Atividade desconhecida';
        },
        getActivityColor(activityId: number): string {
            const activity = this.activities.find(act => act.id === activityId);
            return activity ? activity.color : '#000';
        },
        formatDate(date: string): string {
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        },
        goBack() {
            this.$router.push({ name: 'EmployeePanel' });
        },
        applyFilter(filterCriteria: { startDate: string; endDate: string }) {
            const { startDate, endDate } = filterCriteria;
            this.startDate = startDate;
            this.endDate = endDate;

            this.filteredBulletins = this.bulletins.filter(bulletin => {
                const bulletinStartDate = new Date(bulletin.startDate);
                const bulletinEndDate = new Date(bulletin.endDate);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
                const isAfterStartDate = !start || bulletinStartDate >= start;
                const isBeforeEndDate = !end || bulletinEndDate <= end;

                return isAfterStartDate && isBeforeEndDate;
            });
        },
        fetchEmployeeData() {
            const employeeId = parseInt(this.$route.params.id as string);
            axios.get(`http://localhost:3000/employees/${employeeId}`).then(response => {
                this.employee = response.data;
            });
            axios.get(`http://localhost:3000/bulletins/employee/${employeeId}`).then(response => {
                this.bulletins = response.data;
                this.filteredBulletins = response.data;
            });
            axios.get('http://localhost:3000/activities').then(response => {
                this.activities = response.data;
            });
        }
    },
    created() {
        this.fetchEmployeeData();
    }
});
</script>

<style scoped>
.employee-details {
    padding: 20px;
    position: relative;
}

.back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #66afe9;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    z-index: 1000;
}

.back-button:hover {
    background-color: #559fd8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.employee-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.employee-image {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}

.employee-info {
    text-align: center;
}

.employee-info p {
    margin: 5px 0;
    font-weight: bold;
    color: #333;
}

.bulletin {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bulletin h2 {
    margin-top: 0;
}

.bulletin ul {
    list-style: none;
    padding: 0;
}

.bulletin li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    color: #333;
    justify-content: center;
}

.bulletin li:last-child {
    border-bottom: none;
}

.bulletin p {
    margin: 5px 0;
    font-weight: bold;
    color: #666;
}

.activity-color {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    border-radius: 50%;
}

.no-bulletins {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    color: #666;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-label {
    font-size: 16px;
    font-weight: bold;
}

.filter-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.filter-input:focus {
    border-color: #66afe9;
    box-shadow: 0 0 5px rgba(102, 175, 233, 0.5);
}

@media (min-width: 769px) {
    .employee-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .employee-info {
        text-align: left;
        margin-right: 20px;
    }

    .employee-image {
        margin-right: 0;
        margin-bottom: 0;
    }
}

@media (max-width: 768px) {
    .employee-header {
        flex-direction: column;
        align-items: center;
    }

    .employee-image {
        margin-bottom: 10px;
    }

    .employee-info {
        text-align: center;
    }
}
</style>
