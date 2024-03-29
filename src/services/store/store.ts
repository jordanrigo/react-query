/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * Swagger Petstore - OpenAPI 3.0
 * This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Some useful links:
- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
 * OpenAPI spec version: 1.0.17
 */
import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  GetInventory200,
  Order
} from '../../model'
import { customInstance } from '../../../axios.config';
import type { ErrorType } from '../../../axios.config';


/**
 * Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 */
export const getInventory = (
    
 signal?: AbortSignal
) => {
      return customInstance<GetInventory200>(
      {url: `/store/inventory`, method: 'get', signal
    },
      );
    }
  

export const getGetInventoryQueryKey = () => [`/store/inventory`];

    
export type GetInventoryQueryResult = NonNullable<Awaited<ReturnType<typeof getInventory>>>
export type GetInventoryQueryError = ErrorType<unknown>

export const useGetInventory = <TData = Awaited<ReturnType<typeof getInventory>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getInventory>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetInventoryQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof getInventory>>> = ({ signal }) => getInventory(signal);


  

  const query = useQuery<Awaited<ReturnType<typeof getInventory>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Place a new order in the store
 * @summary Place an order for a pet
 */
export const placeOrder = (
    order: Order,
 ) => {
      return customInstance<Order>(
      {url: `/store/order`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: order
    },
      );
    }
  


    export type PlaceOrderMutationResult = NonNullable<Awaited<ReturnType<typeof placeOrder>>>
    export type PlaceOrderMutationBody = Order
    export type PlaceOrderMutationError = ErrorType<void>

    export const usePlaceOrder = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof placeOrder>>, TError,{data: Order}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof placeOrder>>, {data: Order}> = (props) => {
          const {data} = props ?? {};

          return  placeOrder(data,)
        }

        

      return useMutation<Awaited<ReturnType<typeof placeOrder>>, TError, {data: Order}, TContext>(mutationFn, mutationOptions);
    }
    /**
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 * @summary Find purchase order by ID
 */
export const getOrderById = (
    orderId: number,
 signal?: AbortSignal
) => {
      return customInstance<Order>(
      {url: `/store/order/${orderId}`, method: 'get', signal
    },
      );
    }
  

export const getGetOrderByIdQueryKey = (orderId: number,) => [`/store/order/${orderId}`];

    
export type GetOrderByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getOrderById>>>
export type GetOrderByIdQueryError = ErrorType<void>

export const useGetOrderById = <TData = Awaited<ReturnType<typeof getOrderById>>, TError = ErrorType<void>>(
 orderId: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getOrderById>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetOrderByIdQueryKey(orderId);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof getOrderById>>> = ({ signal }) => getOrderById(orderId, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof getOrderById>>, TError, TData>({ queryKey, queryFn, enabled: !!(orderId), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 * @summary Delete purchase order by ID
 */
export const deleteOrder = (
    orderId: number,
 ) => {
      return customInstance<unknown>(
      {url: `/store/order/${orderId}`, method: 'delete'
    },
      );
    }
  


    export type DeleteOrderMutationResult = NonNullable<Awaited<ReturnType<typeof deleteOrder>>>
    
    export type DeleteOrderMutationError = ErrorType<void>

    export const useDeleteOrder = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteOrder>>, TError,{orderId: number}, TContext>, }
) => {
      const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteOrder>>, {orderId: number}> = (props) => {
          const {orderId} = props ?? {};

          return  deleteOrder(orderId,)
        }

        

      return useMutation<Awaited<ReturnType<typeof deleteOrder>>, TError, {orderId: number}, TContext>(mutationFn, mutationOptions);
    }
    