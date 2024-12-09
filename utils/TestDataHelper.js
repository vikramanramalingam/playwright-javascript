const { faker } = require('@faker-js/faker');

class TestDataHelper {

  // Generate a random first name
  static generateFirstName() {
    return faker.person.firstName();
  }

  // Generate a random last name
  static generateLastName() {
    return faker.person.lastName();
  }

  // Generate a random address
  static generateAddress() {
    return faker.location.streetAddress();
  }

  // Generate a random city
  static generateCity() {
    return faker.location.city();
  }

  // Generate a random state
  static generateState() {
    return faker.location.state();
  }

  // Generate a random zip code
  static generateZipCode() {
    return faker.location.zipCode();
  }

  // Generate a random phone number
  static generatePhoneNumber() {
    return faker.phone.number();
  }

  // Generate a random username
  static generateUsername() {
    return faker.internet.username();
  }

  // Generate a random password
  static generatePassword() {
    return faker.internet.password();
  }

  // Generate a random SSN (Social Security Number)
  static generateSSN() {
    return faker.finance.accountNumber();
  }

  // Generate a random account number
  static generateAccountNo() {
    return faker.finance.accountNumber();
  }

  // Generate a random alpha string of a specific length
  static generateRandomString(length){
    return faker.string.alpha(length);
  }

  // Generate a random user data hash
  static generateUserData() {
    const timestamp = Date.now();
    return {
      firstName: TestDataHelper.generateFirstName(),
      lastName: TestDataHelper.generateLastName(),
      address: TestDataHelper.generateAddress(),
      city: TestDataHelper.generateCity(),
      state: TestDataHelper.generateState(),
      zipcode: TestDataHelper.generateZipCode(),
      phoneNumber: TestDataHelper.generatePhoneNumber(),
      ssn: TestDataHelper.generateSSN(),
      username: `${TestDataHelper.generateRandomString(5)}_${timestamp}`,
      password: TestDataHelper.generatePassword(),
    };
  }

  // Generate a random payee data hash
  static generatePayeeData() {
    return {
      firstName: TestDataHelper.generateFirstName(),
      address: TestDataHelper.generateAddress(),
      city: TestDataHelper.generateCity(),
      state: TestDataHelper.generateState(),
      zipcode: TestDataHelper.generateZipCode(),
      phoneNumber: TestDataHelper.generatePhoneNumber(),
      accountNo: TestDataHelper.generateAccountNo(),
    };
  }

}

module.exports = { TestDataHelper };
