import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../context/user.context';

import './sign-in-form.styles.scss';

import { 
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext)

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user)
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect email or password.');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email.');
          break;
        default:
          console.log(error);
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email' 
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email
          }}
        />

        <FormInput 
          label='Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password
          }}
        />
        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button 
            type="button" 
            onClick={signInWithGoogle} 
            buttonType='google'
          > Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;