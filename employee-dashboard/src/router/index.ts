import { createRouter, createWebHistory } from 'vue-router';
import EmployeePanelView from '@/views/EmployeePanelView.vue';
import EmployeeDetailsView from '@/views/EmployeeDetailsView.vue';

const routes = [
    {
        path: '/',
        name: 'EmployeePanel',
        component: EmployeePanelView
    },
    {
        path: '/employee/:id',
        name: 'EmployeeDetails',
        component: EmployeeDetailsView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
