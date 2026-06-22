/* Shared in-memory key-value store used to pass data (e.g. selected product names and prices) between test steps within the same test run */
export class TestContext {
    private contextData: Record<string, any> = {};

    set<T>(key: string, values: T): void {
        this.contextData[key] = values
    }

    get<T>(key: string): T {
        return this.contextData[key];
    }

    has(key: string): boolean {
        return this.contextData.has(key);
    }

    clear(): void {
        this.contextData.clear();
    }

    appendToList<T>(key: string, value: T) {
        const list = this.contextData[key] || [];
        list.push(value);
        this.contextData[key] = list;
    }
}