import UserForm from "../comps/UserForm";

export default function Register() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <UserForm register={true} />
        </div>
      </div>
    </div>
  );
}
