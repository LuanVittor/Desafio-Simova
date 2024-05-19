<template>
    <div class="filters">
        <div class="filter-group">
            <span class="filter-label">Data de Início:</span>
            <input type="date" v-model="startDate" @input="applyFilter" class="filter-input"/>
        </div>
        <div class="filter-group">
            <span class="filter-label">Data de Fim:</span>
            <input type="date" v-model="endDate" @input="applyFilter" class="filter-input"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: ''
        };
    },
    methods: {
        applyFilter() {
            this.$emit('filter', { startDate: this.startDate, endDate: this.endDate });
        }
    }
};
</script>

<style scoped>
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
</style>
