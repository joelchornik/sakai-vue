import api from '@/service/cprapi';
import { useQuery } from '@tanstack/vue-query';
import { unref } from 'vue';

class PedidoProduccionService {
    get(params) {
        const url = '/pedido-produccion';
        return useQuery({
            queryKey: ['PedidoProduccion', params],
            queryFn: async () => await api.get(url, { params: params }),
            select: (response) => response.data
        });
    }

    getById(id) {
        const url = '/pedido-produccion';
        const ppId = unref(id);
        return useQuery({
            queryKey: ['PedidoProduccionView', id],
            queryFn: async () => await api.get(`${url}/${ppId}`),
            select: (response) => response.data,
            enabled: !!id
        });
    }
}

export default new PedidoProduccionService();
