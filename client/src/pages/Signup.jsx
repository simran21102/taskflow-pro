import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, 'Use at least 8 characters'),
  role: z.enum(['ADMIN', 'MEMBER']),
});

const Signup = () => {
  const navigate = useNavigate();
  const { register: signup } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'MEMBER' },
  });

  const onSubmit = async (values) => {
    if (await signup(values)) navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-soft dark:bg-slate-900">
      <div className="mb-8 lg:hidden">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-black text-white">T</div>
          <span className="text-xl font-black">TaskFlow Pro</span>
        </Link>
      </div>
      <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Create account</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Choose whether this account is an admin or member.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label className="block text-sm font-bold">Name<input {...register('name')} className="field mt-2" /></label>
        {errors.name && <p className="text-sm text-danger">{errors.name.message}</p>}
        <label className="block text-sm font-bold">Email<input {...register('email')} className="field mt-2" /></label>
        {errors.email && <p className="text-sm text-danger">{errors.email.message}</p>}
        <label className="block text-sm font-bold">Password<input type="password" {...register('password')} className="field mt-2" /></label>
        {errors.password && <p className="text-sm text-danger">{errors.password.message}</p>}
        <label className="block text-sm font-bold">
          Role
          <select {...register('role')} className="field mt-2">
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        {errors.role && <p className="text-sm text-danger">{errors.role.message}</p>}
        <button disabled={isSubmitting} className="btn-primary w-full">Sign up</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">Have an account? <Link className="font-bold text-primary" to="/login">Log in</Link></p>
    </div>
  );
};

export default Signup;
