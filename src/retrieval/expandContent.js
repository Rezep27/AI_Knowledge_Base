export async function expandContent(index, matches,radius = 1){
    const ids = new Set();

    for (const match of Object.values(matches)){

        const chunkId = match.id;
        const [prefix, number] = match.id.split("-");
        const chunkIndex = Number(number);
        for (let offset = -radius; offset <= radius; offset ++){

            if (offset === 0){
                continue;
            }

            const neighborIndex = chunkIndex + offset;
            const neighborId = `${prefix}-${String(neighborIndex).padStart(6, "0")}` 
            ids.add(neighborId);
            console.log(`Neighbor: ${neighborId}`);
        }
    }

    console.log("Fetching neighbors ...");

    const response = await index.fetch({
        ids: [...ids]
    });

    const neighbors = Object.values(
        response.records ?? {}
    );

    const combinedValues = [
        ...neighbors,
        ...matches
    ]

    const unique = new Map();

    for (const item of combinedValues){
        unique.set(item.id, item);
    }

    return [...unique.values()].sort((a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1]))
}