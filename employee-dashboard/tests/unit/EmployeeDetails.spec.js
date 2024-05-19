import { mount } from '@vue/test-utils';
import EmployeeDetails from '@/components/EmployeeDetails.vue';
import BulletinFilters from '@/components/BulletinFilters.vue';
import flushPromises from 'flush-promises';

describe('EmployeeDetails.vue', () => {
    let wrapper;
    const employee = { id: 1, name: 'John Doe', code: '1234', active: true, image: 'image.jpg' };
    const bulletins = [
        {
            id: 1,
            startDate: '2023-01-01',
            endDate: '2023-01-31',
            employeeId: 1,
            appointments: [
                {
                    id: 1,
                    date: '2023-01-15',
                    activityId: 1,
                },
            ],
        },
        {
            id: 2,
            startDate: '2023-02-01',
            endDate: '2023-02-28',
            employeeId: 1,
            appointments: [
                {
                    id: 2,
                    date: '2023-02-20',
                    activityId: 2,
                },
            ],
        },
    ];
    const activities = [
        { id: 1, description: 'Meeting', color: '#ff0000' },
        { id: 2, description: 'Workshop', color: '#00ff00' }
    ];

    beforeEach(async () => {
        wrapper = mount(EmployeeDetails, {
            data() {
                return {
                    employee,
                    bulletins,
                    filteredBulletins: bulletins,
                    activities,
                };
            },
            global: {
                mocks: {
                    $route: {
                        params: { id: '1' }
                    },
                    $router: {
                        push: jest.fn()
                    }
                }
            }
        });

        await flushPromises();
    });

    it('shows no bulletins message when there are no bulletins', async () => {
        await wrapper.setData({ bulletins: [], filteredBulletins: [] });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.no-bulletins').exists()).toBe(true);
        expect(wrapper.find('.no-bulletins').text()).toBe('Não há boletins disponíveis para este funcionário.');
    });

    it('filters bulletins by start date', async () => {
        const filterComponent = wrapper.findComponent(BulletinFilters);
        await filterComponent.setData({ startDate: '2023-02-01' });
        await filterComponent.find('input[type="date"]').trigger('input');
        await flushPromises();

        expect(wrapper.findAll('.bulletin')).toHaveLength(1);
        expect(wrapper.find('.bulletin h2').text()).toBe('Boletim 2');
    });

    it('filters bulletins by end date', async () => {
        const filterComponent = wrapper.findComponent(BulletinFilters);
        await filterComponent.setData({ endDate: '2023-01-31' });
        await filterComponent.find('input[type="date"]').trigger('input');
        await flushPromises();

        expect(wrapper.findAll('.bulletin')).toHaveLength(1);
        expect(wrapper.find('.bulletin h2').text()).toBe('Boletim 1');
    });

    it('filters bulletins by start and end date', async () => {
        const filterComponent = wrapper.findComponent(BulletinFilters);
        await filterComponent.setData({ startDate: '2023-01-01', endDate: '2023-01-31' });
        await filterComponent.find('input[type="date"]').trigger('input');
        await flushPromises();

        expect(wrapper.findAll('.bulletin')).toHaveLength(1);
        expect(wrapper.find('.bulletin h2').text()).toBe('Boletim 1');
    });

    it('shows all bulletins when no date filters are applied', async () => {
        await wrapper.setData({ startDate: '', endDate: '' });
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('.bulletin')).toHaveLength(2);
    });
});
