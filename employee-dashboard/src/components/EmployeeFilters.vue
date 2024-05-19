<template>
    <div class="filters">
        <input type="text" v-model="search" placeholder="Search by name" @input="applyFilter" class="filter-input"/>
        <div class="filter-group">
            <span class="filter-label">Status:</span>
            <select v-model="status" @change="applyFilter" class="filter-select">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            status: ''
        };
    },
    methods: {
        applyFilter() {
            this.$emit('filter', { search: this.search, status: this.status });
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

.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-label {
    font-size: 16px;
    font-weight: bold;
}

.filter-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.filter-select:focus {
    border-color: #66afe9;
    box-shadow: 0 0 5px rgba(102, 175, 233, 0.5);
}
</style>
