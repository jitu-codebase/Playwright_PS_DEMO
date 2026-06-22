/* Generates random user data (first name, last name, postal code) using Faker.js for use in checkout form tests */
import { faker } from "@faker-js/faker";
import { userData } from "../types/user-info"

export const randomUserData = (): userData => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode()
    }
}