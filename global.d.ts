declare module '*.svg' {
    const content: string;
    export default content;
}

interface String {
    html2text(): string;
}