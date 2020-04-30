const summaryApi = "https://api.covid19api.com/summary";
fetch(summaryApi)
  .then((res) => res.json())
  .then((res_) => {
    const { Global } = res_;
    console.log(Global);
  });
