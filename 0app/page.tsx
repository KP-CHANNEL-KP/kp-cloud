export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f2a] to-[#1a1446] text-white flex items-center justify-center">

      <div className="bg-[#15193c] p-10 rounded-2xl shadow-xl text-center w-[350px]">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">KP Cloud 🚀</h1>
        <p className="text-gray-400 mb-6">Welcome to your storage</p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <a
            href="/login"
            className="bg-purple-600 hover:bg-purple-700 transition p-3 rounded-lg"
          >
            Login
          </a>

          <a
            href="/register"
            className="border border-purple-500 hover:bg-purple-600/20 transition p-3 rounded-lg"
          >
            Register
          </a>
        </div>

      </div>

    </div>
  );
}