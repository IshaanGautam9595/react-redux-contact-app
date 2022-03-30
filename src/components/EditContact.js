import React, { useEffect, useState } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const EditContact = () => {
  const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ number, setNumber ] = useState("");
    const {id} = useParams();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    //  get all contacts
    const contacts = useSelector(state => state);
    //filter particular contact
    const currentContact = contacts.find(
      contact => contact.id === parseInt(id)
    );

    useEffect(() => {
    if (currentContact)
     setName(currentContact.name);
     setEmail(currentContact.email);
     setNumber(currentContact.number);
  
    }, [currentContact]);

    const handleSubmit = (e) => {
      e.preventDefault();

      const checkEmail = contacts.find(
          (contact) => contact.id !== parseInt(id) && contact.email === email
          );
      const checkNumber = contacts.find(
          (contact) => contact.id !== parseInt(id) && contact.number === parseInt(number)
          );

      if(!name || !email || !number) {
          return toast.warning('Please fill all fields');
      }

      if(checkEmail) {
          return toast.error('This email already exists');
      }
      if(checkNumber) {
          return toast.error('This number already exists');
      }
      
      const data = {
          id: parseInt(id),
          name,
          email,
          number,
      };

      dispatch({ type: "UPDATE_CONTACT", payload: data });
      toast.success("Student updated successfully");
     // after adding we  get back to homepage
      navigate("/");
  };
 

    
  return (
    <div className="container">
      {currentContact? (

      <>
             
            <div className="row">
            <div className="col-md-6 shadow mx-auto p-5"> 
            <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
            <input type="text" placeholder="Name" className="form-control" value={name} onChange = {(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group my-3">
            <input type="email" placeholder="Email" className="form-control" value={email} onChange ={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group my-3">
            <input type="number" placeholder="Number" className="form-control" value={number} onChange ={(e) => setNumber(e.target.value)}/>
             </div>
            <div className="form-group my-3">
            <input type="Submit" value="Update Student" className="btn btn-block btn-dark"/>
            <Link to="/" className="btn btn-danger ml-3">Cancel</Link>
            </div>
        </form>
      </div>
     </div>
     </>
     ) : (
      <h1 className="display-3 my-5 text-center"> Student Contact with id {id} not exists</h1>

     )}
     </div>
  )
}

export default EditContact