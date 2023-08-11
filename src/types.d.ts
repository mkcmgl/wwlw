export type ExtendImportMeta = ImportMeta & {
    env: Record<string,string> & {
        VITE_APP_NAME: string;
    };
};