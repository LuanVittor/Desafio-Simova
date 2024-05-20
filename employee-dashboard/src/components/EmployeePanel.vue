<template>
    <div class="employee-panel">
        <h1>Painel de Funcionários</h1>
        <EmployeeFilters @filter="applyFilter" />
        <div v-if="isLoading" class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando funcionários...</p>
        </div>
        <div v-else class="employee-cards">
            <EmployeeCard
                v-for="employee in filteredEmployees"
                :key="employee.id"
                :employee="employee"
                @select="selectEmployee"
            />
            <div v-if="!filteredEmployees.length" class="no-results">
                <p>Não existe nenhum funcionário com esses critérios de busca.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import EmployeeCard from './EmployeeCard.vue';
import EmployeeFilters from './EmployeeFilters.vue';
import { Employee } from '@/types';

export default defineComponent({
    components: {
        EmployeeCard,
        EmployeeFilters
    },
    data() {
        return {
            allEmployees: [] as Employee[],
            filteredEmployees: [] as Employee[],
            isLoading: true
        };
    },
    methods: {
        applyFilter(filterCriteria: { search: string; status: string }) {
            this.filteredEmployees = this.allEmployees.filter(employee => {
                const matchesName = employee.name.toLowerCase().includes(filterCriteria.search.toLowerCase());
                let matchesStatus = true;
                if (filterCriteria.status) {
                    matchesStatus = filterCriteria.status === 'active' ? employee.active : !employee.active;
                }
                return matchesName && matchesStatus;
            });
        },
        selectEmployee(employee: Employee) {
            this.$router.push({ name: 'EmployeeDetails', params: { id: employee.id } });
        },
        fetchEmployees() {
            this.isLoading = true;
            axios.get('http://localhost:3000/employees')
                .then(response => {
                    this.allEmployees = response.data;
                    this.filteredEmployees = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('There was an error fetching the employees!', error);
                    this.isLoading = false;
                });
        }
    },
    created() {
        this.fetchEmployees();
    },
});
</script>

<style scoped>
.employee-panel {
    padding: 20px;
    text-align: center;
}

.employee-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.no-results {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    color: #666;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
}

.spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
    .employee-cards {
        flex-direction: column;
        align-items: center;
    }
}
</style>
