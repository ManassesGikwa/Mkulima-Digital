import React, {useState} from 'react';

function ProfileUpdateForm ({onSubmit}){
    const [formData, setFormData] = useState({
        name:'',
        expertise_area:'',
        bio:''
    });

    function handleChange (e){
        const { name, value } = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }));
    };

    function handleSubmit(e){
        e.preventDefault();
        onSubmit(formData);

        setFormData({

            name:'',
            expertise_area:'',
            bio: ''
        });
    };


    return(
        <form onSubmit ={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Expertise Area:
                <input type="text" name="expertise_area" value={formData.expertise_area} onChange={handleChange} />
            </label>
            <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange} />
            </label>
            <button type="submit">Update Profile</button>
        </form>
    );
    
}

export default ProfileUpdateForm;