export default function LocalStorageAdapter() {
    return <pre>
        <code>

            {
                `const STORAGE_KEY = "my_items"

type Item = {
    id: string
    date: string
    description: string
    status: string
}

const db = {
    all(): Item[] {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    },

    create(item: Item) {
        const items = db.all()
        items.push(item)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        return item
    },

    update(id: string, newData: Partial<Item>) {
        const items = db.all()
        const index = items.findIndex(i => i.id === id)
        if (index === -1) return null

        items[index] = {...items[index], ...newData }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        return items[index]
    },

    delete(id: string) {
        let items = db.all()
        items = items.filter(i => i.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        return true
    },

    get(id: string): Item | null {
        const items = db.all()
        return items.find(i => i.id === id) || null
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY)
    }
}
`}
        </code>
    </pre>
}
