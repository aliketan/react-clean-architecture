export interface IRequestOptions { 
    headers?: Record<string, string>; // HTTP başlıkları
    [key: string]: any;
}