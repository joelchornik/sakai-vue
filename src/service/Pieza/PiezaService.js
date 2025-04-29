import api from '@/service/cprapi';
import { useQuery } from '@tanstack/vue-query';
import { unref } from 'vue';

class PiezaService {
    get(params) {
        const url = '/pieza';
        return useQuery({
            queryKey: ['Pieza', params],
            queryFn: async () => await api.get(url, { params: params }),
            select: (response) => response.data
        });
    }

    getById(id) {
        const url = '/pieza';
        const piezaId = unref(id);
        return useQuery({
            queryKey: ['PiezaView', id],
            queryFn: async () => await api.get(`${url}/${piezaId}`),
            select: (response) => response.data,
            enabled: !!id
        });
    }
}

export default new PiezaService();
