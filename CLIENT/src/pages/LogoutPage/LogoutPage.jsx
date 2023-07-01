import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://localhost:3000/logout";

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout request failed');
        }
        // Redirect the user after successful logout
        navigate("/");
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when the logout process is complete
      });
  }, [navigate]);

  // Render a loading indicator while isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}

export default LogoutPage;
