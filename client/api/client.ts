import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export async function fetchMetadata(): Promise<Record<string, unknown>> {
  const response = await api.get('/metadata');
  return response.data;
}

export async function fetchAll<T>(
  resource: string,
  params?: QueryParams,
): Promise<PaginatedResponse<T>> {
  const response = await api.get<PaginatedResponse<T>>(`/${resource}`, {
    params,
  });
  return response.data;
}

export async function fetchOne<T>(
  resource: string,
  id: number,
): Promise<T> {
  const response = await api.get<T>(`/${resource}/${id}`);
  return response.data;
}

export async function createEntity<T>(
  resource: string,
  data: Partial<T>,
): Promise<T> {
  const response = await api.post<T>(`/${resource}`, data);
  return response.data;
}

export async function updateEntity<T>(
  resource: string,
  id: number,
  data: Partial<T>,
): Promise<T> {
  const response = await api.put<T>(`/${resource}/${id}`, data);
  return response.data;
}

export async function deleteEntity(
  resource: string,
  id: number,
): Promise<void> {
  await api.delete(`/${resource}/${id}`);
}

export default api;
