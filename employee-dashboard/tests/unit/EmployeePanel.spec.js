import { mount } from '@vue/test-utils';
import EmployeePanel from '@/components/EmployeePanel.vue';
import EmployeeCard from '@/components/EmployeeCard.vue';
import EmployeeFilters from '@/components/EmployeeFilters.vue';
import flushPromises from 'flush-promises';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe('EmployeePanel.vue', () => {
    let wrapper;
    const employees = [
        { id: 1, name: 'John Doe', department: 'Engineering', status: 'Active', active: true },
        { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'Inactive', active: false },
    ];

    beforeEach(async () => {
        mockedAxios.get.mockResolvedValue({ data: employees });

        wrapper = mount(EmployeePanel, {
            props: { employees },
        });

        await flushPromises();
    });

    it('renders employee cards', () => {
        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(employees.length);
    });

    it('filters employee cards by name', async () => {
        const filterComponent = wrapper.findComponent(EmployeeFilters);
        await filterComponent.setData({ search: 'John' });

        await filterComponent.find('input.filter-input').trigger('input');
        await flushPromises();

        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(1);
        expect(wrapper.findComponent(EmployeeCard).props().employee.name).toBe('John Doe');
    });

    it('filters employee cards by active status', async () => {
        const filterComponent = wrapper.findComponent(EmployeeFilters);
        await filterComponent.setData({ status: 'active' });

        await filterComponent.find('select.filter-select').trigger('change');
        await flushPromises();

        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(1);
        expect(wrapper.findComponent(EmployeeCard).props().employee.active).toBe(true);
    });

    it('filters employee cards by inactive status', async () => {
        const filterComponent = wrapper.findComponent(EmployeeFilters);
        await filterComponent.setData({ status: 'inactive' });

        await filterComponent.find('select.filter-select').trigger('change');
        await flushPromises();

        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(1);
        expect(wrapper.findComponent(EmployeeCard).props().employee.active).toBe(false);
    });

    it('filters employee cards by name and active status', async () => {
        const filterComponent = wrapper.findComponent(EmployeeFilters);
        await filterComponent.setData({ search: 'John', status: 'active' });

        await filterComponent.find('input.filter-input').trigger('input');
        await filterComponent.find('select.filter-select').trigger('change');
        await flushPromises();

        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(1);
        const employeeCard = wrapper.findComponent(EmployeeCard);
        expect(employeeCard.props().employee.name).toBe('John Doe');
        expect(employeeCard.props().employee.active).toBe(true);
    });

    it('filters employee cards by name and inactive status', async () => {
        const filterComponent = wrapper.findComponent(EmployeeFilters);
        await filterComponent.setData({ search: 'Jane', status: 'inactive' });

        await filterComponent.find('input.filter-input').trigger('input');
        await filterComponent.find('select.filter-select').trigger('change');
        await flushPromises();

        expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(1);
        const employeeCard = wrapper.findComponent(EmployeeCard);
        expect(employeeCard.props().employee.name).toBe('Jane Smith');
        expect(employeeCard.props().employee.active).toBe(false);
    });
});
