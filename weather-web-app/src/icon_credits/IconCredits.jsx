import { useEffect, useState } from "react";

export default function IconCredits() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('../src/icon_credits/iconCredits.json')
      .then(response => {
        if (!response.ok){
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if(error) {
    console.log("Somthing went wrong");
  }

  if (loading) {
    return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="max-w-[800px] w-11/12 mx-auto my-16">
      <h1 className="font-bold text-7xl mb-2">Icon Credits</h1>
      <p>
        Icons from{" "}
        <a className="font-bold underline text-cs-blue" href="https://www.flaticon.com" title="Flaticon">
          Flaticon
        </a>
      </p>
      <div className="grid grid-cols-1 auto-rows-auto gap-4 my-8 sm:grid-cols-2 md:grid-cols-3">
        {data.map((data) => (
          <div
            key={data.imgUrl + data.creator}
            className="flex flex-col items-center gap-4 p-4 border-2 border-solid border-primary rounded-2xl lg:hover:shadow-[8px_8px_0_var(--primary)] lg:hover:-translate-y-2 transition-all duration-300"
          >
            <img className="w-40 h-auto" src={`${data.imgUrl}`} alt="" />
            <p>
              <a className="font-bold underline text-cs-blue" href={`${data.attributionUrl}`}>{data.title}</a>
              {" "}created by <b>{data.creator}</b> - Flaticon
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}