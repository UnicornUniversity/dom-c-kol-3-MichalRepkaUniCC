//TODO add imports if needed

/**
 * Generates a list of employees with random attributes.
 * Each employee has: gender, birthdate, name, surname, workload.
 * Birthdate is generated so that the age fits strictly into <min, max>.
 *
 * @param {object} dtoIn Input object:
 *   {
 *     count: number,
 *     age: { min: number, max: number }
 *   }
 *
 * @returns {Array} dtoOut – array of employees:
 *   [
 *     {
 *       gender: "male" | "female",
 *       birthdate: string,
 *       name: string,
 *       surname: string,
 *       workload: number
 *     }
 *   ]
 */
export function main(dtoIn) {

  const count = dtoIn?.count ?? 0;
  let minAge = dtoIn?.age?.min ?? 18;
  let maxAge = dtoIn?.age?.max ?? 65;

  // swap if inverted
  if (minAge > maxAge) {
    const tmp = minAge;
    minAge = maxAge;
    maxAge = tmp;
  }

  // if no employees requested → return empty list
  if (count <= 0) {
    return [];
  }

  // Data pools ------------------------------------------------------------
  const maleNames = [
    "Vratislav", "Jan", "Petr", "Jiří", "Lukáš", "Tomáš", "Daniel",
    "Karel", "Marek", "Jakub", "Ondřej", "Martin", "David", "Patrik",
    "Roman", "Aleš", "Václav", "Michal", "Filip", "Robert"
  ];

  const femaleNames = [
    "Jiřina", "Jana", "Anna", "Eliška", "Lucie", "Alžběta", "Veronika",
    "Tereza", "Hana", "Barbora", "Michaela", "Petra", "Markéta", "Lenka",
    "Adéla", "Kristýna", "Simona", "Monika", "Martina", "Zuzana"
  ];

  const surnames = [
    "Sýkora", "Ptáčková", "Novák", "Dvořák", "Procházka", "Svoboda",
    "Černý", "Kučera", "Veselý", "Horák", "Němec",
    "Marek", "Pokorný", "Pospíšil", "Hájek", "Jelínek",
    "Král", "Růžička", "Fiala", "Beneš"
  ];

  const workloads = [10, 20, 30, 40];

  // Helpers ---------------------------------------------------------------

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFromArray(arr) {
    return arr[randomInt(0, arr.length - 1)];
  }

  /**
   * Generates birthdate so that real age fits strictly into <minAge, maxAge>.
   * Uses average year = 365.25 days.
   */
  function randomBirthdate(minAgeYears, maxAgeYears) {
    const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

    const randomAge = minAgeYears + Math.random() * (maxAgeYears - minAgeYears);

    const nowMs = Date.now();
    const birthMs = nowMs - randomAge * MS_PER_YEAR;

    return new Date(birthMs).toISOString();
  }

  function createEmployee(minAge, maxAge) {
    const gender = Math.random() < 0.5 ? "male" : "female";

    const name =
      gender === "male" ? randomFromArray(maleNames) : randomFromArray(femaleNames);

    const surname = randomFromArray(surnames);
    const birthdate = randomBirthdate(minAge, maxAge);
    const workload = randomFromArray(workloads);

    return {
      gender,
      birthdate,
      name,
      surname,
      workload
    };
  }

  // Main loop -------------------------------------------------------------
  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    dtoOut.push(createEmployee(minAge, maxAge));
  }

  return dtoOut;
}

