// Практика создания type guard и правильных интерфейсов

// Request
// {
//     animal: 'cat' | 'dog' | 'bird',
//     breed: string,
//     sterilized?: string
// }

// Response #1

// {
//     status: 'available',
//     data: {
//         animal: 'cat' | 'dog' | 'bird',
//         breed: string,
//         sterilized?: string,
//         location: string,
//         age?: number
//     }
// }

// Response #2

// {
//     status: 'not available',
//     data: {
//         message: string,
//         nextUpdateIn: Date
//     }
// }

type Animal = "cat" | "dog" | "bird";

interface AnimalData {
	animal: Animal;
    breed: string;
    sterilized?: string;
}

enum AnimalStatus {
	Available = "available",
	DataNotAvailable = "not available",
}

interface AnimalAvailableData extends AnimalData{
	location: string;
	age?: number;
}

interface AnimalNotAvailableData {
	message: string;
	nextUpdateIn: Date;
}

interface AnimalAvailableResponse {
	status: AnimalStatus.Available;
	data: AnimalAvailableData;
}

interface AnimalNotAvailableResponse {
	status: AnimalStatus.DataNotAvailable;
	data: AnimalNotAvailableData;
}

type Res = AnimalAvailableResponse | AnimalNotAvailableResponse;

function isAvailable (res: Res): res is AnimalAvailableResponse {
	if (res.status === AnimalStatus.Available) {
		return true;
	} else {
		return false;
	}
}
function checkAnimalData(animal: Res): AnimalAvailableData | string {
	if (isAvailable(animal)) {
		// Заменить условие!
		return animal.data;
	} else {
		return `${animal.data.message}, you can try in ${animal.data.nextUpdateIn}`;
	}
}
