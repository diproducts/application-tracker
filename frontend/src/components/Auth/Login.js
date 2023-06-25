import { useForm } from "react-hook-form";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const LogIn = observer(({ toggle }) => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const response = await userStore.loginUser(data);
        if (!response) console.log('could not login');
        else {
            userStore.setLogged(true);
            navigate("/dashboard")
        }
    }

    return (
        <div className='container'>
            <h1>Log in</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className='form-wrapper'>
                    <label htmlFor='email'>email: </label>
                    <input {...register("email", { required: true })} type='text' name='email' />
                    <label htmlFor='password'>password: </label>
                    <input {...register("password", { required: true })} type='password' name='password' />
                    <input type="submit" className='bt' value='SUBMIT' />
                </div>
            </form>
            <div className='buttons'>
                <button className='bt' onClick={toggle}>SIGN UP</button>
            </div>
        </div>
    )
});
export default LogIn;