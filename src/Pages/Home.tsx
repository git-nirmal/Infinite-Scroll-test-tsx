import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import "../Home.css";
type followersData = {
    hits: [title: string, url: string, created_at: string ,author :string];
  };

const Home = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const [arr, setArr] = useState< object[] >([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  let dataFound = false;
  let navigate = useNavigate();

  async function fetchApi() {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    );
    const data1 = await response.json() as followersData;
    setData(data1.hits);

    // setArr((prevdata)=>{
    //     return [...prevdata,...data];

    // });
    if (data1.hits.length > 0) {
      setArr([...arr, ...data]);
    } else {
      setHasMore(false);
    }

    console.log("page ", page, data);
    console.log("array length ", arr.length);
    //
  }

  // const SearchInData=()=>{
  //     const a = arr.filter((val)=>{return val.title.toLowerCase().includes(searchTerm.toLowerCase())});
  //     setArrayOne(a);
  //   }

  useEffect(() => {
    fetchApi();
    const interval = setInterval(() => {
      setPage(page + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  // useEffect(() => {
  //     SearchInData();
  //     setResult((searchTerm=="" ? arr : arrOne ));
  // }, [searchTerm])
  const scrolltoend = () => {
    setPage(page + 1);
  };

  return (
    <div className="back2" data-testid="main">
      <div className="back">
        <input
          type="text"
          placeholder="Search Here"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className="searchbar"
        />
        {/* <button type="search">Search</button> */}
      </div>
      <InfiniteScroll
        dataLength={arr.length}
        next={scrolltoend}
        hasMore={hasMore}
        loader={false}
      >
        {arr
          .filter((val: any) => {
            if (searchTerm === "") {
              return arr;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.author.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item: any, index: any) => {
            dataFound = true;
            return (
              <div
                data-testid="navDiv"
                key={index}
                className="container"
                onClick={() => {
                  navigate("/details", { state: item });
                }}
              >
                <h2>
                  {" "}
                  <u>Title</u> : {item.title}
                </h2>
                <h3>
                  <u>Author</u> :{item.author}
                </h3>
                <h3>
                  <u>Created At</u>: {item.created_at}
                </h3>
                <h4>
                  <u>URL</u>: {item.url}
                </h4>
                {/* <h4> <u>tags</u>: {item._tags.map(i=>{return(<p>{i}</p>)})}</h4> */}
              </div>
            );
          })}
      </InfiniteScroll>
      {!hasMore && searchTerm.trim().length === 0 && (
        <p>Over.. Bye...</p>
      )}
      {searchTerm.trim().length > 0 && !dataFound && <p>No Match Found</p>}
    </div>
  );
};
export default Home;
