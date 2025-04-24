import api from '@/service/cprapi';
import { useQuery } from '@tanstack/vue-query';

class ArticuloCrudoService {
    get(params) {
        const url = '/articulo-crudo';
        return useQuery({
            queryKey: ['articuloCrudo', params],
            queryFn: async () => await api.get(url, { params: params }),
            select: (response) => response.data
        });
    }
}

export default new ArticuloCrudoService();
