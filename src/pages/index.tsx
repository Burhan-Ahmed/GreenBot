import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundImage =
      'url("/jozsef-hocza-mzovOU99uSI-unsplash.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);
  return (
    <>
      <div className="font-burh text-xl mt-12 flex justify-between text-black">
        This is Home Page
      </div>
    </>
  );
}
