import { faker } from '@faker-js/faker';
import Answer from "../models/Answer.js";

const run = async (limit) => {
    try {
        let data = [];
        for(let i = 0; i < limit; i++) {
            data.push({
                '65bfa1e831b127f8b8419d32': faker.person.fullName(),
                '65bf2e49f97253a7f4f998ff': faker.helpers.arrayElement(['40', '42']),
                '65bfad06a3ec44b2413d9b24': faker.helpers.arrayElements(['Semur', 'Rendang', 'Nasi Uduk', 'Dendeng']),
                '65c19bd6c7f1fe9a988c5cf6': faker.internet.email(),
                'formId': '65be1f95914e0c5e598ef594',
                'userId': '65be1b27e5c0491ca9b8862e',
            });
        }
        const fakeData = await Answer.insertMany(data);
        if(fakeData) {
            console.log(fakeData);
            process.exit();
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

export { run };