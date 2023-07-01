const birthdayValidator = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return (age >= 18 && age <= 111) || 'Please, enter a valid date';
};

const avatarValidator = (file) => {
  return (
    (file[0] && file[0].type.split('/')[0] === 'image') ||
    'Please, add correct image format'
  );
};

export { birthdayValidator, avatarValidator };
