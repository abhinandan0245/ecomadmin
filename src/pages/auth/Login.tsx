import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { FormEvent, useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/slices/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { loginFailure, loginStart, loginSuccess } from '../../store/slices/authSlice';
import { loginUser } from '../../api/authApi';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login '));
    });
    
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const { loading, error } = useSelector((state: IRootState) => state.auth);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);



    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
          const data = await loginUser(email, password);
          console.log(data)
          dispatch(loginSuccess({ token: data.token, user: data.user }));
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('USER', JSON.stringify(data.user));
          toast.success("Login Successfull!")
           navigate('/');
        } catch (err : any) {
          dispatch(loginFailure(err?.response?.data?.msg));
          toast.error(err?.response?.data?.msg || 'Login failed ');
        }
      };





    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                       
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" required/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' id="Password" type={showPassword ? "text" : "password"} placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" required/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {/* <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Remember Me</span>
                                    </label> */}
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}  className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Show Password</span>
                                    </label>
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                {loading ? 'Logging in...' : 'Login'}
                                </button>
                                      {/* Displaying loading state */}
      {loading && <p>Logging in...</p>}

{/* Displaying error message */}
{error && <p style={{ color: 'red' }}>{error}</p>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
