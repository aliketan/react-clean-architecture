import axios, { AxiosError } from "axios";
import { BASE_URL } from '../../../shared/constants/EndPointConst';
import type { IRequestOptions } from '../../../shared/types/IRequestOptionsType';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(response => {
      return response;
    }, (error:AxiosError) => {
      /*const { data, status } = error.response as AxiosResponse;

      switch (status) { 
        case 404:
          router.navigate('/server-error', { state: { error: data, status: status } });
          break;
          default:
            alert.Message({
            type: data?.status,
            message: data?.response,
          });
            break;
      }*/

      return Promise.reject(error.response);
    });


const axiosApi = async (endpoint:string, options:IRequestOptions = {}): Promise<any> => {
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

    // Axios seçeneklerini birleştir
  const axiosOptions = {
    url: endpoint,
    method: options.method || 'GET',
    headers,
    data: options.body,
    params: options.params,
    ...options,
  };

  try {

    const response = await axios(axiosOptions);

    // JSON olmayan yanıtları kontrol et
    if (response.headers['content-type']?.includes('application/json')) {
      return response.data;
    } else {
      return response;
    }
  } catch (error: any) {
    if (error.response) {
      // Sunucudan dönen hata
      throw {
        status: error.response.status,
        message: error.response.data?.message || 'Bir hata oluştu',
        data: error.response.data,
      };
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      throw {
        status: 0,
        message: 'Ağ hatası, lütfen bağlantınızı kontrol edin',
      };
    } else {
      // Diğer hatalar
      throw {
        status: 0,
        message: error.message || 'Bilinmeyen bir hata oluştu',
      };
    }
}
};

/**
 * GET isteği
 */
export const  get = (endpoint: string, options: object = {}): Promise<any> => {
  return axiosApi(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * POST isteği
 */
export const post = (endpoint: string, body?: any, options: object = {}): Promise<any> => {
  return axiosApi(endpoint, {
    method: 'POST',
    body,
    ...options,
  });
};

/**
 * PUT isteği
 */
export const put = (endpoint: string, body?: any, options: object = {}): Promise<any> => {
  return axiosApi(endpoint, {
    method: 'PUT',
    body,
    ...options,
  });
};

/**
 * DELETE isteği
 */
export const del = (endpoint: string, options: object = {}): Promise<any> => {
  return axiosApi(endpoint, {
    method: 'DELETE',
    ...options,
  });
};

/**
 * PATCH isteği
 */
export const patch = (endpoint: string, body?: any, options: object = {}): Promise<any> => {
  return patch(endpoint, {
    method: 'PATCH',
    body,
    ...options,
  });
};

/**
 * Form verisi gönderimi için POST isteği
 */
export const postFormData = (endpoint: string, formData: FormData, options: IRequestOptions = {}): Promise<any> => {
  // FormData için Content-Type header'ı eklemeyin, tarayıcı otomatik ekler
  const axiosOptions = {
    method: 'POST',
    body: formData,
    ...options,
    headers: {
      ...options.headers,
    },
  };
  
  // Content-Type'ı kaldır çünkü FormData için boundary otomatik olarak ayarlanmalı
  delete axiosOptions.headers['Content-Type'];
  
  return axiosApi(endpoint, axiosOptions);
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
