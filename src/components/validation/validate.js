import validation from 'validate.js';

export default function validate(fieldName, value) {
  const constraints = {
    email: {
      presence: true,
      format: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email',
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 5,
        message: 'Invalid Password',
      },
    },
    phoneNo: {
      presence: true,
      format: {
        pattern: '^[0-9]{10}$',
        message: 'Invalid phone number',
      },
    },
  };

  const formValues = {};
  formValues[fieldName] = value;

  const formFields = {};
  formFields[fieldName] = constraints[fieldName];


  const result = validation(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}
