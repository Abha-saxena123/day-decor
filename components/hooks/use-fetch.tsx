import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse } from 'swr';
import { BASE_URL } from '../common/utils/constants/api.constant';

interface UseDataSource<D> extends SWRResponse<D> {
    data: D | undefined;
}
interface UseFetchParams {
    id: string;
    params?: Record<string, unknown>;
    keySuffix?: string;
    configOptions?: Record<string, unknown>;
    cb?: any;
    callApiParam?: string
}

export function useFetch<D = unknown>(
    {
        id,
        params,
        keySuffix = '',
        configOptions = {},
        cb,
        callApiParam
    }: UseFetchParams
): UseDataSource<D> {
    const { query: routerQuery } = useRouter();
    let cbData;
    const SWRState = useSWR(
        `${id}-${keySuffix}`,
        async () => {
            return await (axios.get(`${BASE_URL}/api/${id}`, {
                params: {
                    ...routerQuery,
                    ...(params || {})

                },
            }).then((res) => res.data) as D);

        },
        {
            revalidateOnFocus: false,
            ...configOptions,
        }
    );

    if (cb && (SWRState.data as any)?.data) {
        cbData = cb((SWRState.data as any).data, id);
    }
    return cbData ? { ...SWRState, data: cbData } : SWRState;
}
