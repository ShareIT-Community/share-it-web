"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ValidationShark from 'securesharkinputs';

interface FormData {
  name: string;
  email: string;
  message: string;
  age?: number;
}

const SecureSharkForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    age: undefined
  });
  
  const {
    handleSubmit,
    watch,
    reset,
    control
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
      age: undefined
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('🚀 Attempting to submit form...');
    console.log('✅ Form submitted successfully:', data);
    setIsSubmitted(true);
    reset();
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  // 🔄 Sync formData with form values
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 🛡️ Callback functions to track validation events
  const handleValidInput = (inputId: string) => {
    const value = formData[inputId as keyof FormData] as string;
    console.log(`✅ Input "${inputId}" is valid: "${value}"`);
  };

  const handleInvalidInput = (inputId: string) => {
    const value = formData[inputId as keyof FormData] as string;
    console.log(`❌ Input "${inputId}" contains malicious content: "${value}"`);
    console.log('🚨 Form submission will be blocked!');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg text-black shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🛡️ SecureSharkInputs Demo
      </h2>
      
      {isSubmitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ Form submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field - Required */}
        {/* 💡 required={true} adds automatic validation and asterisk (*) */}
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ValidationShark 
              {...field}
              type="text"
              label="Name"
              placeholder="Enter your name (required)"
              required={true}
              onValid={() => handleValidInput('name')}
              onInvalid={() => handleInvalidInput('name')}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ValidationShark 
              {...field}
              type="email"
              label="Email"
              placeholder="Enter your email"
              required={true}
              onValid={() => handleValidInput('email')}
              onInvalid={() => handleInvalidInput('email')}
            />
          )}
        />

        {/* Age Field */}
        <Controller
          name='age'
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <ValidationShark 
              {...field}
              type="number"
              label="Age"
              placeholder="Enter your age"
            />
          )}
        />

        {/* Message Field */}
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ValidationShark 
              {...field}
              type="text"
              label="Message"
              placeholder="Enter your message"
              required={true}
              onValid={() => handleValidInput('message')}
              onInvalid={() => handleInvalidInput('message')}
            />
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default SecureSharkForm; 