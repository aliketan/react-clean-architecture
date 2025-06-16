import { BASE_URL } from '../../../shared/constants/EndPointConst';
import type { IRequestOptions } from '../../../shared/types/IRequestOptionsType';

/**
 * HTTP istekleri için yardımcı fonksiyon
 * @param {string} endpoint - API endpoint'i
 * @param {Object} options - Fetch seçenekleri
 * @returns {Promise} - Response promise
 */
const fetchApi = async (endpoint:string, options:IRequestOptions = {}): Promise<any> => {
  // Default headers ayarlamaları
  const headers:Record<string,string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Auth token varsa ekle
  const token = JSON.parse(localStorage.getItem('authToken') || '{}');
  if (token) {
    headers.Authorization = `Bearer ${token.token}`;
  }

  // Fetch seçeneklerini birleştir
  const fetchOptions = {
    ...options,
    headers,
  };

  try {

    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    
    // JSON olmayan yanıtları kontrol et
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Hata kontrolü
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'Bir hata oluştu',
          data
        };
      }
      
      return data;
    } else {
      // JSON olmayan yanıtlar için
      if (!response.ok) {
        throw {
          status: response.status,
          message: 'Bir hata oluştu',
        };
      }
      
      return response;
    }
  } catch (error) {
    // Network hataları ve diğer istisnalar
    if (error instanceof Error && !(error as any).status) {
      console.error('API İsteği Hatası:', error.message);
      throw {
        status: 0,
        message: 'Ağ hatası, lütfen bağlantınızı kontrol edin',
      };
    }
    throw error;
  }
};

/**
 * GET isteği
 * @param {string} endpoint - API endpoint'i
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const get = (endpoint:string, options: object = {}): Promise<any> => {
  return fetchApi(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * POST isteği
 * @param {string} endpoint - API endpoint'i
 * @param {Object} data - Gönderilecek veri
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const post = (endpoint: string, data: object, options: object = {}): Promise<any> => {
  return fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * PUT isteği
 * @param {string} endpoint - API endpoint'i
 * @param {Object} data - Güncellenecek veri
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const put = (endpoint: string, data: object, options: object = {}): Promise<any> => {
  return fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE isteği
 * @param {string} endpoint - API endpoint'i
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const del = (endpoint: string, options: object = {}): Promise<any> => {
  return fetchApi(endpoint, {
    method: 'DELETE',
    ...options,
  });
};

/**
 * PATCH isteği
 * @param {string} endpoint - API endpoint'i
 * @param {Object} data - Kısmi güncellenecek veri
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const patch = (endpoint: string, data: object, options: object = {}): Promise<any> => {
  return fetchApi(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * Form verisi gönderimi için POST isteği
 * @param {string} endpoint - API endpoint'i
 * @param {FormData} formData - Form verisi
 * @param {Object} options - Ek fetch seçenekleri
 * @returns {Promise} - Response promise
 */
export const postFormData = (endpoint: string, formData: FormData, options: IRequestOptions = {}): Promise<any> => {
  // FormData için Content-Type header'ı eklemeyin, tarayıcı otomatik ekler
  const fetchOptions = {
    method: 'POST',
    body: formData,
    ...options,
    headers: {
      ...options.headers,
    },
  };
  
  // Content-Type'ı kaldır çünkü FormData için boundary otomatik olarak ayarlanmalı
  delete fetchOptions.headers['Content-Type'];
  
  return fetchApi(endpoint, fetchOptions);
};

// Tüm metodları tek bir API objesi olarak dışa aktar
export default {
  get,
  post,
  put,
  del,
  patch,
  postFormData
};