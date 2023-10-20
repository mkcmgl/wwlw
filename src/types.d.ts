export type ExtendImportMeta = ImportMeta & {
    env: Record<string, string> & {
        VITE_APP_NAME: string;
        VITE_API_URL: string;
        VITE_API_UPLOAD_URL?: string;
        VITE_TOKEN_KEY?: string;
        VITE_APP_PUBLIC_KEY: string;
        VITE_APP_PRIVATE_KEY: string;
        VITE_BLOCKCHAIN_BROWSER_URL: string;
    };
};