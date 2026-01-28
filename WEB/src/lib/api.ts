import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface User {
    id: number;
    fullname: string;
    phone: string;
    dob: string;
    blood_group: string;
    address: string;
}

export interface Nominee {
    id: number;
    name: string;
    relationship: string;
    phone: string;
}

export interface Medication {
    id: number;
    name: string;
    dosage: string;
    scheduled_time: string;
    start_date: string;
    end_date?: string;
}

export interface MedicationLog {
    id: number;
    medication_id: number;
    user_id: number;
    date: string;
    status: 'taken' | 'missed' | 'pending';
    taken_at?: string;
}

export const auth = {
    checkUser: (phone: string) => api.post<{ exists: boolean }>('/auth/check-user', { phone }),
    login: (phone: string, otp: string) => api.post<{ access_token: string; is_registered: boolean }>('/auth/login', { phone, otp }),
    register: (data: any) => api.post<{ access_token: string }>('/auth/register', data),
    me: () => api.get<User>('/users/me'),
};

export const data = {
    getMedications: () => api.get<Medication[]>('/medications'),
    getMedicationLogs: (start: string, end: string) => api.get<MedicationLog[]>('/medications/logs', { params: { start_date: start, end_date: end } }),
    recordCompliance: (medId: number, date: string, status: string, takenAt?: string) => api.post(`/medications/${medId}/log`, { date, status, taken_at: takenAt }),
    getNominees: () => api.get<Nominee[]>('/nominees'),
    createNominee: (data: Omit<Nominee, 'id'>) => api.post<Nominee>('/nominees', data),
}

export const emergency = {
    getActive: () => api.get<any>('/emergency/active'),
    trigger: (stage: string) => api.post<any>('/emergency', { stage }),
    resolve: (id: number) => api.post<any>(`/emergency/${id}/resolve`)
}

export default api;
