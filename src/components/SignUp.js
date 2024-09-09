import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';



function SignUp() {
  const professions = ['Engineer', 'Doctor', 'Teacher', 'Artist', 'Other'];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      profession: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      phone: Yup.string().required('Phone number is required'),
      profession: Yup.string().required('Please select a profession'),
    }),
    onSubmit: (values) => {
      localStorage.setItem('user', JSON.stringify(values));
      toast.success('User registered successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    },
  });

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row">
    

        <div className=" d-flex align-items-center justify-content-center ">
          <div className="card p-5 shadow-sm rounded-5 signup-card">
            <h2 className="text-center text-white">Signup</h2>
            <p className="text-center  text-white">Just some details to get you in.!</p>

            <form onSubmit={formik.handleSubmit}> 
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  autoComplete='true'
                  className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                    autoComplete='true'
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                    autoComplete='true'
                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                    autoComplete='true'
                  className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                  placeholder="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <select
                  name="profession"
                  className={`form-select ${formik.touched.profession && formik.errors.profession ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.profession}
                >
                  <option value="">Select Profession</option>
                  {professions.map((profession) => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
                {formik.touched.profession && formik.errors.profession ? (
                  <div className="invalid-feedback">{formik.errors.profession}</div>
                ) : null}
              </div>

              <button type="submit" className="btn btn-primary w-100">Signup</button>
            </form>

            <div className="mt-4 text-center ">
              <p className='text-white'>Already Registered? <a href="/login" className="text-decoration-none">Login</a></p>
            </div>

        
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignUp;
