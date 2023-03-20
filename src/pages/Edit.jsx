import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditForm from "../comps/EditForm";
import TaskForm from "../comps/TaskForm";
import config from "../lib/config";

export default function Edit({}) {
  const nav = useNavigate();
  const params = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(config.apiurl + "/tasks/getbyid/" + params.id, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!data.task) {
        nav("/");
      }
      setTask(data.task);
    })();
  }, [params]);
  if (!task) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <EditForm
            title={task.title}
            description={task.description}
            id={task._id}
          />
        </div>
      </div>
    </div>
  );
}
