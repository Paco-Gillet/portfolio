import 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string) => string;
        $tc: (key: string, choice?: number) => string;
        $n: (value: number, format?: string) => string;
        $d: (value: Date, format?: string) => string;
    }
}