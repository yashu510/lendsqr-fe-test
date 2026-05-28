import { User } from '../types/user';

const firstNames = ['Adewale','Chukwuemeka','Oluwaseun','Fatimah','Amina','Tunde','Kemi','Bola','Yewande','Sola','Grace','Emmanuel','Chioma','Babatunde','Ngozi','Ade','Ifeanyi','Tobi','Zainab','Aisha','Funke','Damilola','Taiwo','Kehinde','Musa','Ibrahim','Hauwa','Blessing','Ifeoma','Rotimi'];
const lastNames = ['Adeleke','Okonkwo','Fashola','Bello','Aliyu','Okafor','Adeyemi','Nwosu','Eze','Obi','Johnson','Williams','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas'];
const organizations = ['Lendsqr','Irorun','Lendstar','Finebanc','Paystack','Flutterwave','Cowrywise','Kuda','Carbon','PiggyVest','OPay','Palmpay','VFD Microfinance','Rubies Bank','Jaiz Bank'];
const statuses: User['status'][] = ['active', 'inactive', 'pending', 'blacklisted'];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone(): string {
  return `080${Math.floor(10000000 + Math.random() * 89999999)}`;
}

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function randomAmount(min: number, max: number): string {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toLocaleString('en-NG');
}

export function generateUsers(count: number = 500): User[] {
  return Array.from({ length: count }, (_, i) => {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const org = getRandom(organizations);
    return {
      id: `user-${i + 1}`,
      organization: org,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${org.toLowerCase().replace(/\s/g, '')}.com`,
      phone: randomPhone(),
      dateJoined: randomDate(new Date('2020-01-01'), new Date()),
      status: getRandom(statuses),
      fullName: `${firstName} ${lastName}`,
      bvn: `${Math.floor(10000000000 + Math.random() * 89999999999)}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      maritalStatus: getRandom(['Single', 'Married', 'Divorced']),
      children: String(Math.floor(Math.random() * 5)),
      typeOfResidence: getRandom(['Parent\'s Apartment', 'Personal Apartment', 'School Apartment']),
      levelOfEducation: getRandom(['B.Sc', 'M.Sc', 'OND', 'HND', 'Ph.D']),
      employmentStatus: getRandom(['Employed', 'Self-employed', 'Unemployed']),
      sectorOfEmployment: getRandom(['FinTech', 'Education', 'Healthcare', 'Government', 'NGO']),
      durationOfEmployment: getRandom(['2 years', '3 years', '5 years', '1 year', '7 years']),
      officeEmail: `${firstName.toLowerCase()}@${org.toLowerCase().replace(/\s/g, '')}.com`,
      monthlyIncome: `₦${randomAmount(50000, 500000)} - ₦${randomAmount(500001, 2000000)}`,
      loanRepayment: `₦${randomAmount(10000, 100000)}`,
      twitter: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      guarantorName: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
      guarantorPhone: randomPhone(),
      guarantorEmail: `guarantor${i}@email.com`,
      guarantorRelationship: getRandom(['Sibling', 'Parent', 'Friend', 'Colleague']),
      accountBalance: `₦${randomAmount(1000, 2000000)}`,
      accountNumber: `${Math.floor(1000000000 + Math.random() * 8999999999)}`,
      bankName: getRandom(['Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA', 'Stanbic IBTC']),
    };
  });
}

export const mockUsers: User[] = generateUsers(500);
