import { ageCalculate } from '@/utils/helper';

const birthdayValidator = (birthDate: string) => {
  const age = ageCalculate(new Date(birthDate));

  return (age >= 18 && age <= 111) || 'Please, enter a valid date';
};

const avatarValidator = (file: File) => {
  return (
    file.type.split('/')[0] === 'image' || 'Please, add correct image format'
  );
};

export { birthdayValidator, avatarValidator, ageCalculate };
