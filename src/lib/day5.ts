import camelcase from "camelcase"

type Mapping = {
    inputStart: number,
    destinationStart: number,
    range: number,
}

class Almanac {
    private seedToSoil: Mapping[] = []
    private soilToFertilizer: Mapping[] = []
    private fertilizerToWater: Mapping[] = []
    private waterToLight: Mapping[] = []
    private lightToTemperature: Mapping[] = []
    private temperatureToHumidity: Mapping[] = []
    private humidityToLocation: Mapping[] = []

    private addEntry(map: Mapping[], inputStart: number, destinationStart: number, range: number) {
        return [...map, {inputStart, destinationStart, range}]
    }

    addSeedToSoilEntry(inputStart: number, destinationStart: number, range: number) {
        this.seedToSoil = this.addEntry(this.seedToSoil, inputStart, destinationStart, range)
    }

    addSoilToFertilizerEntry(inputStart: number, destinationStart: number, range: number) {
        this.soilToFertilizer = this.addEntry(this.soilToFertilizer, inputStart, destinationStart, range)
    }

    addFertilizerToWaterEntry(inputStart: number, destinationStart: number, range: number) {
        this.fertilizerToWater = this.addEntry(this.fertilizerToWater, inputStart, destinationStart, range)
    }

    addWaterToLightEntry(inputStart: number, destinationStart: number, range: number) {
        this.waterToLight = this.addEntry(this.waterToLight, inputStart, destinationStart, range)
    }

    addLightToTemperatureEntry(inputStart: number, destinationStart: number, range: number) {
        this.lightToTemperature = this.addEntry(this.lightToTemperature, inputStart, destinationStart, range)
    }

    addTemperatureToHumidityEntry(inputStart: number, destinationStart: number, range: number) {
        this.temperatureToHumidity = this.addEntry(this.temperatureToHumidity, inputStart, destinationStart, range)
    }

    addHumidityToLocationEntry(inputStart: number, destinationStart: number, range: number) {
        this.humidityToLocation = this.addEntry(this.humidityToLocation, inputStart, destinationStart, range)
    }

    private getMappedValue(input: number, maps: Mapping[]) {

        for (const map of maps) {
            if (input >= map.inputStart && input <= map.inputStart + map.range) {
                const diff = input - map.inputStart;
                return map.destinationStart + diff;
            }
        }

        return input
    }

    private getSoilLocation(seed: number) {
        return this.getMappedValue(seed, this.seedToSoil)
    }

    private getFertilizerLocation(position: number) {
        return this.getMappedValue(position, this.soilToFertilizer)
    }

    private getWaterLocation(position: number) {
        return this.getMappedValue(position, this.fertilizerToWater)
    }

    private getLightLocation(position: number) {
        return this.getMappedValue(position, this.waterToLight)
    }

    private getTemperatureLocation(position: number) {
        return this.getMappedValue(position, this.lightToTemperature)
    }

    private getHumidityLocation(position: number) {
        return this.getMappedValue(position, this.temperatureToHumidity)
    }

    private getLocation(position: number) {
        return this.getMappedValue(position, this.humidityToLocation)
    }

    calculateSeedLocation(seed: number) {
        const soil = this.getSoilLocation(seed)

        const fertilizer = this.getFertilizerLocation(soil);

        const water = this.getWaterLocation(fertilizer)

        const light = this.getLightLocation(water)

        const temperature = this.getTemperatureLocation(light)

        const humidity = this.getHumidityLocation(temperature);

        const location = this.getLocation(humidity);

        return location
    }
}

export function solvePart1(input: string) {

    const [seeds, ...maps] = input.split('\n\n');


    const almanac = new Almanac();

    maps.map((map) => {
        let [name, ...entries] = map.split('\n');
        name = name.split(' map:', 1)[0];
        
        const functionName = camelcase(`add-${name}-entry`);

        for (const entry of entries) {
            const [destinationStart, sourceStart, range] = entry.split(' ').map(Number)

            almanac[functionName as keyof Almanac](sourceStart, destinationStart, range)
        }
    })

    let min: number = Number.MAX_SAFE_INTEGER

    const seedValues = seeds.split(':')[1].trim().split(' ').map(Number)

    for (const seed of seedValues) {
        min = Math.min(min, almanac.calculateSeedLocation(seed))
    }

    return min
}

export function solvePart2(input: string) {
    const [seeds, ...maps] = input.split('\n\n');


    const almanac = new Almanac();

    maps.map((map) => {
        let [name, ...entries] = map.split('\n');
        name = name.split(' map:', 1)[0];
        
        const functionName = camelcase(`add-${name}-entry`);

        for (const entry of entries) {
            const [destinationStart, sourceStart, range] = entry.split(' ').map(Number)

            almanac[functionName as keyof Almanac](sourceStart, destinationStart, range)
        }
    })

    let min: number = Number.MAX_SAFE_INTEGER


    const seedValues = seeds.split(':')[1].trim().split(' ').map(Number)

    function* seedRanges() {
        for (let i = 0; i < seedValues.length; i+= 2) {
            yield [seedValues[i], seedValues[i+1]]
        }
    }

    for (const [start, range] of seedRanges()) {
        for (let i = 0; i <= range; i++) {
            min = Math.min(min, almanac.calculateSeedLocation(start + i))
        }
    }

    return min
}