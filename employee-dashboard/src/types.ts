export interface Employee {
    id: number;
    name: string;
    code: string;
    active: boolean;
    image: string;
}

export interface Activity {
    id: number;
    code: number;
    description: string;
    color: string;
}

export interface Appointment {
    id: number;
    date: string;
    activityId: number;
}

export interface Bulletin {
    id: number;
    employeeId: number;
    startDate: string;
    endDate: string;
    appointments: Array<Appointment>;
}
