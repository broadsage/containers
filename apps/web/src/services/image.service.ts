import { apiClient } from './api.client';
import type { DockerImage } from '../types';

export interface ImageListResponse {
  images: DockerImage[];
  total: number;
  page: number;
  page_size: number;
}

export interface CategoryResponse {
  id: string;
  name: string;
  icon: string;
}

export interface StatsResponse {
  projects: number;
  versions: number;
  images: number;
  builds: number;
}

class ImageService {
  private baseUrl = '/images';

  async getAllImages(params?: {
    category?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }): Promise<ImageListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.page) {
      queryParams.append('page', String(params.page));
    }
    if (params?.page_size) {
      queryParams.append('page_size', String(params.page_size));
    }

    const url = `${this.baseUrl}/?${queryParams.toString()}`;
    return apiClient.get<ImageListResponse>(url);
  }

  async getImageByName(name: string): Promise<DockerImage> {
    return apiClient.get<DockerImage>(`${this.baseUrl}/${name}`);
  }

  async getCategories(): Promise<CategoryResponse[]> {
    return apiClient.get<CategoryResponse[]>(`${this.baseUrl}/categories/list`);
  }

  async getStats(): Promise<StatsResponse> {
    return apiClient.get<StatsResponse>(`${this.baseUrl}/stats/summary`);
  }
}

export const imageService = new ImageService();
