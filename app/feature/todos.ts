import {QueryFunctionContext, queryOptions, useQuery} from '@tanstack/react-query'
import axios from 'axios'

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}
type Todos = ReadonlyArray<Todo>

export const sleep = (delay: number) => {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export const fetchTodos = async (signal: AbortSignal): Promise<Todos> => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos`,
        {signal}
    )
    return response.data
}

const todosQueryOptions = queryOptions({
    queryKey: ['todos'],
    queryFn: ({signal}: QueryFunctionContext) => fetchTodos(signal),
    placeholderData: [
        {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false
        },
        {
            userId: 1,
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            completed: false
        },
        {
            userId: 1,
            id: 3,
            title: 'fugiat veniam minus',
            completed: false
        }
    ]
})

export const useTodosQuery = () => {
    return useQuery(todosQueryOptions)
}