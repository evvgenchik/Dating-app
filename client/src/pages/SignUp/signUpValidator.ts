const birthdayValidator = (birthDate: Date) => {
  const today = new Date();
  let age = ageCalculate(birthDate);
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return (age >= 18 && age <= 111) || 'Please, enter a valid date';
};

const ageCalculate = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

const avatarValidator = (file: File) => {
  return (
    file.type.split('/')[0] === 'image' || 'Please, add correct image format'
  );
};

export { birthdayValidator, avatarValidator, ageCalculate };
