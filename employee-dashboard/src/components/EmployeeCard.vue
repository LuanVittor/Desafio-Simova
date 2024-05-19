<template>
    <div class="employee-card" @click="selectEmployee">
        <img :src="employee.image" alt="Employee Image" />
        <div>
            <h2>{{ employee.name }}</h2>
            <p>ID - {{ employee.code }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: Object
    },
    methods: {
        selectEmployee() {
            this.$emit('select', this.employee);
        }
    }
};
</script>

<style scoped>
.employee-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
}

.employee-card:hover {
    transform: scale(1.05);
}

.employee-card img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 8px;
}
</style>
