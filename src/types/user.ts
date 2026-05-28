export type UserStatus = 'active' | 'inactive' | 'pending' | 'blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantorName: string;
  guarantorPhone: string;
  guarantorEmail: string;
  guarantorRelationship: string;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
}
