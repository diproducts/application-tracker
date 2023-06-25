import { useForm } from "react-hook-form";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";

const SignUp = observer(({ toggle }) => {
    const { register, handleSubmit, getValues } = useForm();

    const onSubmit = (data) => {
        if (schema.validate(data)) {
            const body = { name: data.name, password: data.password, email: data.email }
            console.log(body)
            userStore.registerUser(body);
        } else {
            console.log('could not validate')
        }
    }

    return (
        <div className='container'>
            <h1>Sign up</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className='form-wrapper'>
                    <label htmlFor='name'>username: </label>
                    <input {...register("name", { required: false })} type='text' name='name' />
                    <label htmlFor='email'>email: </label>
                    <input {...register("email", { required: true })} type='text' name='email' />
                    <label htmlFor='password'>password: </label>
                    <input {...register("password", { required: true })} type='password' name='password' />
                    <label htmlFor='confirm'>confirm password:</label>
                    <input {...register("confirm", { required: true })} type='password' name='confirm' />
                    <input type="submit" className='bt' value='SUBMIT' />
                </div>
            </form>
            <div className='buttons'>
                <button className='bt' onClick={toggle}>LOG IN</button>
            </div>
        </div>
    )
});

export default SignUp;