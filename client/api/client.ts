import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Request interceptor: inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 by clearing auth state
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('player');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  },
);

// --- Types ---

export interface PlayerInfo {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  token: string;
  player: PlayerInfo;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// --- Auth ---

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', {
    username,
    password,
  });
  return data;
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<PlayerInfo> {
  const { data } = await api.post<PlayerInfo>('/auth/register', {
    username,
    email,
    password,
  });
  return data;
}

export async function fetchMe(): Promise<PlayerInfo> {
  const { data } = await api.get<PlayerInfo>('/auth/me');
  return data;
}

// --- Metadata ---

export interface ColumnMeta {
  name: string;
  type: string;
  nullable: boolean;
  isPrimary: boolean;
}

export interface RelationMeta {
  propertyName: string;
  relationType: string;
  targetEntity: string;
  targetRoute: string;
  joinColumn?: string;
}

export interface TableMeta {
  name: string;
  route: string;
  displayName: string;
  columns: ColumnMeta[];
  relations: RelationMeta[];
}

export async function fetchMetadata(): Promise<TableMeta[]> {
  const { data } = await api.get<TableMeta[]>('/metadata/tables');
  return data;
}

// --- Generic CRUD ---

export async function fetchAll<T>(
  resource: string,
  params?: QueryParams,
): Promise<PaginatedResponse<T>> {
  const { data } = await api.get<PaginatedResponse<T>>(`/${resource}`, {
    params,
  });
  return data;
}

export async function fetchOne<T>(
  resource: string,
  id: number,
): Promise<T> {
  const { data } = await api.get<T>(`/${resource}/${id}`);
  return data;
}

export async function createEntity<T>(
  resource: string,
  payload: Partial<T>,
): Promise<T> {
  const { data } = await api.post<T>(`/${resource}`, payload);
  return data;
}

export async function updateEntity<T>(
  resource: string,
  id: number,
  payload: Partial<T>,
): Promise<T> {
  const { data } = await api.put<T>(`/${resource}/${id}`, payload);
  return data;
}

export async function deleteEntity(
  resource: string,
  id: number,
): Promise<void> {
  await api.delete(`/${resource}/${id}`);
}

export default api;
