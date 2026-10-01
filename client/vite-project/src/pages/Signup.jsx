import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'

function Signup() {
    const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
    const [loader, setLoader] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        if (errorMsg) setErrorMsg('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation checks
        if (!form.name || !form.username || !form.email || !form.password) {
            setErrorMsg('Please fill in all fields.')
            return
        }

        setLoader(true)
        setErrorMsg('')

        try {
            await axiosInstance.post('/users/register', form)
            console.log("User Registered")
            navigate('/login')
        } catch (error) {
            console.log(error)
            setErrorMsg(
                error.response?.data?.message || 'Registration failed. Please try again.'
            )
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100">

                {/* Branding & Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-xl shadow-lg shadow-indigo-200">
                        sst
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                        Join sst social
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Connect seamlessly. Share effortlessly.
                    </p>
                </div>

                {/* Global Error Banner */}
                {errorMsg && (
                    <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
                        {errorMsg}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">

                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Alex Morgan"
                            disabled={loader}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 text-sm placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50"
                        />
                    </div>

                    {/* Username Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm">
                                @
                            </span>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="alexmorgan"
                                disabled={loader}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-3 text-slate-800 text-sm placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="alex@example.com"
                            disabled={loader}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 text-sm placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            disabled={loader}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 text-sm placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loader}
                        className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-500/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loader ? (
                            <>
                                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                Registering...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Footer / Login Link */}
                <div className="border-t border-slate-100 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Already part of the community?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Signup
