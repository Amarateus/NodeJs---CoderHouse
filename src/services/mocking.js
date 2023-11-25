import {
    fakerES as faker
} from '@faker-js/faker'

export const generate100Products = async () => {
    let products = []
    for (let i = 0; i < 100; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            title: faker.lorem.word(7),
            category: faker.lorem.word(10),
            description: faker.lorem.paragraph(2),
            price: faker.commerce.price(),
            code: faker.number.int(9999),
            stock: faker.number.int(50),
            thumbnail: "img",
            status: "true",
        }
        products.push(product)
    }
    return products
}