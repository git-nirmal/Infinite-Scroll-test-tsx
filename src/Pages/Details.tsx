import 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Details =()=> {
let loc = useLocation();
let data= loc.state;
let navigate= useNavigate();

useEffect(() => {
    //   console.log("first");
    if (data == null) {
        // console.log("json",jsonData);
      navigate("/");
    }
  }, []);




return(
    
    <div data-testid='jsonData'>
        <h2>
            Complete JSON Data
            {JSON.stringify(data)}
        </h2>
    </div >
    
)
}
export default Details;
