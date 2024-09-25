'use client';

import React from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
  FieldValues,
  SubmitHandler,
  useForm

} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { error } from 'console'
import Modal from './Modal'
import Heading from '../Heading';
import Input from '../Input';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const[ isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name:'',
      email:'',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      registerModal.onClose();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const bodyContent =(
    <div className='flex flex-col gap-4'>
        <Heading 
          title='Welcom to Airbnb'
          subtitle='Creat an account'
        />
        <Input />
    </div>
  )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}

    />
  )
}

export default RegisterModal
