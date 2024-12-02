import React from 'react';

const useInputData = () => {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const usernameRef = React.useRef(null);
  const cardNameRef = React.useRef(null);
  const cardNumberRef = React.useRef(null);
  const cvvRef = React.useRef(null);

  const InputData = [
    {
      feild: 'Email Address',
      ref: emailRef,
      keyBoardType: 'email-address',
      nextRef: passwordRef,
    },
    {
      
      feild: 'Password',
      ref: passwordRef,
      keyBoardType: 'default',
      nextRef: null,
    },
  ];

  const InputDetails = [
    {
      feild: 'Username',
      ref: usernameRef,
      keyBoardType: 'default',
      nextRef: emailRef,
    },
    {
      feild: 'Email Address',
      ref: emailRef,
      keyBoardType: 'email-address',
      nextRef: passwordRef,
    },
    {
      feild: 'Password',
      ref: passwordRef,
      keyBoardType: 'default',
      nextRef: null,
    },
  ];

  const InputCardDetails = [
    {
      feild: 'Card Holder',
      ref: cardNameRef,
      keyBoardType: 'default',
      nextRef: cardNumberRef,
    },
    {
      feild: 'Card Number',
      ref: cardNumberRef,
      keyBoardType: 'number-pad',
    },
  ];

  const InputCardInformation = [
    {
      feild: 'Expiry Date',
      keyBoardType: 'number-pad',
      nextRef: cvvRef,
    },
    {
      feild: 'CVV',
      ref: cvvRef,
      keyBoardType: 'number-pad',
      nextRef: null,
    },
  ];

  const profileSettingsInput = [
    {
      feild: 'Name',
      keyBoardType: 'default',
    },
    {
      feild: 'Email',
      keyBoardType: 'default',
    },
    {
      feild: 'Password',
      keyBoardType: 'default',
    },
    {
      feild: 'Phone',
      keyBoardType: 'number-pad',
    },
    {
      feild: 'Address',
      keyBoardType: 'default',
    },
    {
      feild: 'Birthday',
      keyBoardType: 'default',
    },
  ];

  return {
    InputData,
    profileSettingsInput,
    InputDetails,
    InputCardDetails,
    InputCardInformation,
  };
};

export default useInputData;
