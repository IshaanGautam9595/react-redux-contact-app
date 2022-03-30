import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import{ useNavigate } from 'react-router-dom';
 

const AddContact = () => {
    
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState();
    const [ number, setNumber ] = useState();

    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();

    let navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contact) => contact.email === email && contact
            );
        const checkNumber = contacts.find(
            (contact) => contact.number === parseInt(number)
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
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number,
        };

        dispatch({ type: "ADD_CONTACT", payload: data });
        toast.success("Student added successfully");
       // after adding we  get back to homepage
        navigate("/");
    };
   
    return (
    <div className="container">
                    <h1 className="display-3 my-5 text-center"> Add contact </h1> 
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
            <input type="Submit" value="Add Student" className="btn btn-block btn-dark"/>
            </div>
        </form>
      </div>
     </div>
     </div>
  )
}

export default AddContact