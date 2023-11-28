import { useEffect, useState } from "react";
export default function App() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  function handleSubmit() {
    setAdvice();
    setAdviceId(null);
  }

  useEffect(
    function () {
      async function adviceGenerator() {
        try {
          setIsLoading(true);
          const res = await fetch("https://api.adviceslip.com/advice");
          const data = await res.json();
          setAdvice(data.slip.advice);
          setAdviceId(data.slip.id);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      adviceGenerator();
    },
    [adviceId]
  );

  return (
    <div className="advice">
      <p>
        Advice <span>#{adviceId}</span>
      </p>
      <h2 className="quote">{isLoading ? <Loader /> : `"${advice}"`}</h2>
      <div>
        <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
            <g transform="translate(212)" fill="#CEE3E9">
              <rect width="6" height="16" rx="3" />
              <rect x="14" width="6" height="16" rx="3" />
            </g>
          </g>
        </svg>
      </div>
      <button className="btn" onClick={handleSubmit}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            fill="#202733"
          />
        </svg>
      </button>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
