import { useRouter } from "next/router";
import { useMemo, useCallback } from "react";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { BASE_URL } from "../common/utils/constants/api.constant";
import axios from "axios";
import useSWR from "swr";
type OmitGet<M> = Omit<M, "get">;
type Payload = unknown;
// interface MutationArgs {
//     payload: Payload;
//     mutation: MutationKey;
// }
// type Mutator = (payload: Payload) => Promise<void | undefined>;
// type AvailableMutations = { [k in MutationKey]: Mutator };
interface UseMutation<M> extends Omit<SWRMutationResponse, "trigger"> {
    mutations: OmitGet<M>;
}
/**@example useMutation<ReturnType<typeof YourDatasource>>(id)@description Here YourDatasource should use typescript satisfies keyword to satisfy DatasourceModel.@param id: It will take the component id.*/
export function useMutation({ id, params, keySuffix, pathParam }:
    {
        id: string;
        params?: Record<string, unknown>;
        keySuffix?: string,
        pathParam?: string;
    }
) {

    // const { datasource: datasourceId } = useDependency(id);
    // const datasource: DatasourceModel =
    //     registry().engine?.datasourceStorage.size &&
    //     registry().engine?.datasourceStorage.get(datasourceId)();
    const { query: routerQuery } = useRouter();
    const swrKey = `${id}-${keySuffix}`

    const mutator = useCallback(
        async (_: string, args: { arg: any }) => {
            const {
                arg: { payload, mutation, slugId },
            } = args;
            const path = slugId ? `${id}/${slugId}` : id;
            console.log("-------------")
            return await (axios as any)[mutation](`${BASE_URL}/api/${path}`, payload
            )

        },
        [params, id, routerQuery]
    );
    const { trigger, ...mutationState } = useSWRMutation(swrKey, mutator);
    return {
        ...mutationState,
        mutations: {
            post(payload: Payload, slugId?: string | number) {
                return trigger({ payload, mutation: "post", slugId });
            },
            put(payload: Payload, slugId?: string | number) {
                return trigger({ payload, mutation: "put", slugId });
            },
            patch(payload: Payload, slugId?: string | number) {
                return trigger({ payload, mutation: "patch", slugId });
            },
            del(payload: Payload, slugId?: string | number) {
                return trigger({ payload, mutation: "delete", slugId });
            },
        },
    };
}
