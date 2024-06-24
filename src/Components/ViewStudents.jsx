import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayCourse } from "../Redux/Slice/courseSlice";
import { Button, Card } from "flowbite-react";

const ViewStudents = () => {
    /**Call API to display courses**/
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/api/course/getcourses")
      .then((res) => {
        dispatch(displayCourse(res.data));
        console.log("res",res.data)
      })
      .catch((error) => console.log(error));
  };
    return (
        <div className="min-h-screen">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
          
          {course && course.map((ele, index) => {
            return (
              <Card key={index} className="max-w-sm">
                <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {ele.coursename} [{ele.coursecategory}]
                </h5>
                <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {ele.coursedescription}
                </h6>
  
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{ele.courseprice}
                  </span>
                  <Button
                    id={ele._id}
                    type="button"
                    onClick={() => AddtoCart(ele._id,ele.coursename,ele.coursecategory,ele.coursedescription,ele.courseprice,1)}
                    className="bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
                  >
                    Add to cart
                  </Button>
                  
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
};

export default ViewStudents;