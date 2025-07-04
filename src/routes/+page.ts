import type { PageLoad } from "./$types"

export interface IName {
    count: number,
    name: string,
    age: number
}

export const load: PageLoad = async ({ url, fetch }) => {
    const name = url.searchParams.get('name')

    if (!name) {
        return {}
    }

    const response = await fetch(`https://api.agify.io/?name=${name}`)
    const nameInformation: IName = await response.json()
    
    return { nameInformation }
}

