import { shallowMount } from '@vue/test-utils';
import EmployeeDetails from '../../src/components/EmployeeDetails.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

jest.mock('axios');

const routes = [
    { path: '/employee/:id', component: EmployeeDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('EmployeeDetails.vue', () => {
    it('fetches employee details from API and displays them', async () => {
        const employee = { id: 1, name: 'Employee 1', code: '1', active: true, image: 'image1.png' };
        const bulletins = [
            { id: 10, employeeId: 1, startDate: '2023-10-01 08:00:00', endDate: '2023-10-01 12:00:00', appointments: [] },
        ];
        const activities = [
            { id: 1, code: 101, description: 'Issue 10', color: '#bbf7d0' },
        ];

        axios.get.mockImplementation((url) => {
            if (url.includes('/employees/1')) {
                return Promise.resolve({ data: employee });
            } else if (url.includes('/bulletins/employee/1')) {
                return Promise.resolve({ data: bulletins });
            } else if (url.includes('/activities')) {
                return Promise.resolve({ data: activities });
            }
        });

        router.push('/employee/1');
        await router.isReady();

        const wrapper = shallowMount(EmployeeDetails, {
            global: {
                plugins: [router],
                mocks: {
                $axios: axios,
                },
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.employee).toEqual(employee);
        expect(wrapper.vm.bulletins).toEqual(bulletins);
        expect(wrapper.vm.activities).toEqual(activities);
    });
});
