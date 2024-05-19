import { shallowMount } from '@vue/test-utils';
import EmployeePanel from '../../src/components/EmployeePanel.vue';
import axios from 'axios';

jest.mock('axios');

const mockEmployeeCard = {
  template: '<div class="employee-card"></div>',
  props: ['employee']
};

describe('EmployeePanel.vue', () => {
    it('fetches employees from API and displays them', async () => {
        const employees = [
            { id: 1, name: 'Employee 1', code: '1', active: true, image: 'image1.png' },
            { id: 2, name: 'Employee 2', code: '2', active: true, image: 'image2.png' },
        ];

        axios.get.mockResolvedValue({ data: employees });

        const wrapper = shallowMount(EmployeePanel, {
            global: {
                mocks: {
                $axios: axios,
                },
                stubs: {
                EmployeeCard: mockEmployeeCard
                }
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.employees).toEqual(employees);
        expect(wrapper.findAll('.employee-card').length).toBe(employees.length);
    });
});
