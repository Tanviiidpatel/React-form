
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        semester: '',
        stream: '',
        futureGoal: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert('Registration successful!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                semester: '',
                stream: '',
                futureGoal: '',
            });
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label htmlFor="email">Email ID:</label>
                <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label htmlFor="phone">Phone Number:</label>
                <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label htmlFor="semester">Semester:</label>
                <input 
                    type="text" 
                    id="semester"
                    name="semester" 
                    value={formData.semester} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label htmlFor="stream">Stream:</label>
                <select 
                    id="stream"
                    name="stream" 
                    value={formData.stream} 
                    onChange={handleChange} 
                    required
                >
                    <option value="" disabled>Select your stream</option>
                    <option value="Electrical">Electrical</option>
                    <option value="IT">IT</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="futureGoal">Future Goal:</label>
                <select 
                    id="futureGoal"
                    name="futureGoal" 
                    value={formData.futureGoal} 
                    onChange={handleChange} 
                    required
                >
                    <option value="" disabled>Select your future goal</option>
                    <option value="Job">Job</option>
                    <option value="Business">Business</option>
                    <option value="Higher Studies">Higher Studies</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default RegistrationForm;