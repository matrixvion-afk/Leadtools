export default function Login() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to access your dashboard
          </p>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-xl p-4 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-4 mb-6"
        />

        <a
          href="/dashboard"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
        >
          Login
        </a>

        <div className="text-center mt-6">
          <a
            href="#"
            className="text-blue-600 text-sm"
          >
            Forgot Password?
          </a>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <a
            href="/register"
            className="text-blue-600 ml-2 font-medium"
          >
            Register
          </a>
        </p>

      </div>

    </main>
  );
}