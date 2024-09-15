export default function Layout() {
  return (
    <>
      <div className="font-burh text-xl mt-12 flex justify-between text-white">
        <h1 className="text-3xl ms-64 font-semibold border border-slate-950">
          GreenBot.
        </h1>
        <ul className="flex font-medium me-64 pt-1 border border-slate-950 space-x-10">
          <li className="hover:underline">Home</li>
          <li className="hover:underline">Blog</li>
          <li className="hover:underline">IOT</li>
          <li className="hover:underline">About</li>
        </ul>
      </div>
    </>
  );
}
