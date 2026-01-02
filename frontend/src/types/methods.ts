export const Methods = {
    GET:'GET',
    POST:'POST',
    PUT:'PUT',
    DELETE:'DELETE',
    PATCH:'PATCH'
} as const;

export type Method = typeof Methods[keyof typeof Methods];