import { useEffect, useState } from "react";

function useBoilerplate() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  //모든 데이터가 data 안에 존재
  const [data, setData] = useState({});

  // functions called by user
  const handleA = async () => {};
  const handleB = async () => {};

  const fetchData = async () => {
    try {
      // write await function
      setData({});
    } catch (e) {
      setHasError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    //컴포넌트 첫 마운트 될 시에만 모든 비동기 데이터 호출,
    fetchData();
  }, []);
  return {
    data,
    loading,
    hasError,
    handleA,
    handleB,
  }; // return all value and method
  // you can also return setData, setLoading, setHasError
}

export default useBoilerplate;
