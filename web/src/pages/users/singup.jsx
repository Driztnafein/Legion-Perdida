
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { create, login } from '../../services/api-service';


const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await create(data);
            console.log('Usuario registrado:', response);
            // Aquí podrías redirigir al usuario a la página de inicio de sesión o a cualquier otra página
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Nombre de usuario:</label>
                <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                />
                {errors.name && <span>Este campo es obligatorio</span>}
            </div>

            <div>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span>Este campo es obligatorio</span>}
            </div>

            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>Este campo es obligatorio</span>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", { 
                        required: "Este campo es obligatorio",
                        validate: value =>
                            value === getValues("password") || "Las contraseñas no coinciden"
                    })}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit">Registrarse</button>
            <Link to="/users/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </form>
    );
};

export default RegisterForm;
