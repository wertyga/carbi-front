const emptyField = {
  en: 'This is require field',
  ru: 'Заполните поле',
};

export const gfErrors = {
  emailError: value => {
    if (!value) return { en: emptyField.en, ru: emptyField.ru };
    return { en: 'E-mail invalid', ru: 'Неверный адрес электронной почты' };
  },
  emptyField,
  notFoundDescription: {
    en: 'Sorry, this page was not found',
    ru: 'Страница не найдена',
  },
};
