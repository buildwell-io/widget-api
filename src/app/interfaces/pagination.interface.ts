export interface PaginationRequest {
    pageIndex: number;
    perPage: number;
}

export interface Paginated<T> {
    data: T[];
    requestPageIndex: number;
    requestPerPage: number;
    totalItems: number;
    totalPages: number;
}
