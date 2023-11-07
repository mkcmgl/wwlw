export type PaginatedData<T> = {
    list: T[];
    total: number;
};

export type Filter =
    string
    | {
        type: 'single-select',
        label: string,
        options: {
            label: string,
            value: unknown,
        }[],
    }
    | {
        type: 'datetime-period',
        label: string,
        start: string,
        end: string,
    }
    | {
        type: 'number',
        label: string,
    };


export type Filters = Recored<string, Filter>;