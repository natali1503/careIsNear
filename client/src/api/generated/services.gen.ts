// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { PostApiAuthData, PostApiAuthError, PostApiAuthResponse, GetApiUserFavouritesError, GetApiUserFavouritesResponse, PostApiUserFavouritesData, PostApiUserFavouritesError, PostApiUserFavouritesResponse, DeleteApiUserFavouritesByRequestIdData, DeleteApiUserFavouritesByRequestIdError, DeleteApiUserFavouritesByRequestIdResponse, GetApiUserError, GetApiUserResponse, PostApiRequestByIdContributionData, PostApiRequestByIdContributionError, PostApiRequestByIdContributionResponse, GetApiRequestByIdData, GetApiRequestByIdError, GetApiRequestByIdResponse, GetApiRequestError, GetApiRequestResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * (Auth) Авторизация пользователя и генерация JWT токена
 */
export const postApiAuth = <ThrowOnError extends boolean = false>(options: Options<PostApiAuthData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostApiAuthResponse, PostApiAuthError, ThrowOnError>({
        ...options,
        url: '/api/auth'
    });
};

/**
 * (LoadUserFavorites) Получение списка избранных запросов пользователя
 */
export const getApiUserFavourites = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetApiUserFavouritesResponse, GetApiUserFavouritesError, ThrowOnError>({
        ...options,
        url: '/api/user/favourites'
    });
};

/**
 * (AddToFavourites) Добавление запроса в избранное пользователя
 */
export const postApiUserFavourites = <ThrowOnError extends boolean = false>(options: Options<PostApiUserFavouritesData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostApiUserFavouritesResponse, PostApiUserFavouritesError, ThrowOnError>({
        ...options,
        url: '/api/user/favourites'
    });
};

/**
 * (RemoveFromFavourites) Удаление запроса из избранного пользователя
 */
export const deleteApiUserFavouritesByRequestId = <ThrowOnError extends boolean = false>(options: Options<DeleteApiUserFavouritesByRequestIdData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteApiUserFavouritesByRequestIdResponse, DeleteApiUserFavouritesByRequestIdError, ThrowOnError>({
        ...options,
        url: '/api/user/favourites/{requestId}'
    });
};

/**
 * (LoadUserInfo) Получение данных профиля пользователя
 */
export const getApiUser = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetApiUserResponse, GetApiUserError, ThrowOnError>({
        ...options,
        url: '/api/user'
    });
};

/**
 * (ContributeToRequest) Внесение вклада в запрос на помощь
 */
export const postApiRequestByIdContribution = <ThrowOnError extends boolean = false>(options: Options<PostApiRequestByIdContributionData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostApiRequestByIdContributionResponse, PostApiRequestByIdContributionError, ThrowOnError>({
        ...options,
        url: '/api/request/{id}/contribution'
    });
};

/**
 * (LoadRequestDetails) Получение деталей запроса на помощь
 */
export const getApiRequestById = <ThrowOnError extends boolean = false>(options: Options<GetApiRequestByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetApiRequestByIdResponse, GetApiRequestByIdError, ThrowOnError>({
        ...options,
        url: '/api/request/{id}'
    });
};

/**
 * (LoadRequests) Получение всех запросов на помощь
 */
export const getApiRequest = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetApiRequestResponse, GetApiRequestError, ThrowOnError>({
        ...options,
        url: '/api/request'
    });
};